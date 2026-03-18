# JARVIS Icon Placeholder

The icon files should be placed in this directory:

- `icon.png` - For Linux builds (512x512 recommended)
- `icon.ico` - For Windows builds
- `icon.icns` - For macOS builds

## Creating Icons

You can use tools like:
- [Icon Converter](https://convertio.co/png-ico/)
- [App Icon Generator](https://appicon.co/)
- Photoshop/GIMP for manual creation

## Icon Design Guidelines

- Use a futuristic, tech-inspired design
- Primary color: Cyan (#00d9ff)
- Include subtle glow effects
- Ensure visibility at small sizes (16x16, 32x32)
- Use transparent background

## Quick Icon Creation

For development, you can use any 512x512 PNG image and convert it:

```bash
# Using ImageMagick (if installed)
convert icon.png -resize 512x512 icon.png
convert icon.png icon.ico
```

For now, a placeholder will be used if these files don't exist.
