# Splash Screen Implementation

This project includes a custom splash screen that displays while your app initializes. The splash screen provides a smooth, animated loading experience for users.

## Features

- **Animated Logo & Text**: Smooth fade-in and scale animations
- **Loading Indicators**: Animated dots and progress bar
- **Theme Support**: Automatically adapts to light/dark mode
- **Task Progress**: Shows initialization steps with progress bar
- **Configurable Duration**: Customizable timing for different tasks

## How It Works

### 1. App Configuration (`app.json`)
The splash screen is configured in your `app.json` file using the `expo-splash-screen` plugin:

```json
{
  "expo": {
    "plugins": [
      [
        "expo-splash-screen",
        {
          "image": "./assets/images/splash-icon.png",
          "imageWidth": 200,
          "resizeMode": "contain",
          "backgroundColor": "#ffffff"
        }
      ]
    ]
  }
}
```

### 2. Root Layout (`app/_layout.tsx`)
The splash screen is integrated into your root layout and shows while:
- Fonts are loading
- App is initializing
- Any other setup tasks are running

### 3. Splash Screen Component (`components/SplashScreen.tsx`)
The main splash screen component handles:
- Animations (fade, scale, loading dots)
- Theme detection (light/dark mode)
- Progress tracking
- Task display

## Customization

### Changing Colors
Modify the color variables in `SplashScreen.tsx`:

```typescript
const backgroundColor = isDark ? '#000000' : '#ffffff';
const textColor = isDark ? '#ffffff' : '#333333';
const dotColor = isDark ? '#0A84FF' : '#007AFF';
```

### Adding Tasks
Update the `initializationTasks` array in `_layout.tsx`:

```typescript
const initializationTasks = [
  { name: 'Loading fonts...', duration: 800 },
  { name: 'Initializing app...', duration: 600 },
  { name: 'Preparing UI...', duration: 400 },
  { name: 'Almost ready...', duration: 300 },
];
```

### Changing Duration
Adjust the minimum splash screen duration in `SplashScreen.tsx`:

```typescript
// Show splash for at least 2.5 seconds
}, Math.max(2500, totalDuration + 1000));
```

### Modifying Animations
Customize the animation parameters:

```typescript
Animated.timing(fadeAnim, {
  toValue: 1,
  duration: 1000, // Change this value
  useNativeDriver: true,
}),
```

## File Structure

```
components/
  └── SplashScreen.tsx          # Main splash screen component
app/
  └── _layout.tsx               # Root layout with splash integration
app.json                        # Expo configuration with splash plugin
```

## Dependencies

- `expo-splash-screen`: Native splash screen management
- `expo-image`: Optimized image loading
- `react-native-reanimated`: Smooth animations

## Best Practices

1. **Keep it Fast**: Don't make the splash screen too long
2. **Show Progress**: Use the task system to keep users informed
3. **Match Branding**: Use your app's colors and logo
4. **Handle Errors**: Always provide fallbacks for initialization failures
5. **Test on Devices**: Ensure smooth performance on actual devices

## Troubleshooting

### Splash Screen Not Hiding
- Check that `SplashScreen.hideAsync()` is being called
- Ensure the `onFinish` callback is properly triggered

### Animations Not Smooth
- Verify `useNativeDriver: true` is set for supported animations
- Check device performance on slower devices

### Theme Not Switching
- Ensure `useColorScheme` hook is working properly
- Check that theme changes are being detected

## Example Usage

```typescript
import SplashScreenComponent from '@/components/SplashScreen';

// In your component
<SplashScreenComponent 
  onFinish={() => console.log('Splash finished')}
  tasks={[
    { name: 'Loading...', duration: 1000 },
    { name: 'Ready!', duration: 500 }
  ]}
/>
```
