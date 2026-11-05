# Ishank's Universe — interactive 3D portfolio

This combines the Personal Universe artwork with Mission Control typography, fine diagram lines, restrained copper accents, and clear project descriptions.

## Run

Open **portfolio.html** directly in a modern browser. This standalone file embeds the code, styles and illustrated fallback. The complete folder also works by opening `index.html`, or running `python3 -m http.server 8080` from this directory. No package installation is needed to use the delivered build. Outbound links open GitHub or the existing drone demo.

## Interaction

- Click or tap a place: the character walks there, then its project panel opens. Click a walkway to move without opening a panel.
- Drag to orbit. Right-drag or two-finger drag pans the camera. Pinch, scroll or use the camera controls to zoom; the crosshair resets the view.
- WASD or arrow keys walk relative to the camera. E opens a nearby destination. Movement is constrained to the islands and bridges, with building obstacles and pathfinding.
- Use Projects to reach all content without navigating the illustration.
- Keyboard: Tab and Enter activate places, Home resets the camera, Escape closes panels.
- Layout supports small screens, reduced-motion preferences, keyboard focus, and native modal dialogs.

This is a real Three.js scene with a walking character, procedural low-poly buildings, a drone, plants and floating islands. It has no accounts, analytics, persistence or physics engine. Reduced-motion mode skips travel transitions; WebGL2 failure falls back to an illustrated map. The fallback artwork is AI-generated. The actual GitHub profile has not been changed.

## Source and rebuild

`world3d.js` contains the scene and movement. `app.js` contains the accessible interface. Three.js 0.180.0 and OrbitControls are vendored locally under `vendor/three`, including the MIT license. `world3d.bundle.js` is the browser-ready bundle.

After changing 3D source, rebuild with:

```sh
npm exec --yes --package=esbuild@0.25.10 -- esbuild world3d.js --bundle --format=iife --alias:three=./vendor/three/three.module.js --minify --outfile=world3d.bundle.js
python3 package_standalone.py
```

`qa.py` checks actual browser interactions and writes screenshots. It uses Playwright with Chromium's software renderer. Physical mobile GPU performance and touch ergonomics remain unverified. This prototype does not include MyVerse's mission tracking, saves, inventories or accounts.

## GitHub and publication

GitHub READMEs cannot execute this site's JavaScript. The intended integration is a static illustrated banner on the profile linking to this separate portfolio. Hosting is not yet configured. The site can be published to a static host, such as GitHub Pages or Vercel, when authorized. Repository-relative paths support a GitHub Pages project subdirectory.

The portfolio features public projects only. The observatory presents research interests without publishing private repository contents or results.
