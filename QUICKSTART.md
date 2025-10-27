# Quick Start Guide

Get up and running with the 3D CubeSat Viewer in 5 minutes!

## 🚀 Installation (2 minutes)

### Prerequisites
- Node.js 18+ ([Download here](https://nodejs.org/))
- A modern web browser (Chrome, Firefox, Safari, or Edge)

### Steps

1. **Clone or download the project**
```bash
git clone https://github.com/researchsat/3dCubeSat.git
cd 3dCubeSat
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to `http://localhost:3000`

🎉 **Done!** You should see the 3D CubeSat viewer.

---

## 🎮 Basic Usage (3 minutes)

### Navigating the 3D View

| Action | How To |
|--------|--------|
| **Rotate** | Left-click and drag |
| **Pan** | Right-click and drag |
| **Zoom** | Scroll wheel |

### Selecting Components

1. **Click** on any colored component in the 3D view
2. The component will **flash** and glow
3. Component details appear in the **info panel** (top-left)

### Opening the Editor

**Method 1:** Press the `E` key

**Method 2:** Click the "Open Editor" button (bottom-left)

---

## ✏️ Adding Your First Component

1. **Open the editor** (press `E`)

2. **Click the "Add New" tab** (should be selected by default)

3. **Fill in the form:**
   - **Name:** "My Custom Sensor"
   - **Section:** U2 (Sensors & Optics)
   - **Category:** sensor
   - **Size:** Width: 4, Height: 3, Depth: 2
   - **Position:** X: 2, Y: 0, Z: 0
   - **Color:** Pick any color you like
   - **Description:** "My first custom component"

4. **Click "Add Component"**

5. **See your component** appear in the 3D view!

---

## 🔧 Editing a Component

1. **Click on a component** in the 3D view to select it

2. The editor automatically switches to the **"Edit Selected"** tab

3. **Change any properties** you want:
   - Move it by changing Position X, Y, Z
   - Resize it by changing Width, Height, Depth
   - Change its color

4. **Click "Update Component"**

5. **See the changes** immediately in the 3D view!

---

## 💾 Saving Your Work

### Auto-Save
Your work is **automatically saved** to your browser every 60 seconds.

### Manual Export
1. Click the **💾 icon** in the toolbar (bottom-right)
2. A file named `cubesat-config.json` will download
3. Keep this file safe!

### Loading Saved Work
1. Click the **📂 icon** in the toolbar
2. Select your saved `cubesat-config.json` file
3. Your configuration loads instantly!

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `E` | Toggle editor panel |
| `R` | Toggle auto-rotation |
| `Ctrl/Cmd + Z` | Undo last change |
| `Ctrl/Cmd + Shift + Z` | Redo |

---

## 🎯 Common Tasks

### Toggle Section Visibility

Want to hide U1 to see U2 better?

1. Click **"Toggle U1"** button (bottom-left)
2. U1 components disappear
3. Click again to show them

### Take a Screenshot

1. Click the **📷 icon** in the toolbar
2. A PNG image downloads automatically

### Reset Camera View

Lost your view? Click **"Reset Camera"** (bottom-left)

### Enable Auto-Rotation

Click **"Auto Rotate"** (bottom-left) to see your CubeSat spin!

---

## 📱 Mobile Usage

The viewer works on tablets and phones!

- **Rotate:** One finger drag
- **Zoom:** Pinch gesture
- **Pan:** Two finger drag

---

## 🆘 Troubleshooting

### "Nothing appears in the browser"

1. Check the browser console (F12) for errors
2. Make sure you're using a modern browser
3. Try refreshing the page (Ctrl/Cmd + R)

### "Components don't appear after adding"

1. Check the section visibility (U1, U2, U3 toggles)
2. Try zooming out (scroll wheel)
3. Click "Reset Camera"

### "Build fails"

```bash
# Clear everything and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### "Port 3000 already in use"

The dev server will automatically try port 3001, 3002, etc.

Or specify a different port:
```bash
npm run dev -- --port 3001
```

---

## 🎓 Next Steps

### Learn More
- Read the [API Documentation](API.md)
- Check out the [README](README.md)
- Explore the [Deployment Guide](DEPLOYMENT.md)

### Customize
- Edit `src/config/defaultConfig.js` to change defaults
- Modify `public/css/styles.css` to change colors/styling
- Add new component categories

### Deploy
```bash
# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy:gh-pages

# Or deploy to Netlify/Vercel
npm run deploy:netlify
npm run deploy:vercel
```

---

## 💡 Tips & Tricks

### Tip 1: Use the Component List
Click the **"Component List"** tab in the editor to see all components at once.

### Tip 2: Undo is Your Friend
Made a mistake? Just press `Ctrl/Cmd + Z` to undo!

### Tip 3: Export Often
Export your configuration regularly to avoid losing work.

### Tip 4: Use Descriptive Names
Give your components clear names like "Temperature Sensor - Top" instead of "Sensor1".

### Tip 5: Color Code by Function
Use similar colors for related components (e.g., all sensors in blue).

---

## 🎨 Example: Building a Custom CubeSat

Let's build a simple custom CubeSat from scratch!

### Step 1: Clear Default Components (Optional)
1. Open editor (`E`)
2. Go to "Component List" tab
3. Delete components you don't want

### Step 2: Add a Power Module
```
Name: Solar Panel Controller
Section: U3
Size: 8 × 8 × 2
Position: 0, 0, -11.33
Color: Green (#00ff00)
Category: power
```

### Step 3: Add a Camera
```
Name: High-Res Camera
Section: U2
Size: 5 × 5 × 4
Position: 0, 0, 0
Color: Blue (#0000ff)
Category: optics
```

### Step 4: Add an Experiment
```
Name: Crystal Growth Chamber
Section: U1
Size: 9 × 9 × 10
Position: 0, 0, 11.33
Color: Red (#ff0000)
Category: experiment
```

### Step 5: Export Your Design
Click 💾 to save your custom CubeSat!

---

## 🌟 You're Ready!

You now know enough to:
- ✅ Navigate the 3D view
- ✅ Add and edit components
- ✅ Save and load configurations
- ✅ Use keyboard shortcuts
- ✅ Build custom CubeSats

**Happy designing!** 🚀

---

## 📞 Need Help?

- **Issues:** [GitHub Issues](https://github.com/researchsat/3dCubeSat/issues)
- **Questions:** [GitHub Discussions](https://github.com/researchsat/3dCubeSat/discussions)
- **Email:** raviteja@researchsat.com.au

---

**Estimated time to complete this guide: 5-10 minutes**

Enjoy building your CubeSat! 🛰️

