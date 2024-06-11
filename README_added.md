
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

### Integrate Tailwind
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


### Make Background For Alarms and Notifications testing
- Make `src/background.ts`
```typescript

export {};  // This line makes the file a module
const ALARM_NAME = "standUpAlarm";
const NOTIFICATION_NAME = "standUpNotification";

console.log("Hello from the background script!", ALARM_NAME);

async function createAlarm() {
    const alarm = await chrome.alarms.get(ALARM_NAME);
    if (typeof alarm === 'undefined') {
        await chrome.alarms.create(ALARM_NAME, {
            periodInMinutes: 1
        });
    }
}

createAlarm();

chrome.alarms.onAlarm.addListener(alarm => {
    console.log('Received alarm: ', alarm);
    if (alarm.name === ALARM_NAME) {
        chrome.notifications.create(NOTIFICATION_NAME, {
            type: "basic",
            iconUrl: "logo192.png",
            title: "Time to Stand Up!",
            message: "It's time to stand up and stretch a bit.",
            buttons: [{ title: "Got it!" }],
            priority: 0
        });
    }
});
```
- Install `chrome` package
```text
npm install @types/chrome --save-dev
```
- Install `react-app-rewired`, `customize-cra`, `html-webpack-plugin`
```text
npm install react-app-rewired customize-cra html-webpack-plugin --save-dev
```
- Edit `package.json`. In my way, I added `build-with-rewired` script.
```json
"scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "build-with-rewired": "react-app-rewired build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
},
```
- Edit `config-overrides.js`
  - main entry is `popup.tsx`, which will be needed later parts and necessary endpoint for `webpack` to bundle by default setting of that.
  > https://github.com/timarney/react-app-rewired/issues/421
```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function override(config, env) {
    config.entry = {
        main: './src/components/popup.tsx',
        background: './src/background.ts',
    };

    config.output = {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js',
    };

    config.optimization = {
        splitChunks: {
            cacheGroups: {
                default: false,
            },
        },
    };
    // Ensure plugins is defined and is an array
    if (!config.plugins) {
        config.plugins = [];
    } else if (!Array.isArray(config.plugins)) {
        config.plugins = [config.plugins];
    }

    config.plugins = config.plugins.filter(plugin => {
        return !(
            plugin.constructor.name === 'HtmlWebpackPlugin' ||
            plugin.constructor.name === 'GenerateSW'
        );
    });

    config.plugins.push(
        new HtmlWebpackPlugin({
            inject: true,
            chunks: ['main'],
            template: path.resolve(__dirname, 'public/index.html'),
            filename: 'index.html',
        }),
    );

    return config;
};
```
- Revise `manifest.json`
```text
{
  "manifest_version": 3,
  "name": "Stand-Up Reminder",
  "version": "1.0",
  "description": "Prompts users to stand up regularly and provides a summary.",
  "background": {
    "service_worker": "background.js"
  },
  "action": {
    "default_popup": "index.html",
    "default_icon": {
      "16": "logo192.png",
      "48": "logo192.png",
      "128": "logo192.png"
    }
  },
  "permissions": [
    "alarms",
    "storage",
    "notifications"
  ]
}
``` 
