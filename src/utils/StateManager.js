/**
 * StateManager - Manages application state, undo/redo, and persistence
 */

export class StateManager {
  constructor(componentManager, config) {
    this.componentManager = componentManager;
    this.config = config;
    this.history = [];
    this.historyIndex = -1;
    this.maxHistorySize = 50;
  }

  // Save current state to history
  saveState() {
    const state = this.getCurrentState();
    
    // Remove any states after current index (for redo)
    this.history = this.history.slice(0, this.historyIndex + 1);
    
    // Add new state
    this.history.push(state);
    
    // Limit history size
    if (this.history.length > this.maxHistorySize) {
      this.history.shift();
    } else {
      this.historyIndex++;
    }
  }

  // Get current state
  getCurrentState() {
    return {
      timestamp: Date.now(),
      components: this.componentManager.exportData(),
      sections: this.getSectionVisibility()
    };
  }

  // Restore state
  restoreState(state) {
    if (!state) return;

    // Restore components
    this.componentManager.importData(state.components);

    // Restore section visibility
    if (state.sections) {
      Object.entries(state.sections).forEach(([section, visible]) => {
        this.componentManager.setSectionVisibility(section, visible);
      });
    }
  }

  // Undo
  undo() {
    if (this.historyIndex > 0) {
      this.historyIndex--;
      this.restoreState(this.history[this.historyIndex]);
      return true;
    }
    return false;
  }

  // Redo
  redo() {
    if (this.historyIndex < this.history.length - 1) {
      this.historyIndex++;
      this.restoreState(this.history[this.historyIndex]);
      return true;
    }
    return false;
  }

  // Check if can undo/redo
  canUndo() {
    return this.historyIndex > 0;
  }

  canRedo() {
    return this.historyIndex < this.history.length - 1;
  }

  // Get section visibility
  getSectionVisibility() {
    return {
      U1: this.componentManager.sections.U1.visible,
      U2: this.componentManager.sections.U2.visible,
      U3: this.componentManager.sections.U3.visible
    };
  }

  // Export configuration
  exportConfig() {
    const config = {
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      cubesat: this.config.cubesat,
      components: this.componentManager.exportData(),
      sections: this.getSectionVisibility(),
      metadata: {
        totalComponents: this.componentManager.getAllComponents().length,
        sections: {
          U1: this.componentManager.getComponentsBySection('U1').length,
          U2: this.componentManager.getComponentsBySection('U2').length,
          U3: this.componentManager.getComponentsBySection('U3').length
        }
      }
    };

    return config;
  }

  // Import configuration
  importConfig(config) {
    if (!config || !config.components) {
      throw new Error('Invalid configuration format');
    }

    // Validate version compatibility
    if (config.version && config.version !== '1.0.0') {
      console.warn('Configuration version mismatch. Attempting to import anyway.');
    }

    // Import components
    this.componentManager.importData(config.components);

    // Import section visibility
    if (config.sections) {
      Object.entries(config.sections).forEach(([section, visible]) => {
        this.componentManager.setSectionVisibility(section, visible);
      });
    }

    // Save to history
    this.saveState();

    return true;
  }

  // Export to JSON file
  exportToFile(filename = 'cubesat-config.json') {
    const config = this.exportConfig();
    const json = JSON.stringify(config, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    
    URL.revokeObjectURL(url);
  }

  // Import from JSON file
  importFromFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const config = JSON.parse(e.target.result);
          this.importConfig(config);
          resolve(config);
        } catch (error) {
          reject(error);
        }
      };
      
      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };
      
      reader.readAsText(file);
    });
  }

  // Save to localStorage
  saveToLocalStorage(key = 'cubesat-config') {
    const config = this.exportConfig();
    try {
      localStorage.setItem(key, JSON.stringify(config));
      return true;
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
      return false;
    }
  }

  // Load from localStorage
  loadFromLocalStorage(key = 'cubesat-config') {
    try {
      const json = localStorage.getItem(key);
      if (json) {
        const config = JSON.parse(json);
        this.importConfig(config);
        return true;
      }
    } catch (error) {
      console.error('Failed to load from localStorage:', error);
    }
    return false;
  }

  // Clear localStorage
  clearLocalStorage(key = 'cubesat-config') {
    localStorage.removeItem(key);
  }

  // Auto-save functionality
  enableAutoSave(interval = 60000, key = 'cubesat-config-autosave') {
    this.autoSaveInterval = setInterval(() => {
      this.saveToLocalStorage(key);
      console.log('Auto-saved configuration');
    }, interval);
  }

  disableAutoSave() {
    if (this.autoSaveInterval) {
      clearInterval(this.autoSaveInterval);
      this.autoSaveInterval = null;
    }
  }

  // Reset to default configuration
  resetToDefault() {
    if (confirm('Are you sure you want to reset to default configuration? This cannot be undone.')) {
      this.componentManager.clear();
      this.componentManager.loadComponentsFromConfig();
      this.history = [];
      this.historyIndex = -1;
      this.saveState();
      return true;
    }
    return false;
  }
}

export default StateManager;

