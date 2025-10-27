# Project File Structure

Complete overview of all files in the 3D CubeSat Viewer project.

## 📁 Root Directory

```
3dCubeSat/
├── index.html                    # Main HTML entry point
├── package.json                  # Project dependencies and scripts
├── package-lock.json             # Locked dependency versions
├── vite.config.js                # Vite build configuration
├── .gitignore                    # Git ignore rules
├── .eslintrc.json                # ESLint configuration
├── .prettierrc                   # Prettier configuration
├── netlify.toml                  # Netlify deployment config
├── vercel.json                   # Vercel deployment config
└── LICENSE                       # MIT License
```

## 📚 Documentation Files

```
├── README.md                     # Project overview and quick start
├── QUICKSTART.md                 # 5-minute getting started guide
├── API.md                        # Complete API documentation
├── DEPLOYMENT.md                 # Deployment guide (7 platforms)
├── CONTRIBUTING.md               # Contribution guidelines
├── PROJECT_SUMMARY.md            # Technical project summary
├── CHECKLIST.md                  # Production readiness checklist
├── FINAL_REPORT.md               # Final project report
├── FILE_STRUCTURE.md             # This file
└── instructions.md               # Original project requirements
```

## 💻 Source Code

### Main Application

```
src/
├── main.js                       # Application entry point (300+ lines)
│   ├── CubeSatApp class
│   ├── Event listeners
│   ├── Keyboard shortcuts
│   └── Global API exposure
```

### Core Modules

```
src/modules/
├── SceneManager.js               # Three.js scene management (200+ lines)
│   ├── Scene initialization
│   ├── Camera setup
│   ├── Renderer configuration
│   ├── OrbitControls
│   ├── Animation loop
│   └── Screenshot functionality
│
├── ComponentManager.js           # Component CRUD operations (275+ lines)
│   ├── Component creation
│   ├── Component editing
│   ├── Component deletion
│   ├── Section management (U1, U2, U3)
│   ├── Export/Import
│   └── Component querying
│
├── LightingManager.js            # Lighting system (150+ lines)
│   ├── Hemisphere light
│   ├── Directional light (with shadows)
│   ├── Point light
│   ├── Ambient light
│   └── Light control methods
│
└── InteractionManager.js         # User interactions (200+ lines)
    ├── Raycasting
    ├── Mouse/touch events
    ├── Hover effects
    ├── Selection system
    ├── Flash animations
    └── Event callbacks
```

### 3D Components

```
src/components/
├── InternalComponent.js          # Individual component class (150+ lines)
│   ├── BoxGeometry creation
│   ├── MeshStandardMaterial
│   ├── Edge lines
│   ├── Metadata storage
│   └── Update methods
│
└── CubeSatChassis.js             # Main structure (200+ lines)
    ├── Chassis geometry
    ├── Wireframe overlay
    ├── Separator plates
    ├── Wiring harnesses
    ├── Scale marks
    └── Group management
```

### User Interface

```
src/ui/
└── EditorPanel.js                # Component editor UI (300+ lines)
    ├── Panel creation
    ├── Tab system (Add/Edit/List)
    ├── Form handling
    ├── Event listeners
    ├── Component list rendering
    └── Validation
```

### Utilities

```
src/utils/
└── StateManager.js               # State & persistence (200+ lines)
    ├── Undo/Redo system
    ├── History management
    ├── Auto-save
    ├── Export to file
    ├── Import from file
    ├── localStorage integration
    └── State serialization
```

### Configuration

```
src/config/
└── defaultConfig.js              # Default configuration (313 lines)
    ├── CubeSat dimensions
    ├── 8 default components
    ├── Lighting settings
    ├── Camera settings
    ├── Controls settings
    ├── Material defaults
    ├── Interaction parameters
    └── Helper settings
```

## 🎨 Public Assets

```
public/
├── css/
│   └── styles.css                # Main stylesheet (400+ lines)
│       ├── CSS variables
│       ├── Dark theme
│       ├── Panel styles
│       ├── Button styles
│       ├── Form styles
│       ├── Component list styles
│       ├── Animations
│       └── Responsive breakpoints
│
└── assets/                       # (Empty - for future assets)
```

## 🏗️ Build Output

```
dist/                             # Production build (generated)
├── index.html                    # Minified HTML
├── assets/
│   ├── main-[hash].js            # Main bundle (40.82 KB)
│   ├── three-core-[hash].js      # Three.js core (457.70 KB)
│   └── three-addons-[hash].js    # Three.js addons (12.47 KB)
└── css/
    └── styles.css                # Copied CSS
```

## 📦 Dependencies

### Production Dependencies
```json
{
  "three": "^0.160.0"             # 3D graphics library
}
```

### Development Dependencies
```json
{
  "vite": "^5.0.0",               # Build tool
  "eslint": "^8.55.0",            # Code linting
  "prettier": "^3.1.0",           # Code formatting
  "terser": "^5.44.0",            # Minification
  "gh-pages": "^6.1.0"            # GitHub Pages deployment
}
```

## 🗂️ File Categories

### Configuration Files (8)
- package.json
- vite.config.js
- .gitignore
- .eslintrc.json
- .prettierrc
- netlify.toml
- vercel.json
- LICENSE

### Documentation Files (9)
- README.md
- QUICKSTART.md
- API.md
- DEPLOYMENT.md
- CONTRIBUTING.md
- PROJECT_SUMMARY.md
- CHECKLIST.md
- FINAL_REPORT.md
- FILE_STRUCTURE.md

### Source Code Files (11)
- src/main.js
- src/modules/SceneManager.js
- src/modules/ComponentManager.js
- src/modules/LightingManager.js
- src/modules/InteractionManager.js
- src/components/InternalComponent.js
- src/components/CubeSatChassis.js
- src/ui/EditorPanel.js
- src/utils/StateManager.js
- src/config/defaultConfig.js
- index.html

### Style Files (1)
- public/css/styles.css

### Legacy Files (3)
- cubesat-3d-viewer.html (original prototype)
- viewer3d.html (intermediate version)
- instructions.md (original requirements)

## 📊 File Statistics

| Category | Count | Total Lines |
|----------|-------|-------------|
| **JavaScript Modules** | 11 | ~2,800 |
| **CSS Files** | 1 | ~400 |
| **HTML Files** | 1 | ~150 |
| **Documentation** | 9 | ~1,500 |
| **Configuration** | 8 | ~200 |
| **Total** | 30 | ~5,050 |

## 🎯 Key Files by Purpose

### Getting Started
1. **README.md** - Start here
2. **QUICKSTART.md** - 5-minute guide
3. **package.json** - Install dependencies

### Development
1. **src/main.js** - Application entry
2. **vite.config.js** - Build config
3. **src/config/defaultConfig.js** - Settings

### Deployment
1. **DEPLOYMENT.md** - Deployment guide
2. **netlify.toml** - Netlify config
3. **vercel.json** - Vercel config

### API Reference
1. **API.md** - Complete API docs
2. **src/modules/** - Core modules
3. **src/components/** - 3D components

### Contributing
1. **CONTRIBUTING.md** - Guidelines
2. **.eslintrc.json** - Linting rules
3. **.prettierrc** - Formatting rules

## 🔍 File Relationships

```
index.html
    └── src/main.js (entry point)
        ├── src/config/defaultConfig.js
        ├── src/modules/SceneManager.js
        │   └── three (dependency)
        ├── src/modules/LightingManager.js
        │   └── three (dependency)
        ├── src/modules/ComponentManager.js
        │   ├── src/components/InternalComponent.js
        │   └── src/components/CubeSatChassis.js
        ├── src/modules/InteractionManager.js
        │   └── three (dependency)
        ├── src/ui/EditorPanel.js
        └── src/utils/StateManager.js
```

## 📝 Notes

### Important Files
- **src/main.js** - Main application logic
- **src/config/defaultConfig.js** - All default settings
- **vite.config.js** - Build optimization
- **package.json** - Dependencies and scripts

### Generated Files (Don't Edit)
- **dist/** - Production build output
- **node_modules/** - Installed dependencies
- **package-lock.json** - Locked versions

### Legacy Files (Reference Only)
- **cubesat-3d-viewer.html** - Original prototype
- **viewer3d.html** - Intermediate version
- **instructions.md** - Original requirements

## 🚀 Quick Navigation

### To Start Development
```bash
npm install
npm run dev
```
Files involved: package.json, vite.config.js, src/main.js

### To Build for Production
```bash
npm run build
```
Files involved: vite.config.js, all src/ files

### To Deploy
```bash
npm run deploy:gh-pages
# or
npm run deploy:netlify
# or
npm run deploy:vercel
```
Files involved: netlify.toml, vercel.json, dist/

### To Customize
- **Components:** Edit src/config/defaultConfig.js
- **Styling:** Edit public/css/styles.css
- **Functionality:** Edit src/modules/*.js

---

**Total Project Files:** 30+  
**Total Lines of Code:** ~5,050+  
**Last Updated:** October 26, 2025

