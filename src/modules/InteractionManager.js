/**
 * InteractionManager - Handles mouse/touch interactions with 3D objects
 */
import * as THREE from 'three';

export class InteractionManager {
  constructor(camera, domElement, componentManager, config) {
    this.camera = camera;
    this.domElement = domElement;
    this.componentManager = componentManager;
    this.config = config;

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    
    this.hoveredObject = null;
    this.selectedObject = null;
    this.flashInterval = null;

    this.onSelectCallbacks = [];
    this.onHoverCallbacks = [];

    this.init();
  }

  init() {
    this.domElement.addEventListener('mousemove', this.onMouseMove.bind(this));
    this.domElement.addEventListener('click', this.onClick.bind(this));
    this.domElement.addEventListener('touchstart', this.onTouchStart.bind(this));
  }

  onMouseMove(event) {
    // Calculate mouse position in normalized device coordinates
    const rect = this.domElement.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    this.updateHover();
  }

  onTouchStart(event) {
    if (event.touches.length === 1) {
      const rect = this.domElement.getBoundingClientRect();
      this.mouse.x = ((event.touches[0].clientX - rect.left) / rect.width) * 2 - 1;
      this.mouse.y = -((event.touches[0].clientY - rect.top) / rect.height) * 2 + 1;

      this.handleSelection();
    }
  }

  onClick(event) {
    const rect = this.domElement.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    this.handleSelection();
  }

  updateHover() {
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const interactiveObjects = this.componentManager.getInteractiveMeshes();
    const intersects = this.raycaster.intersectObjects(interactiveObjects, false);

    // Reset previous hover
    if (this.hoveredObject && this.hoveredObject !== this.selectedObject) {
      this.hoveredObject.material.emissiveIntensity = 0;
    }

    if (intersects.length > 0) {
      this.hoveredObject = intersects[0].object;
      
      if (this.hoveredObject !== this.selectedObject) {
        this.hoveredObject.material.emissiveIntensity = 
          this.config.interaction.hoverEmissiveIntensity;
      }
      
      this.domElement.style.cursor = 'pointer';

      // Trigger hover callbacks
      this.onHoverCallbacks.forEach(callback => {
        callback(this.hoveredObject.userData);
      });
    } else {
      this.hoveredObject = null;
      this.domElement.style.cursor = 'default';

      // Trigger hover callbacks with null
      this.onHoverCallbacks.forEach(callback => {
        callback(null);
      });
    }
  }

  handleSelection() {
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const interactiveObjects = this.componentManager.getInteractiveMeshes();
    const intersects = this.raycaster.intersectObjects(interactiveObjects, false);

    // Clear previous flash
    if (this.flashInterval) {
      clearInterval(this.flashInterval);
      this.flashInterval = null;
    }

    // Reset previous selection
    if (this.selectedObject) {
      this.selectedObject.material.emissiveIntensity = 0;
    }

    if (intersects.length > 0) {
      this.selectedObject = intersects[0].object;
      this.selectedObject.material.emissiveIntensity = 
        this.config.interaction.selectEmissiveIntensity;

      // Flash effect
      this.startFlashEffect();

      // Trigger select callbacks
      this.onSelectCallbacks.forEach(callback => {
        callback(this.selectedObject.userData);
      });
    } else {
      this.selectedObject = null;

      // Trigger select callbacks with null
      this.onSelectCallbacks.forEach(callback => {
        callback(null);
      });
    }
  }

  startFlashEffect() {
    let flashCount = 0;
    const { flashDuration, flashCount: maxFlashes, selectEmissiveIntensity } = 
      this.config.interaction;

    this.flashInterval = setInterval(() => {
      if (this.selectedObject) {
        this.selectedObject.material.emissiveIntensity = 
          this.selectedObject.material.emissiveIntensity === selectEmissiveIntensity 
            ? selectEmissiveIntensity * 1.6 
            : selectEmissiveIntensity;
      }
      
      flashCount++;
      if (flashCount >= maxFlashes * 2) {
        clearInterval(this.flashInterval);
        this.flashInterval = null;
        if (this.selectedObject) {
          this.selectedObject.material.emissiveIntensity = selectEmissiveIntensity;
        }
      }
    }, flashDuration);
  }

  // Event listeners
  onSelect(callback) {
    this.onSelectCallbacks.push(callback);
  }

  onHover(callback) {
    this.onHoverCallbacks.push(callback);
  }

  // Clear selection
  clearSelection() {
    if (this.selectedObject) {
      this.selectedObject.material.emissiveIntensity = 0;
      this.selectedObject = null;
    }
    if (this.flashInterval) {
      clearInterval(this.flashInterval);
      this.flashInterval = null;
    }
  }

  // Get selected component
  getSelectedComponent() {
    return this.selectedObject ? this.selectedObject.userData : null;
  }

  // Programmatically select component
  selectComponent(componentId) {
    const component = this.componentManager.getComponent(componentId);
    if (component) {
      // Clear previous selection
      if (this.selectedObject) {
        this.selectedObject.material.emissiveIntensity = 0;
      }

      this.selectedObject = component.mesh;
      this.selectedObject.material.emissiveIntensity = 
        this.config.interaction.selectEmissiveIntensity;

      this.startFlashEffect();

      // Trigger callbacks
      this.onSelectCallbacks.forEach(callback => {
        callback(this.selectedObject.userData);
      });
    }
  }

  // Dispose
  dispose() {
    this.domElement.removeEventListener('mousemove', this.onMouseMove.bind(this));
    this.domElement.removeEventListener('click', this.onClick.bind(this));
    this.domElement.removeEventListener('touchstart', this.onTouchStart.bind(this));
    
    if (this.flashInterval) {
      clearInterval(this.flashInterval);
    }

    this.onSelectCallbacks = [];
    this.onHoverCallbacks = [];
  }
}

export default InteractionManager;

