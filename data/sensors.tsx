export interface Sensor {
  type: string;
  name: string;
  clearName: string;
  showMissileLaunchZone: boolean;
  transivers: Transivers;
  scanPatterns: ScanPatterns;
  signals: Signals;
  scanPatternSets: ScanPatternSets;
  scopeRangeSets: ScopeRangeSets;
  fsms: Fsms;
}

export interface Transivers {
  common: Common;
  search: Common;
  track: Common;
  GTM: Common;
  ATM: Common;
  ranging: Common;
  pulse: Common;
  pulseDoppler: Common;
  MTI: Common;
  radar: Common;
  IRST: Common;
  radarTrack: Common;
  irstTrack: Common;
}

export interface Common {
  sideLobesAttenuation: number;
  power: number;
  band: number;
  rcs: number;
  range: number;
  rangeMax: number;
  timeGainControl: boolean;
  antenna: Antenna;
}

export interface Antenna {
  angleHalfSens: number;
  sideLobesSensitivity: number;
}

export interface ScanPatterns {
  searchNarrow: SearchNarrow;
  searchWide: SearchWide;
  boresightLock: BoresightLock;
  designationLock: DesignationLock;
  track: Track;
}

export interface SearchNarrow {
  type: string;
  azimuthLimits: number[];
  elevationLimits: number[];
  rollStabLimit: number;
  period: number;
  width: number;
  barHeight: number;
  barsCount: number;
  rowMajor: boolean;
  barsOneWay: boolean;
}

export interface SearchWide {
  type: string;
  azimuthLimits: number[];
  elevationLimits: number[];
  rollStabLimit: number;
  period: number;
  width: number;
  barHeight: number;
  barsCount: number;
  rowMajor: boolean;
  barsOneWay: boolean;
}

export interface BoresightLock {
  type: string;
  azimuthLimits: number[];
  elevationLimits: number[];
  period: number;
  width: number;
  indicate: boolean;
}

export interface DesignationLock {
  type: string;
  azimuthLimits: number[];
  elevationLimits: number[];
  rollStabLimit: number;
  period: number;
  width: number;
  barHeight: number;
  barsCount: number;
  rowMajor: boolean;
  indicate: boolean;
}

export interface Track {
  type: string;
  azimuthLimits: number[];
  elevationLimits: number[];
}

export interface Signals {
  search: Search;
  track: Track2;
}

export interface Search {
  dynamicRange: number[];
  groundClutter: boolean;
  aircraftAsTarget: boolean;
  friendFoeId: boolean;
  distance: Distance;
}

export interface Distance {
  presents: boolean;
  minValue: number;
  maxValue: number;
  width: number;
}

export interface Track2 {
  dynamicRange: number[];
  groundClutter: boolean;
  aircraftAsTarget: boolean;
  angularAccuracy: number;
  distanceAccuracy: number;
  track: boolean;
  distance: Distance2;
}

export interface Distance2 {
  presents: boolean;
  minValue: number;
  maxValue: number;
  width: number;
}

export interface ScanPatternSets {
  common: Common2;
  boresightLock: BoresightLock2;
}

export interface Common2 {
  scanPattern1: string;
  scanPattern2: string;
}

export interface BoresightLock2 {
  scanPattern1: string;
}

export interface ScopeRangeSets {
  common: Common3;
  boresightLock: BoresightLock3;
}

export interface Common3 {
  range1: number;
  range2: number;
  range3: number;
  range4: number;
  range5: number;
  range6: number;
}

export interface BoresightLock3 {
  range1: number;
}

export interface Fsms {
  main: Main;
  search: Search2;
  lock: Lock;
  track: Track3;
}

export interface Main {
  stateInit: string;
  actionsTemplates: ActionsTemplates;
  transitions: Transitions;
}

export interface ActionsTemplates {
  init: Init;
  setStandbyMode: SetStandbyMode;
  setSearchMode: SetSearchMode;
  resetSearchMode: ResetSearchMode;
  setDesignationLockMode: SetDesignationLockMode;
  setBoresightLockMode: SetBoresightLockMode;
  setTrackMode: SetTrackMode;
}

export interface Init {
  setEnabled: SetEnabled;
  setTransiver: SetTransiver;
  setSignal: SetSignal;
  setTargetDesignationRange: SetTargetDesignationRange;
}

export interface SetEnabled {
  value: boolean;
}

export interface SetTransiver {
  transiver: string;
}

export interface SetSignal {
  signal: string;
}

export interface SetTargetDesignationRange {
  azimuthRange: number[];
  distanceRange: number[];
}

export interface SetStandbyMode {
  setModeName: SetModeName;
  setEnabled: SetEnabled2;
  setCenterAzimuth: SetCenterAzimuth;
  setCenterElevation: SetCenterElevation;
  clearTargets: any[];
  clearTargetsOfInterest: any[];
  setSignal: SetSignal2;
  setScanPatternSet: SetScanPatternSet;
  setScopeRangeSet: SetScopeRangeSet;
  setIllumination: SetIllumination;
}

export interface SetModeName {
  name: string;
}

export interface SetEnabled2 {
  value: boolean;
}

export interface SetCenterAzimuth {
  source: string;
  value: number;
}

export interface SetCenterElevation {
  source: string;
  value: number;
}

export interface SetSignal2 {
  signal: string;
}

export interface SetScanPatternSet {
  scanPatternSet: string;
}

export interface SetScopeRangeSet {
  scopeRangeSet: string;
}

export interface SetIllumination {
  illumination: boolean;
}

export interface SetSearchMode {
  setModeName: SetModeName2;
  setEnabled: SetEnabled3;
  setFsmActive: SetFsmActive;
  setCenterAzimuth: SetCenterAzimuth2;
  setCenterElevation: SetCenterElevation2;
  clearTargets: any[];
  clearTargetsOfInterest: any[];
  setCueEnabled: SetCueEnabled;
  setSignal: SetSignal3;
  setScanPatternSet: SetScanPatternSet2;
  setScopeRangeSet: SetScopeRangeSet2;
  setIllumination: SetIllumination2;
}

export interface SetModeName2 {
  name: string;
}

export interface SetEnabled3 {
  value: boolean;
}

export interface SetFsmActive {
  fsm: string;
  active: boolean;
}

export interface SetCenterAzimuth2 {
  source: string;
  value: number;
}

export interface SetCenterElevation2 {
  source: string;
  value: number;
}

export interface SetCueEnabled {
  value: boolean;
}

export interface SetSignal3 {
  signal: string;
}

export interface SetScanPatternSet2 {
  scanPatternSet: string;
}

export interface SetScopeRangeSet2 {
  scopeRangeSet: string;
}

export interface SetIllumination2 {
  illumination: boolean;
}

export interface ResetSearchMode {
  setFsmActive: SetFsmActive2;
  setCueEnabled: SetCueEnabled2;
}

export interface SetFsmActive2 {
  fsm: string;
  active: boolean;
}

export interface SetCueEnabled2 {
  value: boolean;
}

export interface SetDesignationLockMode {
  setModeName: SetModeName3;
  setEnabled: SetEnabled4;
  clearTargetsOfInterest: any[];
  setCenterAzimuth: SetCenterAzimuth3;
  setCenterElevation: SetCenterElevation3;
  setDistGatePos: SetDistGatePos;
  setRelSpeedGatePos: SetRelSpeedGatePos;
  setScanPatternSet: any[];
  setScanPattern: SetScanPattern;
  resetScanPhase: any[];
  setFsmActive: SetFsmActive3;
  setSignal: SetSignal4;
  clearTargets: any[];
  setIllumination: SetIllumination3;
}

export interface SetModeName3 {
  name: string;
}

export interface SetEnabled4 {
  value: boolean;
}

export interface SetCenterAzimuth3 {
  source: string;
}

export interface SetCenterElevation3 {
  source: string;
}

export interface SetDistGatePos {
  source: string;
  width: number;
}

export interface SetRelSpeedGatePos {
  source: string;
  width: number;
}

export interface SetScanPattern {
  scanPattern: string;
}

export interface SetFsmActive3 {
  fsm: string;
  active: boolean;
}

export interface SetSignal4 {
  signal: string;
}

export interface SetIllumination3 {
  illumination: boolean;
}

export interface SetBoresightLockMode {
  setModeName: SetModeName4;
  setEnabled: SetEnabled5;
  clearTargets: any[];
  clearTargetsOfInterest: any[];
  setScanPatternSet: SetScanPatternSet3;
  setScanPattern: SetScanPattern2;
  resetScanPhase: any[];
  setCenterAzimuth: SetCenterAzimuth4;
  setCenterElevation: SetCenterElevation4;
  setFsmActive: SetFsmActive4;
  setSignal: SetSignal5;
  setDistGatePos: SetDistGatePos2;
  setScopeRangeSet: SetScopeRangeSet3;
  setIllumination: SetIllumination4;
}

export interface SetModeName4 {
  name: string;
}

export interface SetEnabled5 {
  value: boolean;
}

export interface SetScanPatternSet3 {
  scanPatternSet: string;
}

export interface SetScanPattern2 {
  scanPattern: string;
}

export interface SetCenterAzimuth4 {
  source: string;
  value: number;
}

export interface SetCenterElevation4 {
  source: string;
  value: number;
}

export interface SetFsmActive4 {
  fsm: string;
  active: boolean;
}

export interface SetSignal5 {
  signal: string;
}

export interface SetDistGatePos2 {
  source: string;
  pos: number;
  width: number;
}

export interface SetScopeRangeSet3 {
  scopeRangeSet: string;
}

export interface SetIllumination4 {
  illumination: boolean;
}

export interface SetTrackMode {
  setModeName: SetModeName5;
  setEnabled: SetEnabled6;
  setScanPatternSet: any[];
  setScanPattern: SetScanPattern3;
  clearTargetsOfInterest: any[];
  addTargetOfInterest: any[];
  setLastTargetOfInterestActive: any[];
  updateActiveTargetOfInterest: any[];
  setCenterAzimuth: SetCenterAzimuth5;
  setCenterElevation: SetCenterElevation5;
  setDistGatePos: SetDistGatePos3;
  setRelSpeedGatePos: SetRelSpeedGatePos2;
  setFsmActive: SetFsmActive5;
  setSignal: SetSignal6;
  setIllumination: SetIllumination5;
}

export interface SetModeName5 {
  name: string;
}

export interface SetEnabled6 {
  value: boolean;
}

export interface SetScanPattern3 {
  scanPattern: string;
}

export interface SetCenterAzimuth5 {
  source: string;
}

export interface SetCenterElevation5 {
  source: string;
}

export interface SetDistGatePos3 {
  source: string;
  width: number;
}

export interface SetRelSpeedGatePos2 {
  source: string;
  width: number;
}

export interface SetFsmActive5 {
  fsm: string;
  active: boolean;
}

export interface SetSignal6 {
  signal: string;
}

export interface SetIllumination5 {
  illumination: boolean;
}

export interface Transitions {
  init: Init2;
  switchOn: SwitchOn;
  switchOff: SwitchOff;
  designationLock: DesignationLock2;
  checkDesignationType0: CheckDesignationType0;
  designationLockResponce: DesignationLockResponce;
  returnToSearchMode: ReturnToSearchMode;
  designationTrack: DesignationTrack;
  failedDesignationLock: FailedDesignationLock;
  finishedDesignationTrack: FinishedDesignationTrack;
  boresightLockFromSearch: BoresightLockFromSearch;
  boresightLockFromStandby: BoresightLockFromStandby;
  boresightTrack: BoresightTrack;
  failedBoresightLock: FailedBoresightLock;
  switchToSearch: SwitchToSearch[];
  brokenBoresightTrack: BrokenBoresightTrack;
  finishedBoresightTrack: FinishedBoresightTrack;
  switchScanPattern: SwitchScanPattern[];
  switchScopeRange: SwitchScopeRange;
}

export interface Init2 {
  stateFrom: string;
  event: string;
  stateTo: string;
  actions: Actions;
}

export interface Actions {
  init: any[];
  setStandbyMode: any[];
}

export interface SwitchOn {
  stateFrom: string;
  command: string;
  event: string;
  stateTo: string;
  actions: Actions2;
}

export interface Actions2 {
  setSearchMode: any[];
}

export interface SwitchOff {
  stateFrom: string;
  command: string;
  event: string;
  stateTo: string;
  actions: Actions3;
}

export interface Actions3 {
  resetSearchMode: any[];
  setStandbyMode: any[];
}

export interface DesignationLock2 {
  stateFrom: string;
  command: string;
  actions: Actions4;
}

export interface Actions4 {
  designateActiveDetectedTarget: DesignateActiveDetectedTarget;
  designateTargetUnderCue: DesignateTargetUnderCue;
}

export interface DesignateActiveDetectedTarget {
  type: number;
  self: boolean;
  sensorIndex: number;
}

export interface DesignateTargetUnderCue {
  type: number;
  self: boolean;
  sensorIndex: number;
}

export interface CheckDesignationType0 {
  stateFrom: string;
  command: string;
  stateTo: string;
  actions: Actions5;
}

export interface Actions5 {
  checkDesignationTypeEquals: CheckDesignationTypeEquals;
}

export interface CheckDesignationTypeEquals {
  value: number;
}

export interface DesignationLockResponce {
  stateFrom: string;
  event: string;
  stateTo: string;
  actions: Actions6;
}

export interface Actions6 {
  resetSearchMode: any[];
  setDesignationLockMode: any[];
}

export interface ReturnToSearchMode {
  stateFrom: string;
  event: string;
  stateTo: string;
}

export interface DesignationTrack {
  stateFrom: string;
  event: string;
  stateTo: string;
  actions: Actions7;
}

export interface Actions7 {
  setFsmActive: SetFsmActive6;
  setTrackMode: any[];
}

export interface SetFsmActive6 {
  fsm: string;
  active: boolean;
}

export interface FailedDesignationLock {
  stateFrom: string;
  event: string;
  stateTo: string;
  actions: Actions8;
}

export interface Actions8 {
  setFsmActive: SetFsmActive7;
  setSearchMode: any[];
}

export interface SetFsmActive7 {
  fsm: string;
  active: boolean;
}

export interface FinishedDesignationTrack {
  stateFrom: string;
  event: string;
  command: string;
  stateTo: string;
  actions: Actions9;
}

export interface Actions9 {
  setFsmActive: SetFsmActive8;
  setSearchMode: any[];
}

export interface SetFsmActive8 {
  fsm: string;
  active: boolean;
}

export interface BoresightLockFromSearch {
  stateFrom: string;
  command: string;
  stateTo: string;
  actions: Actions10;
}

export interface Actions10 {
  resetSearchMode: any[];
  setBoresightLockMode: any[];
}

export interface BoresightLockFromStandby {
  stateFrom: string;
  command: string;
  stateTo: string;
  actions: Actions11;
}

export interface Actions11 {
  resetSearchMode: any[];
  setBoresightLockMode: any[];
}

export interface BoresightTrack {
  stateFrom: string;
  event: string;
  stateTo: string;
  actions: Actions12;
}

export interface Actions12 {
  setFsmActive: SetFsmActive9;
  setTrackMode: any[];
}

export interface SetFsmActive9 {
  fsm: string;
  active: boolean;
}

export interface FailedBoresightLock {
  stateFrom: string;
  command: string;
  stateTo: string;
  actions: Actions13;
}

export interface Actions13 {
  setFsmActive: SetFsmActive10;
  setStandbyMode: any[];
}

export interface SetFsmActive10 {
  fsm: string;
  active: boolean;
}

export interface SwitchToSearch {
  stateFrom?: string;
  command?: string;
  stateTo?: string;
  actions?: Actions14;
}

export interface Actions14 {
  setFsmActive: SetFsmActive11;
  setSearchMode: any[];
}

export interface SetFsmActive11 {
  fsm: string;
  active: boolean;
}

export interface BrokenBoresightTrack {
  stateFrom: string;
  event: string;
  stateTo: string;
  actions: Actions15;
}

export interface Actions15 {
  setFsmActive: SetFsmActive12;
  setBoresightLockMode: any[];
}

export interface SetFsmActive12 {
  fsm: string;
  active: boolean;
}

export interface FinishedBoresightTrack {
  stateFrom: string;
  command: string;
  stateTo: string;
  actions: Actions16;
}

export interface Actions16 {
  setFsmActive: SetFsmActive13;
  setStandbyMode: any[];
}

export interface SetFsmActive13 {
  fsm: string;
  active: boolean;
}

export interface SwitchScanPattern {
  stateFrom?: string;
  command?: string;
  actions?: Actions17;
}

export interface Actions17 {
  setNextScanPattern: any[];
}

export interface SwitchScopeRange {
  command: string;
  actions: Actions18;
}

export interface Actions18 {
  setNextScopeRange: any[];
}

export interface Search2 {
  stateInit: string;
  transitions: Transitions2;
}

export interface Transitions2 {
  scan: Scan;
  detect: Detect;
  addTarget: AddTarget;
  switchSelectedTarget: SwitchSelectedTarget;
  setCueAzimuth: SetCueAzimuth;
  setCueDist: SetCueDist;
  setSelectedTarget: SetSelectedTarget;
}

export interface Scan {
  event: string;
  actions: Actions19;
}

export interface Actions19 {
  scan: any[];
}

export interface Detect {
  event: string;
  actions: Actions20;
}

export interface Actions20 {
  setDistGatePos: SetDistGatePos4;
  setRelSpeedGatePos: SetRelSpeedGatePos3;
  detectTarget: any[];
}

export interface SetDistGatePos4 {
  source: string;
  width: number;
}

export interface SetRelSpeedGatePos3 {
  source: string;
  width: number;
}

export interface AddTarget {
  event: string;
  actions: Actions21;
}

export interface Actions21 {
  addTarget: any[];
  updateActiveDetectedTarget: any[];
}

export interface SwitchSelectedTarget {
  command: string;
  actions: Actions22;
}

export interface Actions22 {
  setNextDetectedTargetActive: any[];
}

export interface SetCueAzimuth {
  command: string;
  actions: Actions23;
}

export interface Actions23 {
  setCueAzimuth: any[];
}

export interface SetCueDist {
  command: string;
  actions: Actions24;
}

export interface Actions24 {
  setCueDist: any[];
}

export interface SetSelectedTarget {
  command: string;
  actions: Actions25;
}

export interface Actions25 {
  setDetectedTargetActive: any[];
}

export interface Lock {
  stateInit: string;
  transitions: Transitions3;
}

export interface Transitions3 {
  scan: Scan2;
  detect: Detect2;
}

export interface Scan2 {
  event: string;
  actions: Actions26;
}

export interface Actions26 {
  scan: any[];
}

export interface Detect2 {
  event: string;
  actions: Actions27;
}

export interface Actions27 {
  detectTarget: any[];
}

export interface Track3 {
  stateInit: string;
  transitions: Transitions4;
}

export interface Transitions4 {
  detect: Detect3;
  track: Track4;
  extrapolate: Extrapolate;
}

export interface Detect3 {
  event: string;
  actions: Actions28;
}

export interface Actions28 {
  detectTarget: any[];
}

export interface Track4 {
  event: string;
  actions: Actions29;
}

export interface Actions29 {
  updateActiveTargetOfInterest: any[];
  setCenterAzimuth: SetCenterAzimuth6;
  setCenterElevation: SetCenterElevation6;
  setDistGatePos: SetDistGatePos5;
  setRelSpeedGatePos: SetRelSpeedGatePos4;
}

export interface SetCenterAzimuth6 {
  source: string;
}

export interface SetCenterElevation6 {
  source: string;
}

export interface SetDistGatePos5 {
  source: string;
  width: number;
}

export interface SetRelSpeedGatePos4 {
  source: string;
  width: number;
}

export interface Extrapolate {
  event: string;
  actions: Actions30;
}

export interface Actions30 {
  extrapolateActiveTargetOfInterest: any[];
  setCenterAzimuth: SetCenterAzimuth7;
  setCenterElevation: SetCenterElevation7;
  setDistGatePos: SetDistGatePos6;
  setRelSpeedGatePos: SetRelSpeedGatePos5;
  checkActiveTargetOfInerestInertialTimeout: CheckActiveTargetOfInerestInertialTimeout;
}

export interface SetCenterAzimuth7 {
  source: string;
}

export interface SetCenterElevation7 {
  source: string;
}

export interface SetDistGatePos6 {
  source: string;
  width: number;
}

export interface SetRelSpeedGatePos5 {
  source: string;
  width: number;
}

export interface CheckActiveTargetOfInerestInertialTimeout {
  timeOut: number;
}
