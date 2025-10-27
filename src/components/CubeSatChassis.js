/**
 * CubeSatChassis - The main CubeSat structure
 */
import * as THREE from 'three';

export class CubeSatChassis {
  constructor(config) {
    this.config = config;
    this.group = new THREE.Group();
    this.group.name = 'CubeSatChassis';
    
    this.chassis = null;
    this.wireframe = null;
    this.separators = [];
    this.harnesses = [];
    this.scaleMarks = [];

    this.create();
  }

  create() {
    this.createChassis();
    this.createWireframe();
    this.createSeparators();
    this.createHarnesses();
    this.createScaleMarks();
  }

  createChassis() {
    const { width, height, length } = this.config.cubesat;
    const geometry = new THREE.BoxGeometry(width, height, length);
    
    const material = new THREE.MeshStandardMaterial({
      color: this.config.chassis.color,
      metalness: this.config.chassis.metalness,
      roughness: this.config.chassis.roughness,
      transparent: true,
      opacity: this.config.chassis.opacity,
      side: THREE.DoubleSide
    });

    this.chassis = new THREE.Mesh(geometry, material);
    this.chassis.receiveShadow = true;
    this.group.add(this.chassis);
  }

  createWireframe() {
    if (!this.config.chassis.wireframe) return;

    const { width, height, length } = this.config.cubesat;
    const geometry = new THREE.BoxGeometry(width, height, length);
    const wireframeGeometry = new THREE.EdgesGeometry(geometry);
    const wireframeMaterial = new THREE.LineBasicMaterial({
      color: this.config.chassis.wireframeColor,
      linewidth: 1
    });

    this.wireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
    this.group.add(this.wireframe);
  }

  createSeparators() {
    const { width, height } = this.config.cubesat;
    const { thickness, color, metalness, roughness, opacity, positions } = 
      this.config.separators;

    const geometry = new THREE.BoxGeometry(width, height, thickness);
    const material = new THREE.MeshStandardMaterial({
      color,
      metalness,
      roughness,
      transparent: true,
      opacity
    });

    positions.forEach(zPos => {
      const separator = new THREE.Mesh(geometry, material.clone());
      separator.position.z = zPos;
      separator.receiveShadow = true;
      separator.castShadow = true;
      this.separators.push(separator);
      this.group.add(separator);
    });
  }

  createHarnesses() {
    this.config.harnesses.forEach(harness => {
      const { start, end, color, radius } = harness;

      // Create line
      const points = [
        new THREE.Vector3(...start),
        new THREE.Vector3(...end)
      ];
      const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
      const lineMaterial = new THREE.LineBasicMaterial({ color, linewidth: 2 });
      const line = new THREE.Line(lineGeometry, lineMaterial);
      this.group.add(line);

      // Create cylinder
      const direction = new THREE.Vector3().subVectors(
        new THREE.Vector3(...end),
        new THREE.Vector3(...start)
      );
      const length = direction.length();
      const cylinderGeometry = new THREE.CylinderGeometry(radius, radius, length, 8);
      const cylinderMaterial = new THREE.MeshStandardMaterial({ color });
      const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);

      cylinder.position.set(
        (start[0] + end[0]) / 2,
        (start[1] + end[1]) / 2,
        (start[2] + end[2]) / 2
      );
      cylinder.quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        direction.normalize()
      );

      this.harnesses.push({ line, cylinder });
      this.group.add(cylinder);
    });
  }

  createScaleMarks() {
    if (!this.config.helpers.scaleMarks.enabled) return;

    const { interval, range, size, color, offset } = this.config.helpers.scaleMarks;
    const [minZ, maxZ] = range;

    for (let z = minZ; z <= maxZ; z += interval) {
      const geometry = new THREE.BoxGeometry(...size);
      const material = new THREE.MeshBasicMaterial({ color });
      const mark = new THREE.Mesh(geometry, material);
      mark.position.set(offset[0], offset[1], z + offset[2]);
      this.scaleMarks.push(mark);
      this.group.add(mark);
    }
  }

  // Update chassis opacity
  setOpacity(opacity) {
    this.chassis.material.opacity = opacity;
  }

  // Toggle wireframe
  toggleWireframe() {
    if (this.wireframe) {
      this.wireframe.visible = !this.wireframe.visible;
      return this.wireframe.visible;
    }
    return false;
  }

  // Get group
  getGroup() {
    return this.group;
  }

  // Dispose
  dispose() {
    this.chassis?.geometry.dispose();
    this.chassis?.material.dispose();
    this.wireframe?.geometry.dispose();
    this.wireframe?.material.dispose();
    
    this.separators.forEach(sep => {
      sep.geometry.dispose();
      sep.material.dispose();
    });

    this.harnesses.forEach(({ line, cylinder }) => {
      line.geometry.dispose();
      line.material.dispose();
      cylinder.geometry.dispose();
      cylinder.material.dispose();
    });

    this.scaleMarks.forEach(mark => {
      mark.geometry.dispose();
      mark.material.dispose();
    });
  }
}

export default CubeSatChassis;

