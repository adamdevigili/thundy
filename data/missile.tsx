/* eslint-disable linebreak-style */
export const missileList: string[] = ['us_aim9b_sidewinder.blkx'];

export interface Missile {
  name: string;
  rocketGun: boolean;
  preset_cost: number;
  bullets: number;
  shotFreq: number;
  sound: string;
  helicopterGroup: number;
  mesh: string;
  tags: any[];
  rocket: Rocket[];
}

export interface Rocket {
  normalizationPreset?: string;
  ricochetPreset?: string;
  secondaryShattersPreset?: string;
  stabilityThreshold?: number;
  stabilityCaliberToArmorThreshold?: number;
  stabilityReductionAfterRicochet?: number;
  stabilityReductionAfterPenetration?: number;
  bulletType?: string;
  bulletName?: string;
  caliber?: number;
  mass?: number;
  explosiveType?: string;
  explosiveMass?: number;
  massEnd?: number;
  maxDeltaAngle?: number;
  dragCx?: number;
  length?: number;
  distFromCmToStab?: number;
  wingAreaMult?: number;
  CxK?: number;
  WdK?: number[];
  finsAoaHor?: number;
  finsAoaVer?: number;
  force?: number;
  timeFire?: number;
  fireDelay?: number;
  spawnExplosionFx?: boolean;
  spawnExplosionWreckage?: boolean;
  selfDestructionFx?: string;
  explosionEffect?: string;
  groundCollisionEffect?: string;
  ricochetEffect?: string;
  waterCollisionEffect?: string;
  explosionPatchRadius?: number;
  fireEffect?: string;
  smokeEffect?: string;
  hazeEffect?: string;
  endSmokeViscosity?: number;
  maxDistance?: number;
  minDistance?: number;
  distanceFuse?: boolean;
  hitPowerMult?: number;
  fuseDelayDist?: number;
  explodeTreshold?: number;
  guidanceSfx?: string;
  guidanceType?: string;
  hasProximityFuse?: boolean;
  explodeHitPower?: number;
  explodeArmorPower?: number;
  explodeRadius?: number[];
  rendinstDamageRadius?: number;
  statType?: string;
  shutterDamage?: boolean;
  shutterDamageRadius?: number;
  shutterAmount?: number;
  shutterArmorPower?: number;
  shutterHit?: number;
  advancedMissiles?: boolean;
  useStartSpeed?: boolean;
  startSpeed?: number;
  endSpeed?: number;
  timeLife?: number;
  machMax?: number;
  loadFactorMax?: number;
  rangeMax?: number;
  price?: number;
  amountPerTier?: number;
  iconType?: string;
  stabilityRicochetModifier?: StabilityRicochetModifier[];
  pressureDamage?: PressureDamage;
  collisions?: Collisions;
  DamageParts?: DamageParts;
  damage?: Damage;
  guidance?: Guidance;
  arcadeProp?: ArcadeProp;
  proximityFuse?: ProximityFuse;
  armorpower?: Armorpower;
  hitpower?: Hitpower;
}

export interface StabilityRicochetModifier {
  mod1?: number[];
  mod2?: number[];
  mod3?: number[];
}

export interface PressureDamage {
  damageType: string;
}

export interface Collisions {
  default: Default;
  horLandMesh: HorLandMesh;
  soil: Soil;
  dirt: Dirt;
  road: Road;
  roadSoil: RoadSoil;
  bricks_red: BricksRed;
  sand: Sand;
  duneSand: DuneSand;
  roadSand: RoadSand;
  quickSand: QuickSand;
  snow: Snow;
  ice: Ice;
  roadSnow: RoadSnow;
  snowLower: SnowLower;
  glass: Glass;
  wood: Wood;
  steel: Steel;
  metal: Metal;
  buildings: Buildings;
  verLandMesh: VerLandMesh;
  concrete: Concrete;
  rocks: Rocks;
  rocksSlippery: RocksSlippery;
  fabric: Fabric;
  stone_snow: StoneSnow;
}

export interface Default {
  fx: string;
}

export interface HorLandMesh {
  fx: string;
}

export interface Soil {
  fx: string;
}

export interface Dirt {
  fx: string;
}

export interface Road {
  fx: string;
}

export interface RoadSoil {
  fx: string;
}

export interface BricksRed {
  fx: string;
}

export interface Sand {
  fx: string;
}

export interface DuneSand {
  fx: string;
}

export interface RoadSand {
  fx: string;
}

export interface QuickSand {
  fx: string;
}

export interface Snow {
  fx: string;
}

export interface Ice {
  fx: string;
}

export interface RoadSnow {
  fx: string;
}

export interface SnowLower {
  fx: string;
}

export interface Glass {
  fx: string;
}

export interface Wood {
  fx: string;
}

export interface Steel {
  fx: string;
}

export interface Metal {
  fx: string;
}

export interface Buildings {
  fx: string;
}

export interface VerLandMesh {
  fx: string;
}

export interface Concrete {
  fx: string;
}

export interface Rocks {
  fx: string;
}

export interface RocksSlippery {
  fx: string;
}

export interface Fabric {
  fx: string;
}

export interface StoneSnow {
  fx: string;
}

export interface DamageParts {
  body: Body;
}

export interface Body {
  hp: number;
  armorClass: string;
  armorThickness: number;
}

export interface Damage {
  shatter: Shatter[];
  shatterDamage: ShatterDamage;
  explosive: Explosive;
}

export interface Shatter {
  useRealShatters?: boolean;
  countPortion?: number;
  segment?: Segment;
}

export interface Segment {
  radiusScale?: number;
  penetrationScale?: number;
  damageScale?: number;
  angles: number[];
  countPortion: number;
}

export interface ShatterDamage {
  breachConeAngle: number;
}

export interface Explosive {
  radius: number;
  offset: number;
}

export interface Guidance {
  warmUpTime: number;
  workTime: number;
  uncageBeforeLaunch: boolean;
  breakLockMaxTime: number;
  irSeeker: IrSeeker;
  guidanceAutopilot: GuidanceAutopilot;
  table0: Table0;
  table1: Table1;
  table2: Table2;
}

export interface IrSeeker {
  rangeBand0: number;
  rangeBand2: number;
  rangeBand3: number;
  rangeMax: number;
  fov: number;
  minAngleToSun: number;
  lockAngleMax: number;
  angleMax: number;
  rateMax: number;
  prolongationTimeMax: number;
}

export interface GuidanceAutopilot {
  timeOut: number;
  propNavMult: number;
  reqAccelMax: number;
  baseIndSpeed: number;
  accelControlProp: number;
  accelControlIntg: number;
  accelControlIntgLim: number;
  accelControlDiff: number;
}

export interface Table0 {
  altitude: number;
  fighterMach: number[];
  targetMach: number[];
  rangeMin: number[];
  rangeMax: number[];
  altDiff: number[];
}

export interface Table1 {
  altitude: number;
  fighterMach: number[];
  targetMach: number[];
  rangeMin: number[];
  rangeMax: number[];
  altDiff: number[];
}

export interface Table2 {
  altitude: number;
  fighterMach: number[];
  targetMach: number[];
  rangeMin: number[];
  rangeMax: number[];
  altDiff: number[];
}

export interface ArcadeProp {
  finsAoaHor: number;
  finsAoaVer: number;
  timeFire: number;
}

export interface ProximityFuse {
  timeOut: number;
  radius: number;
  detectShells: boolean;
  shellCaliberRange: number[];
}

export interface Armorpower {
  ArmorPower0m: number[];
  ArmorPower100m: number[];
  ArmorPower7000m: number[];
  ArmorPower10000m: number[];
}

export interface Hitpower {
  HitPower0m: number[];
  HitPower10000m: number[];
}
