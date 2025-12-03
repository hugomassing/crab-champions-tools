# Data Files

This folder contains game data organized by entity type.

## Structure

```
lib/data/
  weapons/
    mappings.ts          # ID mappings (custom ID -> game ID)
    generated/           # Auto-generated from game files
      ArcaneWand.json
      AutoRifle.json
      ...
    data/                # Custom JSON data per entity
      ArcaneWand.json
      ...
    images/              # Custom images
      ArcaneWand.png
      ...
  abilities/
    mappings.ts
    generated/
      AirStrike.json
      ...
    data/
      AirStrike.json
      ...
    images/
      AirStrike.png
      ...
```

## Generated Files

Files in `generated/` folders are automatically created by processing scripts from game asset files. These should not be edited manually.

## Custom Data

Files in `data/` folders contain custom metadata you can add. These are automatically merged with generated data when loading entities. See the README in each `data/` folder for format details.

## Images

Place custom images in the `images/` folders, named after the entity's custom ID (e.g., `ArcaneWand.png`).
