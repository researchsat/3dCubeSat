/**
 * Main Application Entry Point
 */
import * as THREE from 'three';
import { defaultConfig } from './config/defaultConfig.js';
import { SceneManager } from './modules/SceneManager.js';
import { LightingManager } from './modules/LightingManager.js';
import { ComponentManager } from './modules/ComponentManager.js';
import { InteractionManager } from './modules/InteractionManager.js';
import { CubeSatChassis } from './components/CubeSatChassis.js';
import { EditorPanel } from './ui/EditorPanel.js';
import { StateManager } from './utils/StateManager.js';

class CubeSatApp {
  constructor(containerId, config = defaultConfig) {
    this.container = document.getElementById(containerId);
    this.config = config;
    
    // Core managers
    this.sceneManager = null;
    this.lightingManager = null;
    this.componentManager = null;
    this.interactionManager = null;
    this.stateManager = null;
    
    // Components
    this.chassis = null;
    this.editorPanel = null;
    
    // Helpers
    this.gridHelper = null;
    this.axesHelper = null;

    this.init();
  }

  init() {
    // Initialize scene
    this.sceneManager = new SceneManager(this.container, this.config);
    
    // Initialize lighting
    this.lightingManager = new LightingManager(
      this.sceneManager.scene,
      this.config
    );
    
    // Create chassis
    this.chassis = new CubeSatChassis(this.config);
    this.sceneManager.addToScene(this.chassis.getGroup());
    
    // Initialize component manager
    this.componentManager = new ComponentManager(
      this.sceneManager.scene,
      this.config
    );
    
    // Initialize interaction manager
    this.interactionManager = new InteractionManager(
      this.sceneManager.camera,
      this.sceneManager.renderer.domElement,
      this.componentManager,
      this.config
    );
    
    // Initialize state manager
    this.stateManager = new StateManager(this.componentManager, this.config);
    this.stateManager.saveState(); // Save initial state
    this.stateManager.enableAutoSave(60000); // Auto-save every minute
    
    // Create helpers
    this.createHelpers();
    
    // Initialize UI
    this.initUI();
    
    // Setup event listeners
    this.setupEventListeners();
    
    // Start animation
    this.sceneManager.start();
    
    // Hide loading screen
    this.hideLoading();
    
    console.log('CubeSat 3D Viewer initialized successfully');
  }

  createHelpers() {
    // Grid helper
    const { size, divisions, colorCenterLine, colorGrid, position } = 
      this.config.helpers.grid;
    this.gridHelper = new THREE.GridHelper(size, divisions, colorCenterLine, colorGrid);
    this.gridHelper.position.set(...position);
    this.sceneManager.addToScene(this.gridHelper);
    
    // Axes helper
    const { size: axesSize, position: axesPosition } = this.config.helpers.axes;
    this.axesHelper = new THREE.AxesHelper(axesSize);
    this.axesHelper.position.set(...axesPosition);
    this.sceneManager.addToScene(this.axesHelper);
  }

  initUI() {
    // Create editor panel
    this.editorPanel = new EditorPanel(
      this.componentManager,
      this.interactionManager
    );
    
    // Make editor panel globally accessible for component list
    window.editorPanel = this.editorPanel;
    
    // Setup info panel updates
    this.interactionManager.onSelect((userData) => {
      this.updateInfoPanel(userData);
    });
    
    // Setup section labels
    this.createSectionLabels();
  }

  setupEventListeners() {
    // Section toggle buttons
    document.getElementById('toggle-u1')?.addEventListener('click', () => {
      this.componentManager.toggleSection('U1');
    });
    
    document.getElementById('toggle-u2')?.addEventListener('click', () => {
      this.componentManager.toggleSection('U2');
    });
    
    document.getElementById('toggle-u3')?.addEventListener('click', () => {
      this.componentManager.toggleSection('U3');
    });
    
    // Auto-rotate toggle
    document.getElementById('toggle-rotation')?.addEventListener('click', () => {
      const isRotating = this.sceneManager.toggleAutoRotate();
      const btn = document.getElementById('toggle-rotation');
      if (btn) {
        btn.textContent = isRotating ? 'Stop Rotation' : 'Auto Rotate';
      }
    });
    
    // Editor toggle
    document.getElementById('toggle-editor')?.addEventListener('click', () => {
      this.editorPanel.toggle();
    });
    
    // Export/Import buttons
    document.getElementById('export-config')?.addEventListener('click', () => {
      this.stateManager.exportToFile();
    });
    
    document.getElementById('import-config')?.addEventListener('click', () => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.json';
      input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
          this.stateManager.importFromFile(file)
            .then(() => alert('Configuration imported successfully!'))
            .catch(err => alert('Error importing configuration: ' + err.message));
        }
      };
      input.click();
    });
    
    // Screenshot button
    document.getElementById('take-screenshot')?.addEventListener('click', () => {
      this.sceneManager.takeScreenshot();
    });
    
    // Reset camera
    document.getElementById('reset-camera')?.addEventListener('click', () => {
      this.sceneManager.resetCamera();
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      // Ctrl/Cmd + Z for undo
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        if (this.stateManager.undo()) {
          console.log('Undo');
        }
      }
      
      // Ctrl/Cmd + Shift + Z for redo
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && e.shiftKey) {
        e.preventDefault();
        if (this.stateManager.redo()) {
          console.log('Redo');
        }
      }
      
      // E key to toggle editor
      if (e.key === 'e' && !e.ctrlKey && !e.metaKey) {
        this.editorPanel.toggle();
      }
      
      // R key to toggle rotation
      if (e.key === 'r' && !e.ctrlKey && !e.metaKey) {
        this.sceneManager.toggleAutoRotate();
      }
    });
  }

  updateInfoPanel(userData) {
    const infoElement = document.getElementById('selected-info');
    if (!infoElement) return;
    
    if (userData) {
      const specs = userData.specs || {};
      let specsHtml = '';
      Object.entries(specs).forEach(([key, value]) => {
        specsHtml += `<br><strong>${key}:</strong> ${value}`;
      });
      
      infoElement.innerHTML = `
        <strong>${userData.name}</strong><br>
        Section: ${userData.section}<br>
        Category: ${userData.category}<br>
        Size: ${userData.size.join(' × ')} cm<br>
        ${userData.description ? `<br>${userData.description}` : ''}
        ${specsHtml}
      `;
    } else {
      infoElement.textContent = 'Click on a component to view details';
    }
  }

  createSectionLabels() {
    const sections = [
      { name: 'U1 - Experiment', class: 'label-u1' },
      { name: 'U2 - Sensors & Optics', class: 'label-u2' },
      { name: 'U3 - Electronics & DAQ', class: 'label-u3' }
    ];
    
    sections.forEach((section, index) => {
      const div = document.createElement('div');
      div.className = `section-label ${section.class}`;
      div.textContent = section.name;
      div.style.top = `${150 + index * 60}px`;
      document.getElementById('canvas-container')?.appendChild(div);
    });
  }

  hideLoading() {
    const loading = document.getElementById('loading');
    if (loading) {
      loading.style.display = 'none';
    }
  }

  // Public API methods
  addComponent(data) {
    const result = this.componentManager.addComponent(data);
    if (result.success) {
      this.stateManager.saveState();
    }
    return result;
  }

  editComponent(id, updates) {
    const result = this.componentManager.editComponent(id, updates);
    if (result.success) {
      this.stateManager.saveState();
    }
    return result;
  }

  removeComponent(id) {
    const result = this.componentManager.removeComponent(id);
    if (result.success) {
      this.stateManager.saveState();
    }
    return result;
  }

  exportConfiguration() {
    return this.stateManager.exportConfig();
  }

  importConfiguration(config) {
    return this.stateManager.importConfig(config);
  }

  dispose() {
    this.stateManager.disableAutoSave();
    this.sceneManager.dispose();
    this.lightingManager.dispose();
    this.componentManager.dispose();
    this.interactionManager.dispose();
    this.chassis.dispose();
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.cubeSatApp = new CubeSatApp('canvas-container', defaultConfig);
});

export default CubeSatApp;

