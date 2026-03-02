# ONETAP 📲

ONETAP is an Expo React Native WebView application that loads the ONETAP Connect dashboard with persistent sessions and smooth splash animations.

---

## 🚀 Features

- 🌐 Loads: https://onetapconnect.co.ke/dashboard
- 🔐 Persistent login sessions (cookies enabled)
- 🎬 Animated splash screen (fade + slide logo)
- 🌙 Automatic system theme detection (Light/Dark mode)
- 🔄 Pull-to-refresh support
- 🔙 Android hardware back button support
- 🔄 Floating refresh button
- 📱 Clean, modern UI

---

## 🛠 Built With

- Expo
- React Native
- react-native-webview
- expo-router
- @expo/vector-icons

---

## 📦 Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/onetap-app.git
cd onetap-app
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npx expo start
```

4. Open in Expo Go on your device or run on emulator.

---

## ⚙️ Configuration

The app loads the ONETAP dashboard by default:

```ts
source={{ uri: "https://onetapconnect.co.ke/dashboard" }}
```

Cookies are enabled to maintain login sessions:

```ts
sharedCookiesEnabled={true}
thirdPartyCookiesEnabled={true}
```

---

## 📁 Project Structure

```
.
├── app/
│   └── index.tsx
├── assets/
│   └── images/
│       └── icon.png
├── app.json
├── package.json
└── README.md
```

---

## 🧩 Splash Animation

The splash screen uses:

- Animated fade-in
- Slide-up transition
- Auto-dismiss after animation

---

## 📱 Android Back Handling

If the WebView can go back, the Android hardware back button navigates within the WebView instead of exiting the app.

---

## 🌙 Theme Support

The app automatically adapts to system theme using:

```ts
useColorScheme();
```

No forced dark mode — it follows the user’s device settings.

---

## 🏗 Build for Production

To build an Android APK or AAB:

```bash
eas build -p android
```

Make sure EAS CLI is installed:

```bash
npm install -g eas-cli
```

---
