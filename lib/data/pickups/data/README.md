# Custom Pickup Data

This folder contains custom JSON data files for each pickup. These files are merged with the generated data when loading pickups.

## File Naming

Each file should be named after the pickup's custom ID (e.g., `Banana.json`, `LightningStrike.json`).

## File Format

Each JSON file can contain any custom metadata you want to add:

```json
{
  "tags": ["health", "defensive"],
  "tips": ["Great for survivability"],
  "synergies": ["Vitality", "Regenerator"],
  "customNotes": "My personal notes about this pickup",
  "difficulty": "easy",
  "recommendedFor": ["beginners"]
}
```

## Usage

The custom data is automatically merged with the generated pickup data when using the data loaders. Custom data properties will override or extend the generated data.

## Example

Create `Banana.json`:

```json
{
  "tags": ["health", "defensive"],
  "tips": [
    "Excellent for increasing max health",
    "Works well with other health multipliers"
  ],
  "synergies": ["Vitality", "Regenerator"]
}
```

