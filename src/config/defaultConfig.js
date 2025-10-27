/**
 * Default CubeSat Configuration
 * This file contains all configurable parameters for the 3D CubeSat visualization
 */

export const defaultConfig = {
  // CubeSat dimensions (in cm)
  cubesat: {
    width: 10,
    height: 10,
    length: 34,
    units: 3, // Number of U sections
    unitLength: 11.33 // Length of each U section
  },

  // Chassis material properties
  chassis: {
    color: 0x555555,
    metalness: 0.7,
    roughness: 0.3,
    opacity: 0.3,
    wireframe: true,
    wireframeColor: 0x888888
  },

  // Separator plates between sections
  separators: {
    thickness: 0.2,
    color: 0x223344,
    metalness: 0.5,
    roughness: 0.5,
    opacity: 0.6,
    positions: [5.665, -5.665] // Z positions
  },

  // Internal components
  components: [
    // U1 - Experiment Section
    {
      id: 'furnace',
      name: 'Furnace / Crucible',
      size: [9, 6, 10.5],
      position: [0, 0, 11.33],
      color: 0xe06161,
      section: 'U1',
      category: 'experiment',
      description: 'Primary payload - high-temperature furnace for material experiments',
      specs: {
        maxTemp: '1200°C',
        power: '50W',
        mass: '450g'
      }
    },
    {
      id: 'thermocouple',
      name: 'Thermocouple Array',
      size: [2.2, 0.6, 2.2],
      position: [0, 3, 13.9],
      color: 0xffc66b,
      section: 'U1',
      category: 'sensor',
      description: 'Temperature monitoring array mounted on furnace',
      specs: {
        channels: 8,
        range: '-50°C to 1300°C',
        accuracy: '±0.5°C'
      }
    },
    // U2 - Sensors & Optics Section
    {
      id: 'camera',
      name: 'Mini CMOS Camera',
      size: [4, 3.5, 3],
      position: [-2.4, 0, 4.0],
      color: 0x61b3e0,
      section: 'U2',
      category: 'optics',
      description: 'Front-facing high-resolution camera',
      specs: {
        resolution: '1920x1080',
        fps: 30,
        fov: '60°'
      }
    },
    {
      id: 'spectrometer',
      name: 'Fiber Spectrometer',
      size: [5.2, 2.8, 2.6],
      position: [2.6, 0, 1.2],
      color: 0x61b3e0,
      section: 'U2',
      category: 'optics',
      description: 'Optical spectrometer for material analysis',
      specs: {
        range: '200-1100nm',
        resolution: '0.5nm',
        integration: '1ms-10s'
      }
    },
    {
      id: 'acoustic',
      name: 'Acoustic Sensor',
      size: [2.6, 1.8, 1.6],
      position: [-3.0, 0, -3.8],
      color: 0x61b3e0,
      section: 'U2',
      category: 'sensor',
      description: 'Acoustic monitoring sensor',
      specs: {
        frequency: '20Hz-20kHz',
        sensitivity: '-40dB',
        power: '0.5W'
      }
    },
    // U3 - Electronics Section
    {
      id: 'daq',
      name: 'DAQ / MCU & Storage',
      size: [8.6, 3.6, 8.6],
      position: [0, 0, -10.3],
      color: 0x9be26b,
      section: 'U3',
      category: 'electronics',
      description: 'Central data acquisition and processing unit',
      specs: {
        processor: 'ARM Cortex-M7',
        storage: '128GB',
        ram: '512MB'
      }
    },
    {
      id: 'power',
      name: 'Power Conditioning / Heaters',
      size: [4, 2.4, 4],
      position: [2.6, 0, -14.0],
      color: 0x7fb86f,
      section: 'U3',
      category: 'power',
      description: 'Power management and thermal control',
      specs: {
        voltage: '3.3V-12V',
        current: '5A max',
        heater: '10W'
      }
    },
    {
      id: 'mems',
      name: 'Pressure & Gas MEMS',
      size: [2.2, 1.6, 2.2],
      position: [-3.0, 0, -12.6],
      color: 0x7fb86f,
      section: 'U3',
      category: 'sensor',
      description: 'MEMS-based pressure and gas sensors',
      specs: {
        range: '0-100kPa',
        accuracy: '±0.1%',
        gases: 'O2, N2, CO2'
      }
    }
  ],

  // Wiring harnesses
  harnesses: [
    {
      id: 'harness-u1-u2',
      start: [0, 0, 11.33],
      end: [0, 0, 0],
      color: 0xffff00,
      radius: 0.2
    },
    {
      id: 'harness-u2-u3',
      start: [0, 0, 0],
      end: [0, 0, -11.33],
      color: 0xffff00,
      radius: 0.2
    }
  ],

  // Lighting configuration
  lighting: {
    hemisphere: {
      skyColor: 0xffffff,
      groundColor: 0x444444,
      intensity: 0.6
    },
    directional: {
      color: 0xffffff,
      intensity: 0.8,
      position: [30, 40, 30],
      castShadow: true,
      shadowMapSize: 2048
    },
    point: {
      color: 0xffa500,
      intensity: 0.3,
      distance: 50,
      position: [0, 0, 11.33]
    },
    ambient: {
      color: 0x404040,
      intensity: 0.4
    }
  },

  // Camera settings
  camera: {
    fov: 45,
    near: 0.1,
    far: 1000,
    position: [40, 25, 60],
    lookAt: [0, 0, 0]
  },

  // Controls settings
  controls: {
    enableDamping: true,
    dampingFactor: 0.05,
    minDistance: 20,
    maxDistance: 150,
    autoRotate: false,
    autoRotateSpeed: 0.5
  },

  // Scene settings
  scene: {
    background: 0x0b1020,
    fog: null
  },

  // Grid and helpers
  helpers: {
    grid: {
      size: 80,
      divisions: 80,
      colorCenterLine: 0x444444,
      colorGrid: 0x222222,
      position: [0, -20, 0]
    },
    axes: {
      size: 15,
      position: [-25, -20, -25]
    },
    scaleMarks: {
      enabled: true,
      interval: 1,
      range: [-17, 17],
      size: [0.3, 0.1, 0.1],
      color: 0xffffff,
      offset: [5.5, 0, 0]
    }
  },

  // UI settings
  ui: {
    showInfoPanel: true,
    showControls: true,
    showLegend: true,
    showSectionLabels: true,
    theme: 'dark'
  },

  // Material defaults for new components
  materialDefaults: {
    metalness: 0.4,
    roughness: 0.6,
    emissiveIntensity: 0,
    transparent: false,
    opacity: 1.0
  },

  // Interaction settings
  interaction: {
    hoverEmissiveIntensity: 0.3,
    selectEmissiveIntensity: 0.5,
    flashDuration: 150,
    flashCount: 6
  },

  // Section definitions
  sections: {
    U1: {
      name: 'U1 - Experiment',
      color: 0xe06161,
      range: [5.665, 17],
      visible: true
    },
    U2: {
      name: 'U2 - Sensors & Optics',
      color: 0x61b3e0,
      range: [-5.665, 5.665],
      visible: true
    },
    U3: {
      name: 'U3 - Electronics & DAQ',
      color: 0x9be26b,
      range: [-17, -5.665],
      visible: true
    }
  },

  // Export/Import settings
  export: {
    format: 'json',
    includeMetadata: true,
    prettyPrint: true
  }
};

export default defaultConfig;

