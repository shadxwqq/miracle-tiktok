# MiracleTikTok

A Claude Code plugin for managing MargyT TikTok mod settings directly from your IDE.

## Features

- **Region Management**: Switch between 24 different regions (Netherlands, US, UK, Germany, France, etc.) to change how TikTok identifies your location
- **Theme Customization**: Choose between light, dark, or system theme modes
- **Phone Colors Support**: Enable or disable Android 12+ dynamic wallpaper colors
- **Accent Color Picker**: Customize the primary brand color with live preview
- **Preset System**: Save and load your favorite configuration combinations

## Usage

1. Open the command palette and run `/miracletiktok` command
2. A panel will open with all MargyT settings
3. Adjust your preferences:
   - Select your desired region
   - Choose a theme mode
   - Pick an accent color
   - Toggle phone colors on Android 12+
4. Save your current settings as a preset for quick reapplication

## How It Works

This plugin provides an intuitive UI panel that syncs with your MargyT configuration. Settings are persisted across sessions and can be organized into presets for different use cases. All changes are reflected in your mod's settings when deployed.

## Important Notes

- Region changes affect `carrier_region` and `sys_region` in the feed
- Server-side `store_region` cannot be changed from the client
- Use a VPN separately if you need to change your IP address
