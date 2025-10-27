/**
 * SceneManager - Manages the Three.js scene, camera, and renderer
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export class SceneManager {
  constructor(container, config) {
    this.container = container;
    this.config = config;
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    this.animationId = null;
    this.animationCallbacks = [];

    this.init();
  }

  init() {
    // Create scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(this.config.scene.background);

    if (this.config.scene.fog) {
      this.scene.fog = new THREE.Fog(
        this.config.scene.fog.color,
        this.config.scene.fog.near,
        this.config.scene.fog.far
      );
    }

    // Create camera
    this.camera = new THREE.PerspectiveCamera(
      this.config.camera.fov,
      this.container.clientWidth / this.container.clientHeight,
      this.config.camera.near,
      this.config.camera.far
    );
    this.camera.position.set(...this.config.camera.position);
    this.camera.lookAt(...this.config.camera.lookAt);

    // Create renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.container.appendChild(this.renderer.domElement);

    // Create controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = this.config.controls.enableDamping;
    this.controls.dampingFactor = this.config.controls.dampingFactor;
    this.controls.minDistance = this.config.controls.minDistance;
    this.controls.maxDistance = this.config.controls.maxDistance;
    this.controls.autoRotate = this.config.controls.autoRotate;
    this.controls.autoRotateSpeed = this.config.controls.autoRotateSpeed;

    // Handle window resize
    window.addEventListener('resize', this.onWindowResize.bind(this));
  }

  onWindowResize() {
    this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
  }

  addToScene(object) {
    this.scene.add(object);
  }

  removeFromScene(object) {
    this.scene.remove(object);
  }

  addAnimationCallback(callback) {
    this.animationCallbacks.push(callback);
  }

  removeAnimationCallback(callback) {
    const index = this.animationCallbacks.indexOf(callback);
    if (index > -1) {
      this.animationCallbacks.splice(index, 1);
    }
  }

  animate() {
    this.animationId = requestAnimationFrame(this.animate.bind(this));

    // Update controls
    this.controls.update();

    // Execute animation callbacks
    this.animationCallbacks.forEach(callback => callback());

    // Render scene
    this.renderer.render(this.scene, this.camera);
  }

  start() {
    this.animate();
  }

  stop() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  dispose() {
    this.stop();
    window.removeEventListener('resize', this.onWindowResize.bind(this));
    this.renderer.dispose();
    this.controls.dispose();
  }

  // Camera controls
  resetCamera() {
    this.camera.position.set(...this.config.camera.position);
    this.camera.lookAt(...this.config.camera.lookAt);
    this.controls.reset();
  }

  setCameraPosition(x, y, z) {
    this.camera.position.set(x, y, z);
  }

  // Auto-rotate controls
  toggleAutoRotate() {
    this.controls.autoRotate = !this.controls.autoRotate;
    return this.controls.autoRotate;
  }

  setAutoRotate(enabled) {
    this.controls.autoRotate = enabled;
  }

  // Screenshot functionality
  takeScreenshot(filename = 'cubesat-screenshot.png') {
    this.renderer.render(this.scene, this.camera);
    const dataURL = this.renderer.domElement.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = filename;
    link.href = dataURL;
    link.click();
  }

  // Get scene info
  getSceneInfo() {
    return {
      objects: this.scene.children.length,
      triangles: this.renderer.info.render.triangles,
      calls: this.renderer.info.render.calls,
      memory: this.renderer.info.memory
    };
  }
}

export default SceneManager;

