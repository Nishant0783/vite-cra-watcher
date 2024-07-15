# Vite CRA Watcher

vite-cra-watcher is an npm library that watches for new files in your React application's `components` or `pages` directories and automatically adds boilerplate code to them. This ensures that all new components and pages have a consistent starting structure.

## Features - 1.x.x

- Watches for new files in `components` and `pages` directories.
- Supports `.jsx`, `.js`, `.tsx`, and `.ts` file extensions.
- Automatically adds boilerplate code to new files.
- Ensures all new components and pages follow a consistent structure.

## Features - 2.x.x
- Automatically detects whether the react app is created with `Vite` or `CRA`.
- Clear up `App.css` and `index.css` file present in `src` directory.
- Clear all the unnecessary code in `App.jsx ` or `App.js`.

## Installation

You can install the library using npm:

```bash
npm install vite-cra-watcher
```

## Usage

1. Add the script to package.json file

```bash
"scripts": {
  "start:watcher": "vite-cra-watcher"
}
```

2. Run the following command to start the watcher

```bash
npm run start:watcher
```

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue on GitHub.