/**
 * EditorPanel - UI for adding, editing, and removing components
 */

export class EditorPanel {
  constructor(componentManager, interactionManager) {
    this.componentManager = componentManager;
    this.interactionManager = interactionManager;
    this.panel = null;
    this.isOpen = false;
    this.currentEditingId = null;

    this.create();
    this.attachEventListeners();
  }

  create() {
    this.panel = document.createElement('div');
    this.panel.id = 'editor-panel';
    this.panel.className = 'editor-panel';
    this.panel.innerHTML = `
      <div class="editor-header">
        <h2>Component Editor</h2>
        <button id="editor-close" class="close-btn">×</button>
      </div>
      <div class="editor-content">
        <div class="editor-tabs">
          <button class="tab-btn active" data-tab="add">Add New</button>
          <button class="tab-btn" data-tab="edit">Edit Selected</button>
          <button class="tab-btn" data-tab="list">Component List</button>
        </div>

        <!-- Add Component Tab -->
        <div class="tab-content active" id="tab-add">
          <form id="add-component-form">
            <div class="form-group">
              <label>Component Name</label>
              <input type="text" id="add-name" required>
            </div>
            <div class="form-group">
              <label>Section</label>
              <select id="add-section" required>
                <option value="U1">U1 - Experiment</option>
                <option value="U2">U2 - Sensors & Optics</option>
                <option value="U3">U3 - Electronics</option>
              </select>
            </div>
            <div class="form-group">
              <label>Category</label>
              <select id="add-category">
                <option value="experiment">Experiment</option>
                <option value="sensor">Sensor</option>
                <option value="optics">Optics</option>
                <option value="electronics">Electronics</option>
                <option value="power">Power</option>
                <option value="generic">Generic</option>
              </select>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Width (cm)</label>
                <input type="number" id="add-width" value="5" step="0.1" required>
              </div>
              <div class="form-group">
                <label>Height (cm)</label>
                <input type="number" id="add-height" value="3" step="0.1" required>
              </div>
              <div class="form-group">
                <label>Depth (cm)</label>
                <input type="number" id="add-depth" value="3" step="0.1" required>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Position X</label>
                <input type="number" id="add-x" value="0" step="0.1" required>
              </div>
              <div class="form-group">
                <label>Position Y</label>
                <input type="number" id="add-y" value="0" step="0.1" required>
              </div>
              <div class="form-group">
                <label>Position Z</label>
                <input type="number" id="add-z" value="0" step="0.1" required>
              </div>
            </div>
            <div class="form-group">
              <label>Color</label>
              <input type="color" id="add-color" value="#61b3e0">
            </div>
            <div class="form-group">
              <label>Description</label>
              <textarea id="add-description" rows="3"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Add Component</button>
          </form>
        </div>

        <!-- Edit Component Tab -->
        <div class="tab-content" id="tab-edit">
          <div id="edit-no-selection" class="info-message">
            Select a component to edit
          </div>
          <form id="edit-component-form" style="display: none;">
            <input type="hidden" id="edit-id">
            <div class="form-group">
              <label>Component Name</label>
              <input type="text" id="edit-name" required>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Width (cm)</label>
                <input type="number" id="edit-width" step="0.1" required>
              </div>
              <div class="form-group">
                <label>Height (cm)</label>
                <input type="number" id="edit-height" step="0.1" required>
              </div>
              <div class="form-group">
                <label>Depth (cm)</label>
                <input type="number" id="edit-depth" step="0.1" required>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Position X</label>
                <input type="number" id="edit-x" step="0.1" required>
              </div>
              <div class="form-group">
                <label>Position Y</label>
                <input type="number" id="edit-y" step="0.1" required>
              </div>
              <div class="form-group">
                <label>Position Z</label>
                <input type="number" id="edit-z" step="0.1" required>
              </div>
            </div>
            <div class="form-group">
              <label>Color</label>
              <input type="color" id="edit-color">
            </div>
            <div class="form-group">
              <label>Section</label>
              <select id="edit-section">
                <option value="U1">U1 - Experiment</option>
                <option value="U2">U2 - Sensors & Optics</option>
                <option value="U3">U3 - Electronics</option>
              </select>
            </div>
            <div class="form-actions">
              <button type="submit" class="btn btn-primary">Update Component</button>
              <button type="button" id="delete-component" class="btn btn-danger">Delete</button>
            </div>
          </form>
        </div>

        <!-- Component List Tab -->
        <div class="tab-content" id="tab-list">
          <div id="component-list"></div>
        </div>
      </div>
    `;

    document.body.appendChild(this.panel);
  }

  attachEventListeners() {
    // Close button
    document.getElementById('editor-close').addEventListener('click', () => {
      this.close();
    });

    // Tab switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.switchTab(e.target.dataset.tab);
      });
    });

    // Add component form
    document.getElementById('add-component-form').addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleAddComponent();
    });

    // Edit component form
    document.getElementById('edit-component-form').addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleEditComponent();
    });

    // Delete component
    document.getElementById('delete-component').addEventListener('click', () => {
      this.handleDeleteComponent();
    });

    // Listen for component selection
    this.interactionManager.onSelect((userData) => {
      if (userData) {
        this.loadComponentForEdit(userData.componentId);
      }
    });
  }

  switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabName);
    });

    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
      content.classList.toggle('active', content.id === `tab-${tabName}`);
    });

    // Refresh component list if switching to list tab
    if (tabName === 'list') {
      this.refreshComponentList();
    }
  }

  handleAddComponent() {
    const data = {
      name: document.getElementById('add-name').value,
      section: document.getElementById('add-section').value,
      category: document.getElementById('add-category').value,
      size: [
        parseFloat(document.getElementById('add-width').value),
        parseFloat(document.getElementById('add-height').value),
        parseFloat(document.getElementById('add-depth').value)
      ],
      position: [
        parseFloat(document.getElementById('add-x').value),
        parseFloat(document.getElementById('add-y').value),
        parseFloat(document.getElementById('add-z').value)
      ],
      color: parseInt(document.getElementById('add-color').value.replace('#', ''), 16),
      description: document.getElementById('add-description').value
    };

    const result = this.componentManager.addComponent(data);
    
    if (result.success) {
      alert('Component added successfully!');
      document.getElementById('add-component-form').reset();
    } else {
      alert('Error adding component: ' + result.error);
    }
  }

  loadComponentForEdit(componentId) {
    const component = this.componentManager.getComponent(componentId);
    if (!component) return;

    this.currentEditingId = componentId;
    const info = component.getInfo();

    document.getElementById('edit-id').value = info.id;
    document.getElementById('edit-name').value = info.name;
    document.getElementById('edit-width').value = info.size[0];
    document.getElementById('edit-height').value = info.size[1];
    document.getElementById('edit-depth').value = info.size[2];
    document.getElementById('edit-x').value = info.position[0];
    document.getElementById('edit-y').value = info.position[1];
    document.getElementById('edit-z').value = info.position[2];
    document.getElementById('edit-color').value = '#' + info.color.toString(16).padStart(6, '0');
    document.getElementById('edit-section').value = info.section;

    document.getElementById('edit-no-selection').style.display = 'none';
    document.getElementById('edit-component-form').style.display = 'block';
  }

  handleEditComponent() {
    const id = this.currentEditingId;
    if (!id) return;

    const updates = {
      name: document.getElementById('edit-name').value,
      size: [
        parseFloat(document.getElementById('edit-width').value),
        parseFloat(document.getElementById('edit-height').value),
        parseFloat(document.getElementById('edit-depth').value)
      ],
      position: [
        parseFloat(document.getElementById('edit-x').value),
        parseFloat(document.getElementById('edit-y').value),
        parseFloat(document.getElementById('edit-z').value)
      ],
      color: parseInt(document.getElementById('edit-color').value.replace('#', ''), 16),
      section: document.getElementById('edit-section').value
    };

    const result = this.componentManager.editComponent(id, updates);
    
    if (result.success) {
      alert('Component updated successfully!');
    } else {
      alert('Error updating component: ' + result.error);
    }
  }

  handleDeleteComponent() {
    const id = this.currentEditingId;
    if (!id) return;

    if (confirm('Are you sure you want to delete this component?')) {
      const result = this.componentManager.removeComponent(id);
      
      if (result.success) {
        alert('Component deleted successfully!');
        document.getElementById('edit-no-selection').style.display = 'block';
        document.getElementById('edit-component-form').style.display = 'none';
        this.currentEditingId = null;
      } else {
        alert('Error deleting component: ' + result.error);
      }
    }
  }

  refreshComponentList() {
    const listContainer = document.getElementById('component-list');
    const components = this.componentManager.getAllComponents();

    if (components.length === 0) {
      listContainer.innerHTML = '<div class="info-message">No components</div>';
      return;
    }

    let html = '<div class="component-items">';
    components.forEach(comp => {
      const info = comp.getInfo();
      html += `
        <div class="component-item" data-id="${info.id}">
          <div class="component-color" style="background: #${info.color.toString(16).padStart(6, '0')}"></div>
          <div class="component-details">
            <div class="component-name">${info.name}</div>
            <div class="component-meta">${info.section} • ${info.category}</div>
          </div>
          <button class="btn-small" onclick="window.editorPanel.selectAndEdit('${info.id}')">Edit</button>
        </div>
      `;
    });
    html += '</div>';

    listContainer.innerHTML = html;
  }

  selectAndEdit(componentId) {
    this.interactionManager.selectComponent(componentId);
    this.switchTab('edit');
    this.loadComponentForEdit(componentId);
  }

  open() {
    this.panel.classList.add('open');
    this.isOpen = true;
  }

  close() {
    this.panel.classList.remove('open');
    this.isOpen = false;
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }
}

export default EditorPanel;

