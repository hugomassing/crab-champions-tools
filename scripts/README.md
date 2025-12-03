# Processing Scripts

This folder contains scripts for processing game assets and generating JSON data files.

## Usage

Scripts in this folder process raw game files from `game-assets/` and generate structured JSON files in `lib/data/`.

## Example Scripts

- `process-maps.ts` - Process map files and generate map data
- `process-weapons.ts` - Process weapon files and generate weapon data
- `process-abilities.ts` - Process ability files and generate ability data

## Running Scripts

You can run scripts using:

```bash
npx tsx scripts/process-maps.ts
```

Or add npm scripts to `package.json` for easier execution.
