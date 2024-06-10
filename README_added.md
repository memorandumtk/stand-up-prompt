
### Introduction
// Ref
https://blog.logrocket.com/creating-chrome-extension-react-typescript/
- Make project with typescript
```
npx create-react-app prompt-stand-up-react --template typescript
cd prompt-stand-up-react
```
- Edit `public/manifest.json`
```
{
   "name": "Chrome React SEO Extension",
   "description": "The power of React and TypeScript for building interactive Chrome extensions",
   "version": "1.0",
   "manifest_version": 3,
   "action": {
       "default_popup": "index.html",
       "default_title": "Open the popup"
   },
   "icons": {
       "16": "logo192.png",
       "48": "logo192.png",
       "128": "logo192.png"
   }
}
```
- First time build
```text
npm run build
```

### Tailwind
// Ref
// https://dev.to/ethand91/creating-a-react-app-with-typescript-tailwind-support-18b8
- install
```text
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
- Edit `src/index.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```
- Edit `tailwind.config.js`. Add these lines.
```text
content: [
    './src/**/*.{js,jsx,ts,tsx}',
],
```
- Edit `src/App.css`, for example I changed the bigness of the app component with the changes, the top element in the `App.tsx`.
```text

```

- Then build.
```text
npm run build
```


