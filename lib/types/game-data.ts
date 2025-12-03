/**
 * Raw game data types matching Unreal Engine export format
 */

export type CrabRarity = "Common" | "Greed" | "Epic" | "Legendary" | "Relic";
export type CrabHitmarkerType = "Quiet" | "Loud";
export type CrabAbilitySpawnType = "AboveCrosshair" | "AtCrosshair" | "AtFeet";
export type CrabCrosshairType = "Dot" | "Cross" | "Circle";
export type CrabFormationType =
  | "Single"
  | "SmallArc"
  | "LargeArc"
  | "Line"
  | "Spread";

export interface UnrealObjectReference {
  ObjectName: string;
  ObjectPath: string;
}

export interface UnrealColor {
  R: number;
  G: number;
  B: number;
  A: number;
  Hex?: string;
}

export interface RawAbilityProperties {
  ProjectileDA?: UnrealObjectReference;
  HitmarkerType?: string;
  AbilitySpawnType?: string;
  AbilitySpawnDelay?: number;
  Cooldown?: number;
  Montage?: UnrealObjectReference;
  AbilityTelegraphFX?: UnrealObjectReference;
  AbilityTelegraphSound?: UnrealObjectReference;
  bRequiresUnlock?: boolean;
  Name: string;
  Description: string;
  Icon: UnrealObjectReference;
  Rarity: string;
  PrimaryFX?: UnrealObjectReference;
  SecondaryFX?: UnrealObjectReference;
  InteractUI?: UnrealObjectReference;
  OnPickedUpFX?: UnrealObjectReference;
  OnPickedUpSound?: UnrealObjectReference;
}

export interface RawAbilityData {
  Type: string;
  Name: string;
  Class: string;
  Properties: RawAbilityProperties;
}

export interface RawWeaponProperties {
  Mesh?: UnrealObjectReference;
  ProjectileDA?: UnrealObjectReference;
  CrosshairType?: string;
  FormationType?: string;
  FormationSpacing?: number;
  FormationExpansionDampening?: number;
  BaseFireRate?: number;
  WeaponModTriggerRollMultiplier?: number;
  BaseSpread?: number;
  MaxSpread?: number;
  SpreadRecovery?: number;
  AimingSpreadMultiplier?: number;
  VerticalRecoil?: number;
  HorizontalRecoil?: number;
  RecoilInterpSpeed?: number;
  BaseClipSize?: number;
  ReloadDuration?: number;
  EquipMontage?: UnrealObjectReference;
  EquipSound?: UnrealObjectReference;
  CosmeticFX?: UnrealObjectReference;
  FireMontage?: UnrealObjectReference;
  MuzzleFlashFX?: UnrealObjectReference;
  GunshotSound?: UnrealObjectReference;
  GunshotCameraShake?: UnrealObjectReference;
  LowAmmoSound?: UnrealObjectReference;
  EmptyClipSound?: UnrealObjectReference;
  ReloadMontage?: UnrealObjectReference;
  MagOutSound?: UnrealObjectReference;
  MagInSound?: UnrealObjectReference;
  bRequiresUnlock?: boolean;
  Name: string;
  Description: string;
  Icon: UnrealObjectReference;
  Rarity: string;
  Tint?: UnrealColor;
  PrimaryFX?: UnrealObjectReference;
  SecondaryFX?: UnrealObjectReference;
  InteractUI?: UnrealObjectReference;
  OnPickedUpFX?: UnrealObjectReference;
  OnPickedUpSound?: UnrealObjectReference;
}

export interface RawWeaponData {
  Type: string;
  Name: string;
  Class: string;
  Properties: RawWeaponProperties;
}

export type RawGameDataArray = RawAbilityData[] | RawWeaponData[];

