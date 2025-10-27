# Contributing to 3D CubeSat Viewer

Thank you for your interest in contributing to the 3D CubeSat Viewer project!

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/3dCubeSat.git`
3. Install dependencies: `npm install`
4. Create a branch: `git checkout -b feature/your-feature-name`

## Development Workflow

1. Make your changes
2. Test your changes: `npm run dev`
3. Lint your code: `npm run lint`
4. Format your code: `npm run format`
5. Commit your changes with a descriptive message
6. Push to your fork
7. Create a Pull Request

## Code Style

- Use ES6+ features
- Follow the existing code structure
- Add comments for complex logic
- Keep functions small and focused
- Use meaningful variable names

## Project Structure

```
src/
├── modules/          # Core functionality modules
├── components/       # 3D component classes
├── ui/              # UI components
├── utils/           # Utility functions
└── config/          # Configuration files
```

## Adding New Features

### Adding a New Component Type

1. Define the component in `src/config/defaultConfig.js`
2. Create a class in `src/components/` if needed
3. Update the ComponentManager if necessary

### Adding New UI Features

1. Create UI component in `src/ui/`
2. Add styles to `public/css/styles.css`
3. Integrate with main.js

## Testing

- Test in multiple browsers (Chrome, Firefox, Safari, Edge)
- Test responsive design on different screen sizes
- Verify all interactive features work correctly

## Pull Request Guidelines

- Provide a clear description of the changes
- Reference any related issues
- Include screenshots for UI changes
- Ensure all tests pass
- Update documentation if needed

## Questions?

Open an issue for any questions or concerns.

Thank you for contributing!

