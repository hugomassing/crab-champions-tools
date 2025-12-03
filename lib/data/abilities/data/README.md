# Custom Ability Data

This folder contains custom JSON data files for each ability. These files are merged with the generated data when loading abilities.

## File Naming

Each file should be named after the ability's custom ID (e.g., `AirStrike.json`, `BlackHole.json`).

## File Format

Each JSON file can contain any custom metadata you want to add:

```json
{
  "tags": ["damage", "aoe"],
  "tips": ["Best used on grouped enemies"],
  "synergies": ["Grenade", "LaserBeam"],
  "customNotes": "My personal notes about this ability",
  "difficulty": "easy",
  "recommendedFor": ["beginners"]
}
```

## Usage

The custom data is automatically merged with the generated ability data when using the data loaders. Custom data properties will override or extend the generated data.

## Example

Create `AirStrike.json`:

```json
{
  "tags": ["damage", "aoe", "armor-piercing"],
  "tips": [
    "Great for dealing with armored enemies",
    "Use when enemies are grouped together"
  ],
  "synergies": ["Grenade"]
}
```

