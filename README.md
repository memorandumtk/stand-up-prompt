
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


### Step1. Make Background For Alarms and Notifications testing
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
        main: './src/components/Popup.tsx',
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


### Step2. Enable Counting by Clicking the notification
- Define type of Summary(`src/types/Summary.ts`), which the number will be stored to.
```text
class Summary {
    public number_of_standing: number;

    constructor(number_of_standing: number) {
        this.number_of_standing = number_of_standing;
    }
}

export default Summary;
```
- Update the logic after firing the notification in `src/background.ts`
```typescript
import Summary from "./types/Summary";

export {};  // This line makes the file a module
const ALARM_NAME = "StandUpAlarm";
const NOTIFICATION_NAME = "StandUpNotification";

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
            priority: 0
        });

        chrome.notifications.onClicked.addListener(notificationId => {
            if (notificationId === NOTIFICATION_NAME) {
                chrome.notifications.clear(NOTIFICATION_NAME);

                chrome.storage.sync.get(["summary"], (result) => {
                    console.log(result)  // just to see what's in the result
                    const summary: Summary = result.summary || {number_of_standing: 0};
                    const numberOfStanding = summary.number_of_standing ? summary.number_of_standing + 1 : 1;
                    summary.number_of_standing = numberOfStanding;

                    chrome.storage.sync.set({ summary: summary }, () => {
                        console.log('Updated number_of_standing to', numberOfStanding);
                    });
                });
            }
        })
    }
});
```
- Update `src/components/Popup.tsx`
```typescript
import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import Summary from "../types/Summary";
import GetObjectFromStorage from "../utils/GetObjectFromStorage";

const Popup: React.FC = () => {
    const [summary, setSummary] = useState<Summary>({number_of_standing: 0});

    useEffect(() => {
        const fetchSummary = async () => {
            const summary = await GetObjectFromStorage('summary');
            setSummary(summary);
        };

        fetchSummary();
    }, []);

    return (
        <div>
            <h1>Stand-Up Reminder</h1>
            <p>{summary.number_of_standing}</p>
        </div>
    );
};

ReactDOM.render(<Popup/>, document.getElementById('root'));
```
- Create `src/utils/GetSummaryFromStorage.ts`
```typescript

import Summary from "../types/Summary";

const GetObjectFromStorage = async (): Promise<Summary> => {
    // This process of making Promise object is needed to insert Summary object into the Promise object.
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get(["summary"], (result) => {
            if (chrome.runtime.lastError) {
                return reject(chrome.runtime.lastError);
            }
            const summary = result.summary || {};
            resolve(summary);
        });
    });
}

export default GetObjectFromStorage;
```
- Create `src/utils/UpdateSummaryToStorage.ts`
```typescript
import Summary from "../types/Summary";

const UpdateNumberOfStanding = async (numberOfStanding: number) => {
    chrome.storage.sync.get(["summary"], (result) => {
        let summary: Summary = result.summary;
        summary.number_of_standing = numberOfStanding;
        chrome.storage.sync.set({summary});
    });
}

export default UpdateNumberOfStanding;
```


### Step3. Changed the structure of Summary type to align to set and get the summary of standing status.
- Since these codes will likely change largely, please refer to each branches from now on.
- This branch name is `03.polish-summary-object-type`
- What I updated mainly are 
  1. Update types structure of `src/types/Summary.ts`.
  2. Make the logic of updating `number_of_standing` value when the notification is clicked.
  3. Update the logic of getting the summary from the storage.
  4. Display the number of standing in the popup.
  5. Implemented the function removing the storage value.(it is just for refresh to see how new value is stored, but it might be useful for the future.)


### Step4. Make the change of the span (aim_hours) effective
- This branch name is `04.add-aim-hours`
- What I updated mainly are 
  1. Update types structure of `src/types/Summary.ts`.
  2. Made a form that includes the input of the span and the unit for it.
  3. When the form is submitted, the value of the span is updated in storage api.
  4. When the value of storage is updated, the value of alarm span is updated accordingly.
  

### Step5. Add the logic of calculating how many times to stand up a day
- The branch name for this step is `05.set-time-duration-and-how-many-times-to-stand`.
- What I updated mainly are
  1. Update the types structure of `src/types/Summary.ts`.
  2. (Changed the method in step 4 a lot.)
  3. Made a form that processes the change of start_time and end_time of a duration of the alarm.
  4. Made another input form to accept the change of span_of_alarm.
  5. When those forms in 3 or 4, those value will be updated in storage api.
  6. When the value of storage is updated, the value corresponding those in alarm is updated.
- How to set a duration of a alarm.
  - The value entered from the form will be checked with that if current time(minutes) is earlier, later, or within the range.  
  - When it's updated, the new value entered from the form will be converted to minutes calculating from the midnight of the day as a number using `ChangeTimeToMinutes` function.

### Step6. Add the logic of changing number to stand up in a day dynamically.
- The branch name for this step is `06.make-displaying-number-of-standing-dynamic
- What I did are:
  - Added chrome storage event listener to update the number of standing in the popup.
  - `chrome.storage.onChanged.addListener`

### Step7. Designed the popup to display the number of standing and the number of standing left in a day and make the popup colorful.
- The branch name for this step is `07.implement-design-of-popup`
- What I did are:
  - Added the logic of calculating the number of standing left in a day.
  - Designed the popup to display the number of standing and the number of standing left in a day.
  - Made buttons the popup gradient with tailwind and the title be able to change the color according to the number of standing left in a day. FlowBite site helped me a lot.
    - https://flowbite.com/docs/components/buttons/
    - https://flowbite.com/docs/forms/timepicker/
    - https://flowbite.com/docs/forms/number-input/
    - https://design2tailwind.com/blog/tailwindcss-gradient-text/

### Step8 Fixed the problem that the value of howManyTimesToStand is not set.
- The branch name for this step is `08.reduce-points-of-error`.
- What I did are:
  - Fixed the problem that the value of howManyTimesToStand is not set.
  - Fixed the problem when the percentage of standing is NaN.
  - Added the logic of calculating the number of standing left in a day and next day too.
  - Added the image `human-try-to-stand.png` and make it be used in the logo of the extension and a notification.
