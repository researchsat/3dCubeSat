# API Documentation

## CubeSatApp

Main application class that orchestrates all components.

### Constructor

```javascript
new CubeSatApp(containerId, config)
```

**Parameters:**
- `containerId` (string): ID of the DOM element to render the scene
- `config` (object): Configuration object (defaults to defaultConfig)

### Methods

#### addComponent(data)

Add a new component to the CubeSat.

```javascript
cubeSatApp.addComponent({
  name: 'New Sensor',
  size: [5, 3, 2],
  position: [0, 0, 5],
  color: 0x00ff00,
  section: 'U2',
  category: 'sensor',
  description: 'Custom sensor description',
  specs: {
    range: '0-100',
    accuracy: '±1%'
  }
});
```

**Returns:** `{ success: boolean, id?: string, error?: string }`

#### editComponent(id, updates)

Edit an existing component.

```javascript
cubeSatApp.editComponent('comp_123', {
  position: [1, 2, 3],
  color: 0xff0000,
  size: [6, 4, 3]
});
```

**Returns:** `{ success: boolean, error?: string }`

#### removeComponent(id)

Remove a component.

```javascript
cubeSatApp.removeComponent('comp_123');
```

**Returns:** `{ success: boolean, error?: string }`

#### exportConfiguration()

Export current configuration as JSON.

```javascript
const config = cubeSatApp.exportConfiguration();
console.log(config);
```

**Returns:** Configuration object

#### importConfiguration(config)

Import configuration from JSON.

```javascript
cubeSatApp.importConfiguration(configData);
```

---

## ComponentManager

Manages all CubeSat components.

### Methods

#### addComponent(data)

Add a component to the scene.

**Parameters:**
- `data.id` (string, optional): Unique identifier
- `data.name` (string): Component name
- `data.size` (array): [width, height, depth] in cm
- `data.position` (array): [x, y, z] coordinates
- `data.color` (number): Hex color value
- `data.section` (string): 'U1', 'U2', or 'U3'
- `data.category` (string): Component category
- `data.description` (string, optional): Description
- `data.specs` (object, optional): Specifications

#### getComponent(id)

Get component by ID.

```javascript
const component = componentManager.getComponent('comp_123');
```

#### getAllComponents()

Get all components.

```javascript
const components = componentManager.getAllComponents();
```

#### getComponentsBySection(section)

Get components in a specific section.

```javascript
const u1Components = componentManager.getComponentsBySection('U1');
```

#### toggleSection(section)

Toggle visibility of a section.

```javascript
componentManager.toggleSection('U1');
```

---

## StateManager

Manages application state and persistence.

### Methods

#### saveState()

Save current state to history.

```javascript
stateManager.saveState();
```

#### undo()

Undo last change.

```javascript
if (stateManager.undo()) {
  console.log('Undone');
}
```

#### redo()

Redo last undone change.

```javascript
if (stateManager.redo()) {
  console.log('Redone');
}
```

#### exportToFile(filename)

Export configuration to JSON file.

```javascript
stateManager.exportToFile('my-cubesat.json');
```

#### importFromFile(file)

Import configuration from file.

```javascript
const fileInput = document.querySelector('input[type="file"]');
fileInput.addEventListener('change', async (e) => {
  const file = e.target.files[0];
  await stateManager.importFromFile(file);
});
```

#### saveToLocalStorage(key)

Save to browser localStorage.

```javascript
stateManager.saveToLocalStorage('my-config');
```

#### loadFromLocalStorage(key)

Load from browser localStorage.

```javascript
stateManager.loadFromLocalStorage('my-config');
```

#### enableAutoSave(interval, key)

Enable auto-save.

```javascript
stateManager.enableAutoSave(60000, 'autosave'); // Every 60 seconds
```

---

## InteractionManager

Handles user interactions with 3D objects.

### Methods

#### onSelect(callback)

Register callback for component selection.

```javascript
interactionManager.onSelect((userData) => {
  if (userData) {
    console.log('Selected:', userData.name);
  }
});
```

#### onHover(callback)

Register callback for component hover.

```javascript
interactionManager.onHover((userData) => {
  if (userData) {
    console.log('Hovering:', userData.name);
  }
});
```

#### selectComponent(componentId)

Programmatically select a component.

```javascript
interactionManager.selectComponent('comp_123');
```

#### clearSelection()

Clear current selection.

```javascript
interactionManager.clearSelection();
```

---

## SceneManager

Manages Three.js scene, camera, and renderer.

### Methods

#### resetCamera()

Reset camera to initial position.

```javascript
sceneManager.resetCamera();
```

#### toggleAutoRotate()

Toggle auto-rotation.

```javascript
const isRotating = sceneManager.toggleAutoRotate();
```

#### takeScreenshot(filename)

Take a screenshot.

```javascript
sceneManager.takeScreenshot('cubesat.png');
```

#### getSceneInfo()

Get scene statistics.

```javascript
const info = sceneManager.getSceneInfo();
console.log('Triangles:', info.triangles);
```

---

## Configuration Object

### Structure

```javascript
{
  cubesat: {
    width: 10,
    height: 10,
    length: 34,
    units: 3,
    unitLength: 11.33
  },
  components: [
    {
      id: 'unique-id',
      name: 'Component Name',
      size: [width, height, depth],
      position: [x, y, z],
      color: 0xHEXCOLOR,
      section: 'U1' | 'U2' | 'U3',
      category: 'experiment' | 'sensor' | 'optics' | 'electronics' | 'power',
      description: 'Description text',
      specs: {
        key: 'value'
      }
    }
  ],
  lighting: { ... },
  camera: { ... },
  controls: { ... }
}
```

---

## Events

### Keyboard Shortcuts

- `E` - Toggle editor panel
- `R` - Toggle auto-rotation
- `Ctrl/Cmd + Z` - Undo
- `Ctrl/Cmd + Shift + Z` - Redo

### Mouse Controls

- **Left Click + Drag** - Rotate view
- **Right Click + Drag** - Pan view
- **Scroll Wheel** - Zoom in/out
- **Click on Component** - Select component

---

## Examples

### Complete Example: Adding and Editing Components

```javascript
// Access the app instance
const app = window.cubeSatApp;

// Add a new component
const result = app.addComponent({
  name: 'Temperature Sensor',
  size: [3, 2, 2],
  position: [2, 0, 8],
  color: 0xff6600,
  section: 'U2',
  category: 'sensor',
  description: 'High-precision temperature sensor',
  specs: {
    range: '-40°C to 125°C',
    accuracy: '±0.1°C',
    power: '0.3W'
  }
});

if (result.success) {
  console.log('Component added with ID:', result.id);
  
  // Edit the component
  setTimeout(() => {
    app.editComponent(result.id, {
      position: [3, 0, 8],
      color: 0xff9900
    });
  }, 2000);
}

// Export configuration
setTimeout(() => {
  const config = app.exportConfiguration();
  console.log('Current configuration:', config);
}, 5000);
```

### Example: Custom Event Handling

```javascript
// Listen for component selection
app.interactionManager.onSelect((userData) => {
  if (userData) {
    // Custom action when component is selected
    console.log(`Selected: ${userData.name} in ${userData.section}`);
    
    // You could trigger custom UI updates here
    document.getElementById('custom-panel').innerHTML = `
      <h3>${userData.name}</h3>
      <p>${userData.description}</p>
    `;
  }
});

// Listen for hover
app.interactionManager.onHover((userData) => {
  if (userData) {
    document.body.style.cursor = 'pointer';
  } else {
    document.body.style.cursor = 'default';
  }
});
```

---

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

Requires WebGL support.

