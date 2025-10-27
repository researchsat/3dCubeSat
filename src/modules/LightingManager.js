/**
 * LightingManager - Manages all lighting in the scene
 */
import * as THREE from 'three';

export class LightingManager {
  constructor(scene, config) {
    this.scene = scene;
    this.config = config;
    this.lights = {};

    this.init();
  }

  init() {
    this.createHemisphereLight();
    this.createDirectionalLight();
    this.createPointLight();
    this.createAmbientLight();
  }

  createHemisphereLight() {
    const { skyColor, groundColor, intensity } = this.config.lighting.hemisphere;
    const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
    this.lights.hemisphere = light;
    this.scene.add(light);
  }

  createDirectionalLight() {
    const { color, intensity, position, castShadow, shadowMapSize } = 
      this.config.lighting.directional;
    
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(...position);
    light.castShadow = castShadow;
    
    if (castShadow) {
      light.shadow.mapSize.width = shadowMapSize;
      light.shadow.mapSize.height = shadowMapSize;
      light.shadow.camera.near = 0.5;
      light.shadow.camera.far = 500;
      light.shadow.camera.left = -50;
      light.shadow.camera.right = 50;
      light.shadow.camera.top = 50;
      light.shadow.camera.bottom = -50;
    }
    
    this.lights.directional = light;
    this.scene.add(light);
  }

  createPointLight() {
    const { color, intensity, distance, position } = this.config.lighting.point;
    const light = new THREE.PointLight(color, intensity, distance);
    light.position.set(...position);
    this.lights.point = light;
    this.scene.add(light);
  }

  createAmbientLight() {
    const { color, intensity } = this.config.lighting.ambient;
    const light = new THREE.AmbientLight(color, intensity);
    this.lights.ambient = light;
    this.scene.add(light);
  }

  // Update light properties
  updateLight(lightName, properties) {
    const light = this.lights[lightName];
    if (!light) return;

    if (properties.intensity !== undefined) {
      light.intensity = properties.intensity;
    }
    if (properties.color !== undefined) {
      light.color.setHex(properties.color);
    }
    if (properties.position !== undefined) {
      light.position.set(...properties.position);
    }
  }

  // Toggle lights
  toggleLight(lightName) {
    const light = this.lights[lightName];
    if (light) {
      light.visible = !light.visible;
      return light.visible;
    }
    return false;
  }

  // Get light info
  getLightInfo(lightName) {
    const light = this.lights[lightName];
    if (!light) return null;

    return {
      type: light.type,
      intensity: light.intensity,
      color: '#' + light.color.getHexString(),
      visible: light.visible,
      position: light.position.toArray()
    };
  }

  // Dispose all lights
  dispose() {
    Object.values(this.lights).forEach(light => {
      this.scene.remove(light);
      light.dispose?.();
    });
    this.lights = {};
  }
}

export default LightingManager;

