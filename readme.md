# Vite CRA Watcher

Discover the power of automation in your React projects with vite-cra-watcher ! This cutting-edge npm library is designed to streamline your workflow by automatically creating necessary directories, adding boilerplate code, and cleaning up default files. With the latest update, it now smartly detects your toolchain (Vite or CRA) and cleans up unnecessary code from your App.jsx or App.js file, ensuring you're ready to start coding right away. Boost your productivity and maintain a consistent project structure effortlessly. Check it out and experience the difference!

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
