# Pyaw Web Widget

A lightweight, customizable chat widget for seamless customer support integration with Pyaw AI.

## Overview

Pyaw Web Widget is a drop-in chat solution that enables direct customer interactions through Pyaw's AI-powered support system. The widget is platform-agnostic and can be integrated into any web environment.

## Features

- Vanilla JavaScript implementation
- Zero dependencies
- Conflict-free custom CSS classes
- Responsive design
- Customizable themes and branding
- Cross-platform compatibility

## Installation

Add the following script to your HTML:

```html
<script src="https://chatiq.blob.core.windows.net/static-files/v3-pyaw-widget/chatbot.min.js"></script>
```

## Usage

### Basic Implementation

For default settings:

```html
<script>
document.addEventListener('DOMContentLoaded', () => {
    new ChatBot();
});
</script>
```

### Custom Configuration

For branded experience:

```html
<script>
document.addEventListener('DOMContentLoaded', () => {
    new ChatBot({
        brandName: "Your Brand",
        brandLogo: "path/to/logo.png",
        brandShortDescription: "Your tagline",
        brandWelcomeMessage: "Welcome message",
        theme: "light",
        primaryColor: "#0E54FF",
        secondaryColor: "#F5F7FF",
        position: "bottom-right",
        size: "large",
        soundEnabled: true,
        messageSound: "path/to/sound.mp3"
    });
});
</script>
```

### Configuration Options

| Option | Type | Description | Default |
|--------|------|-------------|---------|
| brandName | string | Company name | "Pyaw" |
| brandLogo | string | URL to logo (256x256px) | Default logo |
| theme | string | "light" or "dark" | "light" |
| size | string | "small", "medium", "large", "fullscreen" | "large" |
| position | string | Widget position | "bottom-right" |
| soundEnabled | boolean | Enable notification sounds | true |

and more configurations coming soon

## Project Structure

```
src/
├── chatbot.min.js    # Main widget script
├── logo.png          # Brand assets
└── tune.mp3          # Notification sound
```

## Platform Compatibility

- HTML websites
- WordPress
- Wix
- Framer
- Squarespace
- Shopify
- Other web platforms

## Support

For issues or feature requests, please contact our support team.