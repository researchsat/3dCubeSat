# 3D CubeSat Viewer - Production Edition

A production-ready, interactive 3D visualization and design tool for CubeSat systems built with Three.js.

## Features

- 🎨 **Interactive 3D Visualization** - Fully interactive 3U CubeSat model with realistic materials
- ✏️ **Component Editor** - Add, edit, and remove components in real-time
- 💾 **Import/Export** - Save and load configurations as JSON
- 🎯 **Section Management** - Toggle visibility of U1, U2, U3 sections
- 📊 **Real-time Updates** - See changes immediately in the 3D view
- 🎨 **Material Editor** - Customize colors, opacity, and materials
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- 🚀 **Production Ready** - Optimized build, deployment scripts included

## Quick Start

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Deployment

### GitHub Pages
```bash
npm run deploy:gh-pages
```

### Netlify
```bash
npm run deploy:netlify
```

### Vercel
```bash
npm run deploy:vercel
```

## Project Structure

```
3dCubeSat/
├── src/
│   ├── modules/          # Core modules
│   │   ├── SceneManager.js
│   │   ├── ComponentManager.js
│   │   ├── LightingManager.js
│   │   └── InteractionManager.js
│   ├── components/       # 3D components
│   │   ├── CubeSatChassis.js
│   │   ├── InternalComponent.js
│   │   └── Separator.js
│   ├── ui/              # UI components
│   │   ├── EditorPanel.js
│   │   ├── InfoPanel.js
│   │   └── ControlPanel.js
│   ├── utils/           # Utilities
│   │   ├── ConfigLoader.js
│   │   └── StateManager.js
│   ├── config/          # Configuration
│   │   └── defaultConfig.js
│   └── main.js          # Entry point
├── public/
│   ├── css/
│   └── assets/
├── index.html
├── package.json
└── vite.config.js
```

## Configuration

Edit `src/config/defaultConfig.js` to customize:
- CubeSat dimensions
- Component specifications
- Colors and materials
- Lighting setup
- Camera settings

## API Usage

### Adding a Component

```javascript
componentManager.addComponent({
  name: 'New Sensor',
  size: [5, 3, 2],
  position: [0, 0, 5],
  color: 0x00ff00,
  section: 'U2'
});
```

### Editing a Component

```javascript
componentManager.editComponent('componentId', {
  position: [1, 2, 3],
  color: 0xff0000
});
```

### Removing a Component

```javascript
componentManager.removeComponent('componentId');
```

### Export Configuration

```javascript
const config = stateManager.exportConfig();
// Save to file or database
```

### Import Configuration

```javascript
stateManager.importConfig(configData);
```

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

## License

MIT License - see LICENSE file for details

## Contributing

Contributions are welcome! Please read CONTRIBUTING.md for guidelines.

## Support

For issues and questions, please open an issue on GitHub.

