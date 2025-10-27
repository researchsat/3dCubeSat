/**
 * ComponentManager - Manages all CubeSat components (add, edit, remove)
 */
import * as THREE from 'three';
import { InternalComponent } from '../components/InternalComponent.js';

export class ComponentManager {
  constructor(scene, config) {
    this.scene = scene;
    this.config = config;
    this.components = new Map();
    this.sections = {
      U1: new THREE.Group(),
      U2: new THREE.Group(),
      U3: new THREE.Group()
    };
    this.componentGroup = new THREE.Group();
    this.componentGroup.name = 'ComponentGroup';

    this.init();
  }

  init() {
    // Add section groups to component group
    Object.entries(this.sections).forEach(([name, group]) => {
      group.name = name;
      this.componentGroup.add(group);
    });

    this.scene.add(this.componentGroup);

    // Load initial components from config
    this.loadComponentsFromConfig();
  }

  loadComponentsFromConfig() {
    this.config.components.forEach(compData => {
      this.addComponent(compData);
    });
  }

  addComponent(data) {
    const {
      id = this.generateId(),
      name,
      size,
      position,
      color,
      section,
      category = 'generic',
      description = '',
      specs = {}
    } = data;

    // Create component
    const component = new InternalComponent({
      id,
      name,
      size,
      position,
      color,
      section,
      category,
      description,
      specs,
      materialDefaults: this.config.materialDefaults
    });

    // Add to appropriate section
    if (this.sections[section]) {
      this.sections[section].add(component.mesh);
      this.components.set(id, component);
      
      return { success: true, id, component };
    }

    return { success: false, error: 'Invalid section' };
  }

  editComponent(id, updates) {
    const component = this.components.get(id);
    if (!component) {
      return { success: false, error: 'Component not found' };
    }

    // Update position
    if (updates.position) {
      component.mesh.position.set(...updates.position);
      component.position = updates.position;
    }

    // Update size
    if (updates.size) {
      const newGeometry = new THREE.BoxGeometry(...updates.size);
      component.mesh.geometry.dispose();
      component.mesh.geometry = newGeometry;
      component.size = updates.size;

      // Update edges
      const edges = component.mesh.children.find(child => child.type === 'LineSegments');
      if (edges) {
        edges.geometry.dispose();
        edges.geometry = new THREE.EdgesGeometry(newGeometry);
      }
    }

    // Update color
    if (updates.color !== undefined) {
      component.mesh.material.color.setHex(updates.color);
      component.mesh.material.emissive.setHex(updates.color);
      component.color = updates.color;
    }

    // Update material properties
    if (updates.metalness !== undefined) {
      component.mesh.material.metalness = updates.metalness;
    }
    if (updates.roughness !== undefined) {
      component.mesh.material.roughness = updates.roughness;
    }
    if (updates.opacity !== undefined) {
      component.mesh.material.opacity = updates.opacity;
      component.mesh.material.transparent = updates.opacity < 1;
    }

    // Update metadata
    if (updates.name) component.name = updates.name;
    if (updates.description) component.description = updates.description;
    if (updates.specs) component.specs = { ...component.specs, ...updates.specs };

    // Update section if changed
    if (updates.section && updates.section !== component.section) {
      const oldSection = this.sections[component.section];
      const newSection = this.sections[updates.section];
      
      if (oldSection && newSection) {
        oldSection.remove(component.mesh);
        newSection.add(component.mesh);
        component.section = updates.section;
      }
    }

    return { success: true, component };
  }

  removeComponent(id) {
    const component = this.components.get(id);
    if (!component) {
      return { success: false, error: 'Component not found' };
    }

    // Remove from section
    const section = this.sections[component.section];
    if (section) {
      section.remove(component.mesh);
    }

    // Dispose geometry and material
    component.mesh.geometry.dispose();
    component.mesh.material.dispose();

    // Remove from map
    this.components.delete(id);

    return { success: true };
  }

  getComponent(id) {
    return this.components.get(id);
  }

  getAllComponents() {
    return Array.from(this.components.values());
  }

  getComponentsBySection(section) {
    return this.getAllComponents().filter(comp => comp.section === section);
  }

  getComponentsByCategory(category) {
    return this.getAllComponents().filter(comp => comp.category === category);
  }

  // Section visibility
  toggleSection(section) {
    if (this.sections[section]) {
      this.sections[section].visible = !this.sections[section].visible;
      return this.sections[section].visible;
    }
    return false;
  }

  setSectionVisibility(section, visible) {
    if (this.sections[section]) {
      this.sections[section].visible = visible;
    }
  }

  // Get all interactive meshes for raycasting
  getInteractiveMeshes() {
    const meshes = [];
    this.components.forEach(component => {
      meshes.push(component.mesh);
    });
    return meshes;
  }

  // Highlight component
  highlightComponent(id, intensity = 0.5) {
    const component = this.components.get(id);
    if (component) {
      component.mesh.material.emissiveIntensity = intensity;
    }
  }

  // Reset all highlights
  resetHighlights() {
    this.components.forEach(component => {
      component.mesh.material.emissiveIntensity = 0;
    });
  }

  // Generate unique ID
  generateId() {
    return 'comp_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // Export components data
  exportData() {
    const data = [];
    this.components.forEach(component => {
      data.push({
        id: component.id,
        name: component.name,
        size: component.size,
        position: component.position,
        color: component.color,
        section: component.section,
        category: component.category,
        description: component.description,
        specs: component.specs
      });
    });
    return data;
  }

  // Import components data
  importData(data) {
    // Clear existing components
    this.components.forEach((comp, id) => {
      this.removeComponent(id);
    });

    // Add new components
    data.forEach(compData => {
      this.addComponent(compData);
    });
  }

  // Clear all components
  clear() {
    this.components.forEach((comp, id) => {
      this.removeComponent(id);
    });
  }

  dispose() {
    this.clear();
    this.scene.remove(this.componentGroup);
  }
}

export default ComponentManager;

