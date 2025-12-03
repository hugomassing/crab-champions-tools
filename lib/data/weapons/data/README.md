# Custom Weapon Data

This folder contains custom JSON data files for each weapon. These files are merged with the generated data when loading weapons.

## File Naming

Each file should be named after the weapon's custom ID (e.g., `ArcaneWand.json`, `AutoRifle.json`).

## File Format

Each JSON file can contain any custom metadata you want to add:

```json
{
  "tags": ["magic", "ranged"],
  "tips": ["Great for crowd control"],
  "synergies": ["IceStaff", "LightningScepter"],
  "customNotes": "My personal notes about this weapon",
  "difficulty": "medium",
  "recommendedFor": ["beginners", "advanced"]
}
```

## Usage

The custom data is automatically merged with the generated weapon data when using the data loaders. Custom data properties will override or extend the generated data.

## Example

Create `ArcaneWand.json`:

```json
{
  "tags": ["magic", "ranged", "burst"],
  "tips": [
    "Excellent for clearing groups of enemies",
    "Works well with damage multipliers"
  ],
  "synergies": ["IceStaff", "LightningScepter"]
}
```

