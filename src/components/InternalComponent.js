/**
 * InternalComponent - Represents an internal CubeSat component
 */
import * as THREE from 'three';

export class InternalComponent {
  constructor(options) {
    this.id = options.id;
    this.name = options.name;
    this.size = options.size;
    this.position = options.position;
    this.color = options.color;
    this.section = options.section;
    this.category = options.category || 'generic';
    this.description = options.description || '';
    this.specs = options.specs || {};
    this.materialDefaults = options.materialDefaults || {};

    this.mesh = null;
    this.createMesh();
  }

  createMesh() {
    // Create geometry
    const geometry = new THREE.BoxGeometry(...this.size);

    // Create material
    const material = new THREE.MeshStandardMaterial({
      color: this.color,
      metalness: this.materialDefaults.metalness || 0.4,
      roughness: this.materialDefaults.roughness || 0.6,
      emissive: this.color,
      emissiveIntensity: this.materialDefaults.emissiveIntensity || 0,
      transparent: this.materialDefaults.transparent || false,
      opacity: this.materialDefaults.opacity || 1.0
    });

    // Create mesh
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.set(...this.position);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;

    // Store component data in mesh userData
    this.mesh.userData = {
      componentId: this.id,
      name: this.name,
      section: this.section,
      category: this.category,
      description: this.description,
      specs: this.specs,
      size: this.size,
      color: this.color,
      originalEmissive: this.color
    };

    // Add edges for better visibility
    this.addEdges();
  }

  addEdges() {
    const edges = new THREE.EdgesGeometry(this.mesh.geometry);
    const edgeMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff,
      opacity: 0.3,
      transparent: true
    });
    const edgeLines = new THREE.LineSegments(edges, edgeMaterial);
    this.mesh.add(edgeLines);
  }

  // Update methods
  setPosition(x, y, z) {
    this.position = [x, y, z];
    this.mesh.position.set(x, y, z);
  }

  setColor(color) {
    this.color = color;
    this.mesh.material.color.setHex(color);
    this.mesh.material.emissive.setHex(color);
    this.mesh.userData.color = color;
    this.mesh.userData.originalEmissive = color;
  }

  setSize(width, height, depth) {
    this.size = [width, height, depth];
    const newGeometry = new THREE.BoxGeometry(width, height, depth);
    this.mesh.geometry.dispose();
    this.mesh.geometry = newGeometry;
    this.mesh.userData.size = this.size;

    // Update edges
    const edges = this.mesh.children.find(child => child.type === 'LineSegments');
    if (edges) {
      edges.geometry.dispose();
      edges.geometry = new THREE.EdgesGeometry(newGeometry);
    }
  }

  setEmissiveIntensity(intensity) {
    this.mesh.material.emissiveIntensity = intensity;
  }

  // Get component info
  getInfo() {
    return {
      id: this.id,
      name: this.name,
      size: this.size,
      position: this.position,
      color: this.color,
      section: this.section,
      category: this.category,
      description: this.description,
      specs: this.specs
    };
  }

  // Dispose
  dispose() {
    this.mesh.geometry.dispose();
    this.mesh.material.dispose();
    
    // Dispose edges
    const edges = this.mesh.children.find(child => child.type === 'LineSegments');
    if (edges) {
      edges.geometry.dispose();
      edges.material.dispose();
    }
  }
}

export default InternalComponent;

