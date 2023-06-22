package models

import (
	"strings"
	"time"
)

type Radars []*Radar

type Radar struct {
	Origin string `bson:"origin" json:"origin"`
	Name   string `bson:"name" json:"name"`
	RawURL string `bson:"rawURL" json:"rawURL"`

	Type      string    `bson:"type" json:"type"`
	CreatedAt time.Time `bson:"createdAt" json:"createdAt"`
}

type RadarGithub struct {
	Type                  string `json:"type"`
	Name                  string `json:"name"`
	ShowMissileLaunchZone bool   `json:"showMissileLaunchZone"`
	Transivers            struct {
		Pulse struct {
			SideLobesAttenuation float64 `json:"sideLobesAttenuation"`
			Power                float64 `json:"power"`
			Band                 int     `json:"band"`
			Rcs                  float64 `json:"rcs"`
			Range                float64 `json:"range"`
			RangeMax             float64 `json:"rangeMax"`
			Antenna              struct {
				AngleHalfSens        float64 `json:"angleHalfSens"`
				SideLobesSensitivity float64 `json:"sideLobesSensitivity"`
			} `json:"antenna"`
		} `json:"pulse"`
		PulseDopplerVelocitySearch struct {
			SideLobesAttenuation float64 `json:"sideLobesAttenuation"`
			Power                float64 `json:"power"`
			Band                 int     `json:"band"`
			Rcs                  float64 `json:"rcs"`
			Range                float64 `json:"range"`
			RangeMax             float64 `json:"rangeMax"`
			Antenna              struct {
				AngleHalfSens        float64 `json:"angleHalfSens"`
				SideLobesSensitivity float64 `json:"sideLobesSensitivity"`
			} `json:"antenna"`
		} `json:"pulseDopplerVelocitySearch"`
		PulseDoppler struct {
			SideLobesAttenuation float64 `json:"sideLobesAttenuation"`
			Power                float64 `json:"power"`
			Band                 int     `json:"band"`
			Rcs                  float64 `json:"rcs"`
			Range                float64 `json:"range"`
			RangeMax             float64 `json:"rangeMax"`
			Antenna              struct {
				AngleHalfSens        float64 `json:"angleHalfSens"`
				SideLobesSensitivity float64 `json:"sideLobesSensitivity"`
			} `json:"antenna"`
		} `json:"pulseDoppler"`
	} `json:"transivers"`
	ScanPatterns struct {
		SearchNarrow struct {
			Type            string    `json:"type"`
			AzimuthLimits   []float64 `json:"azimuthLimits"`
			ElevationLimits []float64 `json:"elevationLimits"`
			RollStabLimit   float64   `json:"rollStabLimit"`
			PitchStabLimit  float64   `json:"pitchStabLimit"`
			Period          float64   `json:"period"`
			Width           float64   `json:"width"`
			BarHeight       float64   `json:"barHeight"`
			BarsCount       int       `json:"barsCount"`
			RowMajor        bool      `json:"rowMajor"`
		} `json:"searchNarrow"`
		SearchMedium struct {
			Type            string    `json:"type"`
			AzimuthLimits   []float64 `json:"azimuthLimits"`
			ElevationLimits []float64 `json:"elevationLimits"`
			RollStabLimit   float64   `json:"rollStabLimit"`
			PitchStabLimit  float64   `json:"pitchStabLimit"`
			Period          float64   `json:"period"`
			Width           float64   `json:"width"`
			BarHeight       float64   `json:"barHeight"`
			BarsCount       int       `json:"barsCount"`
			RowMajor        bool      `json:"rowMajor"`
		} `json:"searchMedium"`
		SearchWide struct {
			Type            string    `json:"type"`
			AzimuthLimits   []float64 `json:"azimuthLimits"`
			ElevationLimits []float64 `json:"elevationLimits"`
			RollStabLimit   float64   `json:"rollStabLimit"`
			PitchStabLimit  float64   `json:"pitchStabLimit"`
			Period          float64   `json:"period"`
			Width           float64   `json:"width"`
			BarHeight       float64   `json:"barHeight"`
			BarsCount       int       `json:"barsCount"`
			RowMajor        bool      `json:"rowMajor"`
		} `json:"searchWide"`
		TwsNarrow struct {
			Type            string    `json:"type"`
			AzimuthLimits   []float64 `json:"azimuthLimits"`
			ElevationLimits []float64 `json:"elevationLimits"`
			RollStabLimit   float64   `json:"rollStabLimit"`
			PitchStabLimit  float64   `json:"pitchStabLimit"`
			Period          float64   `json:"period"`
			Width           float64   `json:"width"`
			BarHeight       float64   `json:"barHeight"`
			BarsCount       int       `json:"barsCount"`
			RowMajor        bool      `json:"rowMajor"`
			PreciseMinor    bool      `json:"preciseMinor"`
		} `json:"twsNarrow"`
		TwsMedium struct {
			Type            string    `json:"type"`
			AzimuthLimits   []float64 `json:"azimuthLimits"`
			ElevationLimits []float64 `json:"elevationLimits"`
			RollStabLimit   float64   `json:"rollStabLimit"`
			PitchStabLimit  float64   `json:"pitchStabLimit"`
			Period          float64   `json:"period"`
			Width           float64   `json:"width"`
			BarHeight       float64   `json:"barHeight"`
			BarsCount       int       `json:"barsCount"`
			RowMajor        bool      `json:"rowMajor"`
			PreciseMinor    bool      `json:"preciseMinor"`
		} `json:"twsMedium"`
		VerticalLockLow struct {
			Type            string    `json:"type"`
			AzimuthLimits   []float64 `json:"azimuthLimits"`
			ElevationLimits []float64 `json:"elevationLimits"`
			Period          float64   `json:"period"`
			Width           float64   `json:"width"`
			BarHeight       float64   `json:"barHeight"`
			BarsCount       int       `json:"barsCount"`
			RowMajor        bool      `json:"rowMajor"`
			CenterElevation float64   `json:"centerElevation"`
			Indicate        bool      `json:"indicate"`
		} `json:"verticalLockLow"`
		VerticalLockHigh struct {
			Type            string    `json:"type"`
			AzimuthLimits   []float64 `json:"azimuthLimits"`
			ElevationLimits []float64 `json:"elevationLimits"`
			Period          float64   `json:"period"`
			Width           float64   `json:"width"`
			BarHeight       float64   `json:"barHeight"`
			BarsCount       int       `json:"barsCount"`
			RowMajor        bool      `json:"rowMajor"`
			CenterElevation float64   `json:"centerElevation"`
			Indicate        bool      `json:"indicate"`
		} `json:"verticalLockHigh"`
		BoresightLock struct {
			Type            string    `json:"type"`
			AzimuthLimits   []float64 `json:"azimuthLimits"`
			ElevationLimits []float64 `json:"elevationLimits"`
			Period          float64   `json:"period"`
			Width           float64   `json:"width"`
			Indicate        bool      `json:"indicate"`
		} `json:"boresightLock"`
		DesignationLockTws struct {
			Type            string    `json:"type"`
			AzimuthLimits   []float64 `json:"azimuthLimits"`
			ElevationLimits []float64 `json:"elevationLimits"`
			RollStabLimit   float64   `json:"rollStabLimit"`
			PitchStabLimit  float64   `json:"pitchStabLimit"`
			Period          float64   `json:"period"`
			Width           float64   `json:"width"`
			BarHeight       float64   `json:"barHeight"`
			BarsCount       int       `json:"barsCount"`
			RowMajor        bool      `json:"rowMajor"`
			Indicate        bool      `json:"indicate"`
		} `json:"designationLockTws"`
		DesignationLockSearch struct {
			Type            string    `json:"type"`
			AzimuthLimits   []float64 `json:"azimuthLimits"`
			ElevationLimits []float64 `json:"elevationLimits"`
			RollStabLimit   float64   `json:"rollStabLimit"`
			PitchStabLimit  float64   `json:"pitchStabLimit"`
			Period          float64   `json:"period"`
			Width           float64   `json:"width"`
			BarHeight       float64   `json:"barHeight"`
			BarsCount       int       `json:"barsCount"`
			RowMajor        bool      `json:"rowMajor"`
			Indicate        bool      `json:"indicate"`
		} `json:"designationLockSearch"`
		Track struct {
			Type            string    `json:"type"`
			AzimuthLimits   []float64 `json:"azimuthLimits"`
			ElevationLimits []float64 `json:"elevationLimits"`
		} `json:"track"`
	} `json:"scanPatterns"`
	Signals struct {
		PulseSearch struct {
			DynamicRange     []float64 `json:"dynamicRange"`
			GroundClutter    bool      `json:"groundClutter"`
			AircraftAsTarget bool      `json:"aircraftAsTarget"`
			FriendFoeID      bool      `json:"friendFoeId"`
			Distance         struct {
				Presents bool    `json:"presents"`
				MinValue float64 `json:"minValue"`
				MaxValue float64 `json:"maxValue"`
				Width    float64 `json:"width"`
			} `json:"distance"`
		} `json:"pulseSearch"`
		PulseDopplerVelocitySearch struct {
			RangeFinder          bool      `json:"rangeFinder"`
			DopplerSpeedFinder   bool      `json:"dopplerSpeedFinder"`
			DynamicRange         []float64 `json:"dynamicRange"`
			GroundClutter        bool      `json:"groundClutter"`
			AircraftAsTarget     bool      `json:"aircraftAsTarget"`
			FriendFoeID          bool      `json:"friendFoeId"`
			AbsDopplerSpeed      bool      `json:"absDopplerSpeed"`
			MainBeamDopplerSpeed bool      `json:"mainBeamDopplerSpeed"`
			DopplerSpeed         struct {
				Presents       bool    `json:"presents"`
				MinValue       float64 `json:"minValue"`
				MaxValue       float64 `json:"maxValue"`
				SignalWidthMin float64 `json:"signalWidthMin"`
				Width          float64 `json:"width"`
			} `json:"dopplerSpeed"`
		} `json:"pulseDopplerVelocitySearch"`
		PulseDopplerSearch struct {
			DynamicRange         []float64 `json:"dynamicRange"`
			GroundClutter        bool      `json:"groundClutter"`
			AircraftAsTarget     bool      `json:"aircraftAsTarget"`
			FriendFoeID          bool      `json:"friendFoeId"`
			AbsDopplerSpeed      bool      `json:"absDopplerSpeed"`
			MainBeamDopplerSpeed bool      `json:"mainBeamDopplerSpeed"`
			Distance             struct {
				Presents bool    `json:"presents"`
				MinValue float64 `json:"minValue"`
				MaxValue float64 `json:"maxValue"`
				Width    float64 `json:"width"`
			} `json:"distance"`
			DopplerSpeed struct {
				Presents       bool    `json:"presents"`
				MinValue       float64 `json:"minValue"`
				MaxValue       float64 `json:"maxValue"`
				SignalWidthMin float64 `json:"signalWidthMin"`
				Width          float64 `json:"width"`
			} `json:"dopplerSpeed"`
		} `json:"pulseDopplerSearch"`
		PulseTrack struct {
			DynamicRange     []float64 `json:"dynamicRange"`
			GroundClutter    bool      `json:"groundClutter"`
			AircraftAsTarget bool      `json:"aircraftAsTarget"`
			AngularAccuracy  float64   `json:"angularAccuracy"`
			DistanceAccuracy float64   `json:"distanceAccuracy"`
			Track            bool      `json:"track"`
			Distance         struct {
				Presents bool    `json:"presents"`
				MinValue float64 `json:"minValue"`
				MaxValue float64 `json:"maxValue"`
				Width    float64 `json:"width"`
			} `json:"distance"`
		} `json:"pulseTrack"`
		PulseDopplerTrack struct {
			RangeFinder          bool      `json:"rangeFinder"`
			DopplerSpeedFinder   bool      `json:"dopplerSpeedFinder"`
			DynamicRange         []float64 `json:"dynamicRange"`
			GroundClutter        bool      `json:"groundClutter"`
			AircraftAsTarget     bool      `json:"aircraftAsTarget"`
			AngularAccuracy      float64   `json:"angularAccuracy"`
			DistanceAccuracy     float64   `json:"distanceAccuracy"`
			AbsDopplerSpeed      bool      `json:"absDopplerSpeed"`
			MainBeamDopplerSpeed bool      `json:"mainBeamDopplerSpeed"`
			Track                bool      `json:"track"`
			Distance             struct {
				Presents bool    `json:"presents"`
				MinValue float64 `json:"minValue"`
				MaxValue float64 `json:"maxValue"`
				Width    float64 `json:"width"`
			} `json:"distance"`
			DopplerSpeed struct {
				Presents       bool    `json:"presents"`
				MinValue       float64 `json:"minValue"`
				MaxValue       float64 `json:"maxValue"`
				SignalWidthMin float64 `json:"signalWidthMin"`
				Width          float64 `json:"width"`
			} `json:"dopplerSpeed"`
		} `json:"pulseDopplerTrack"`
	} `json:"signals"`
	ScanPatternSets struct {
		Search struct {
			ScanPattern1 string `json:"scanPattern1"`
			ScanPattern2 string `json:"scanPattern2"`
			ScanPattern3 string `json:"scanPattern3"`
		} `json:"search"`
		Tws struct {
			ScanPattern1 string `json:"scanPattern1"`
			ScanPattern2 string `json:"scanPattern2"`
		} `json:"tws"`
		AcmLock struct {
			ScanPattern1 []string `json:"scanPattern1"`
			ScanPattern2 string   `json:"scanPattern2"`
		} `json:"acmLock"`
	} `json:"scanPatternSets"`
	ScopeRangeSets struct {
		Common struct {
			Range1 float64 `json:"range1"`
			Range2 float64 `json:"range2"`
			Range3 float64 `json:"range3"`
			Range4 float64 `json:"range4"`
			Range5 float64 `json:"range5"`
			Range6 float64 `json:"range6"`
		} `json:"common"`
		Acm struct {
			Range1 float64 `json:"range1"`
		} `json:"acm"`
	} `json:"scopeRangeSets"`
	Fsms struct {
		Main struct {
			StateInit        string `json:"stateInit"`
			ActionsTemplates struct {
				Init struct {
					SetEnabled struct {
						Value bool `json:"value"`
					} `json:"setEnabled"`
					SetTargetDesignationRange struct {
						AzimuthRange            []float64 `json:"azimuthRange"`
						AzmithWidth             float64   `json:"azmithWidth"`
						ElevationRange          []float64 `json:"elevationRange"`
						DistanceRange           []float64 `json:"distanceRange"`
						DistanceWidth           float64   `json:"distanceWidth"`
						DistanceRelWidthMin     float64   `json:"distanceRelWidthMin"`
						DopplerSpeedRange       []float64 `json:"dopplerSpeedRange"`
						DopplerSpeedWidth       float64   `json:"dopplerSpeedWidth"`
						DopplerSpeedRelWidthMin float64   `json:"dopplerSpeedRelWidthMin"`
					} `json:"setTargetDesignationRange"`
				} `json:"init"`
				EnableSearchModes struct {
					SetFsmActive struct {
						Fsm    string `json:"fsm"`
						Active bool   `json:"active"`
					} `json:"setFsmActive"`
				} `json:"enableSearchModes"`
				DisableSearchModes struct {
					SetFsmActive struct {
						Fsm    string `json:"fsm"`
						Active bool   `json:"active"`
					} `json:"setFsmActive"`
				} `json:"disableSearchModes"`
				EnableTrackModes struct {
					SetFsmActive struct {
						Fsm    string `json:"fsm"`
						Active bool   `json:"active"`
					} `json:"setFsmActive"`
				} `json:"enableTrackModes"`
				DisableTrackModes struct {
					SetFsmActive struct {
						Fsm    string `json:"fsm"`
						Active bool   `json:"active"`
					} `json:"setFsmActive"`
				} `json:"disableTrackModes"`
				SetStandbySearchTwsModeCommon struct {
					SetCenterAzimuth struct {
						Source string  `json:"source"`
						Value  float64 `json:"value"`
					} `json:"setCenterAzimuth"`
					SetCenterElevation struct {
						Source string  `json:"source"`
						Value  float64 `json:"value"`
					} `json:"setCenterElevation"`
					SetScopeRangeSet struct {
						ScopeRangeSet string `json:"scopeRangeSet"`
					} `json:"setScopeRangeSet"`
					EnableSearchModes struct {
					} `json:"enableSearchModes"`
				} `json:"setStandbySearchTwsModeCommon"`
				SetStandbyModeCommon struct {
					SetStandbySearchTwsModeCommon struct {
					} `json:"setStandbySearchTwsModeCommon"`
					SetEnabled struct {
						Value bool `json:"value"`
					} `json:"setEnabled"`
				} `json:"setStandbyModeCommon"`
				SetSearchStandbyModeCommon struct {
					SetStandbyModeCommon struct {
					} `json:"setStandbyModeCommon"`
					SetScanPatternSet struct {
						ScanPatternSet string `json:"scanPatternSet"`
					} `json:"setScanPatternSet"`
				} `json:"setSearchStandbyModeCommon"`
				SetTwsStandbyModeCommon struct {
					SetStandbyModeCommon struct {
					} `json:"setStandbyModeCommon"`
					SetScanPatternSet struct {
						ScanPatternSet string `json:"scanPatternSet"`
					} `json:"setScanPatternSet"`
				} `json:"setTwsStandbyModeCommon"`
				SetPulseStandbyMode struct {
					SetSearchStandbyModeCommon struct {
					} `json:"setSearchStandbyModeCommon"`
					SetTransiver struct {
						Transiver string `json:"transiver"`
					} `json:"setTransiver"`
					SetSignal struct {
						Signal string `json:"signal"`
					} `json:"setSignal"`
					SetModeName struct {
						Name string `json:"name"`
					} `json:"setModeName"`
				} `json:"setPulseStandbyMode"`
				SetPulseDopplerVelocityStandbyMode struct {
					SetSearchStandbyModeCommon struct {
					} `json:"setSearchStandbyModeCommon"`
					SetScanPatternSet struct {
						ScanPatternSet string `json:"scanPatternSet"`
					} `json:"setScanPatternSet"`
					SetTransiver struct {
						Transiver string `json:"transiver"`
					} `json:"setTransiver"`
					SetSignal struct {
						Signal string `json:"signal"`
					} `json:"setSignal"`
					SetModeName struct {
						Name string `json:"name"`
					} `json:"setModeName"`
				} `json:"setPulseDopplerVelocityStandbyMode"`
				SetPulseDopplerStandbyMode struct {
					SetSearchStandbyModeCommon struct {
					} `json:"setSearchStandbyModeCommon"`
					SetScanPatternSet struct {
						ScanPatternSet string `json:"scanPatternSet"`
					} `json:"setScanPatternSet"`
					SetTransiver struct {
						Transiver string `json:"transiver"`
					} `json:"setTransiver"`
					SetSignal struct {
						Signal string `json:"signal"`
					} `json:"setSignal"`
					SetModeName struct {
						Name string `json:"name"`
					} `json:"setModeName"`
				} `json:"setPulseDopplerStandbyMode"`
				SetTwsStandbyMode struct {
					SetTwsStandbyModeCommon struct {
					} `json:"setTwsStandbyModeCommon"`
					SetTransiver struct {
						Transiver string `json:"transiver"`
					} `json:"setTransiver"`
					SetSignal struct {
						Signal string `json:"signal"`
					} `json:"setSignal"`
					SetModeName struct {
						Name string `json:"name"`
					} `json:"setModeName"`
				} `json:"setTwsStandbyMode"`
				ResetStandbyMode struct {
					DisableSearchModes struct {
					} `json:"disableSearchModes"`
				} `json:"resetStandbyMode"`
				SetSearchTwsModeCommon struct {
					SetStandbySearchTwsModeCommon struct {
					} `json:"setStandbySearchTwsModeCommon"`
					SetEnabled struct {
						Value bool `json:"value"`
					} `json:"setEnabled"`
				} `json:"setSearchTwsModeCommon"`
				SetSearchModeCommon struct {
					SetSearchTwsModeCommon struct {
					} `json:"setSearchTwsModeCommon"`
					SetCueEnabled struct {
						Value                      bool `json:"value"`
						UpdateActiveTargetUnderCue bool `json:"updateActiveTargetUnderCue"`
					} `json:"setCueEnabled"`
					SetScanPatternSet struct {
						ScanPatternSet string `json:"scanPatternSet"`
					} `json:"setScanPatternSet"`
					SetFsmActive struct {
						Fsm    string `json:"fsm"`
						Active bool   `json:"active"`
					} `json:"setFsmActive"`
				} `json:"setSearchModeCommon"`
				SetTwsSearchModeCommon struct {
					SetSearchTwsModeCommon struct {
					} `json:"setSearchTwsModeCommon"`
					SetCueEnabled struct {
						Value                      bool `json:"value"`
						UpdateActiveTargetUnderCue bool `json:"updateActiveTargetUnderCue"`
					} `json:"setCueEnabled"`
					SetScanPatternSet struct {
						ScanPatternSet string `json:"scanPatternSet"`
					} `json:"setScanPatternSet"`
					SetFsmActive struct {
						Fsm    string `json:"fsm"`
						Active bool   `json:"active"`
					} `json:"setFsmActive"`
				} `json:"setTwsSearchModeCommon"`
				SetPulseSearchMode struct {
					SetSearchModeCommon struct {
					} `json:"setSearchModeCommon"`
					SetTransiver struct {
						Transiver string `json:"transiver"`
					} `json:"setTransiver"`
					SetSignal struct {
						Signal string `json:"signal"`
					} `json:"setSignal"`
					SetModeName struct {
						Name string `json:"name"`
					} `json:"setModeName"`
				} `json:"setPulseSearchMode"`
				SetPulseDopplerVelocitySearchMode struct {
					SetSearchModeCommon struct {
					} `json:"setSearchModeCommon"`
					SetTransiver struct {
						Transiver string `json:"transiver"`
					} `json:"setTransiver"`
					SetSignal struct {
						Signal string `json:"signal"`
					} `json:"setSignal"`
					SetModeName struct {
						Name string `json:"name"`
					} `json:"setModeName"`
				} `json:"setPulseDopplerVelocitySearchMode"`
				SetPulseDopplerSearchMode struct {
					SetSearchModeCommon struct {
					} `json:"setSearchModeCommon"`
					SetTransiver struct {
						Transiver string `json:"transiver"`
					} `json:"setTransiver"`
					SetSignal struct {
						Signal string `json:"signal"`
					} `json:"setSignal"`
					SetModeName struct {
						Name string `json:"name"`
					} `json:"setModeName"`
				} `json:"setPulseDopplerSearchMode"`
				SetTwsSearchMode struct {
					SetTwsSearchModeCommon struct {
					} `json:"setTwsSearchModeCommon"`
					SetTransiver struct {
						Transiver string `json:"transiver"`
					} `json:"setTransiver"`
					SetSignal struct {
						Signal string `json:"signal"`
					} `json:"setSignal"`
					SetModeName struct {
						Name string `json:"name"`
					} `json:"setModeName"`
				} `json:"setTwsSearchMode"`
				ResetSearchMode struct {
					ClearTargets struct {
					} `json:"clearTargets"`
					SetFsmActive struct {
						Fsm    string `json:"fsm"`
						Active bool   `json:"active"`
					} `json:"setFsmActive"`
					SetCueEnabled struct {
						Value bool `json:"value"`
					} `json:"setCueEnabled"`
					DisableSearchModes struct {
					} `json:"disableSearchModes"`
				} `json:"resetSearchMode"`
				ResetTwsMode struct {
					ClearTargetsOfInterest struct {
					} `json:"clearTargetsOfInterest"`
					SetFsmActive struct {
						Fsm    string `json:"fsm"`
						Active bool   `json:"active"`
					} `json:"setFsmActive"`
					SetCueEnabled struct {
						Value bool `json:"value"`
					} `json:"setCueEnabled"`
					DisableSearchModes struct {
					} `json:"disableSearchModes"`
				} `json:"resetTwsMode"`
				SetDesignationLockModeCommon struct {
					SetEnabled struct {
						Value bool `json:"value"`
					} `json:"setEnabled"`
					SetScanPatternSet struct {
					} `json:"setScanPatternSet"`
					ResetScanPhase struct {
					} `json:"resetScanPhase"`
					SetFsmActive struct {
						Fsm    string `json:"fsm"`
						Active bool   `json:"active"`
					} `json:"setFsmActive"`
				} `json:"setDesignationLockModeCommon"`
				SetPulseDesignationLockMode struct {
					SetDesignationLockModeCommon struct {
					} `json:"setDesignationLockModeCommon"`
					SetDistGatePos struct {
						Source string  `json:"source"`
						Width  float64 `json:"width"`
					} `json:"setDistGatePos"`
					SetScanPattern struct {
						ScanPattern string `json:"scanPattern"`
					} `json:"setScanPattern"`
					SetCenterAzimuth struct {
						Source string `json:"source"`
					} `json:"setCenterAzimuth"`
					SetTransiver struct {
						Transiver string `json:"transiver"`
					} `json:"setTransiver"`
					SetSignal struct {
						Signal string `json:"signal"`
					} `json:"setSignal"`
					SetModeName struct {
						Name string `json:"name"`
					} `json:"setModeName"`
				} `json:"setPulseDesignationLockMode"`
				SetPulseDopplerVelocityDesignationLockMode struct {
					SetDesignationLockModeCommon struct {
					} `json:"setDesignationLockModeCommon"`
					SetRelSpeedGatePos struct {
						Source string  `json:"source"`
						Width  float64 `json:"width"`
					} `json:"setRelSpeedGatePos"`
					SetScanPattern struct {
						ScanPattern string `json:"scanPattern"`
					} `json:"setScanPattern"`
					SetCenterAzimuth struct {
						Source string `json:"source"`
					} `json:"setCenterAzimuth"`
					SetTransiver struct {
						Transiver string `json:"transiver"`
					} `json:"setTransiver"`
					SetSignal struct {
						Signal string `json:"signal"`
					} `json:"setSignal"`
					SetModeName struct {
						Name string `json:"name"`
					} `json:"setModeName"`
				} `json:"setPulseDopplerVelocityDesignationLockMode"`
				SetPulseDopplerDesignationLockMode struct {
					SetDesignationLockModeCommon struct {
					} `json:"setDesignationLockModeCommon"`
					SetDistGatePos struct {
						Source string  `json:"source"`
						Width  float64 `json:"width"`
					} `json:"setDistGatePos"`
					SetRelSpeedGatePos struct {
						Source string  `json:"source"`
						Pos    float64 `json:"pos"`
						Width  float64 `json:"width"`
					} `json:"setRelSpeedGatePos"`
					SetScanPattern struct {
						ScanPattern string `json:"scanPattern"`
					} `json:"setScanPattern"`
					SetCenterAzimuth struct {
						Source string `json:"source"`
					} `json:"setCenterAzimuth"`
					SetTransiver struct {
						Transiver string `json:"transiver"`
					} `json:"setTransiver"`
					SetSignal struct {
						Signal string `json:"signal"`
					} `json:"setSignal"`
					SetModeName struct {
						Name string `json:"name"`
					} `json:"setModeName"`
				} `json:"setPulseDopplerDesignationLockMode"`
				SetTwsDesignationLockMode struct {
					SetDesignationLockModeCommon struct {
					} `json:"setDesignationLockModeCommon"`
					SetDistGatePos struct {
						Source string  `json:"source"`
						Width  float64 `json:"width"`
					} `json:"setDistGatePos"`
					SetRelSpeedGatePos struct {
						Source string  `json:"source"`
						Width  float64 `json:"width"`
					} `json:"setRelSpeedGatePos"`
					SetScanPattern struct {
						ScanPattern string `json:"scanPattern"`
					} `json:"setScanPattern"`
					SetCenterAzimuth struct {
						Source string `json:"source"`
					} `json:"setCenterAzimuth"`
					SetCenterElevation struct {
						Source string `json:"source"`
					} `json:"setCenterElevation"`
					SetTransiver struct {
						Transiver string `json:"transiver"`
					} `json:"setTransiver"`
					SetSignal struct {
						Signal string `json:"signal"`
					} `json:"setSignal"`
					SetModeName struct {
						Name string `json:"name"`
					} `json:"setModeName"`
				} `json:"setTwsDesignationLockMode"`
				DesignatedTargetSearch struct {
					DesignateTargetUnderCue struct {
						Type        int  `json:"type"`
						Self        bool `json:"self"`
						SensorIndex int  `json:"sensorIndex"`
					} `json:"designateTargetUnderCue"`
					DesignateActiveDetectedTarget struct {
						Type        int  `json:"type"`
						Self        bool `json:"self"`
						SensorIndex int  `json:"sensorIndex"`
					} `json:"designateActiveDetectedTarget"`
				} `json:"designatedTargetSearch"`
				DesignatedTargetTws struct {
					DesignateActiveDetectedTarget struct {
						Type        int  `json:"type"`
						Self        bool `json:"self"`
						SensorIndex int  `json:"sensorIndex"`
					} `json:"designateActiveDetectedTarget"`
				} `json:"designatedTargetTws"`
				SetPulseTrackModeNameTrack struct {
					SetModeName struct {
						Name string `json:"name"`
					} `json:"setModeName"`
				} `json:"setPulseTrackModeNameTrack"`
				SetPulseDopplerTrackModeNameTrack struct {
					SetModeName struct {
						Name string `json:"name"`
					} `json:"setModeName"`
				} `json:"setPulseDopplerTrackModeNameTrack"`
				SetPulseTrackModeNameLock struct {
					SetModeName struct {
						Name string `json:"name"`
					} `json:"setModeName"`
				} `json:"setPulseTrackModeNameLock"`
				SetPulseDopplerTrackModeNameLock struct {
					SetModeName struct {
						Name string `json:"name"`
					} `json:"setModeName"`
				} `json:"setPulseDopplerTrackModeNameLock"`
				SetTrackModeNameTrack struct {
					SetCustomActionTemplate []struct {
						Fsm                string `json:"fsm"`
						Name               string `json:"name"`
						ActionTemplateName string `json:"actionTemplateName"`
					} `json:"setCustomActionTemplate"`
				} `json:"setTrackModeNameTrack"`
				SetTrackModeNameLock struct {
					SetCustomActionTemplate []struct {
						Fsm                string `json:"fsm"`
						Name               string `json:"name"`
						ActionTemplateName string `json:"actionTemplateName"`
					} `json:"setCustomActionTemplate"`
				} `json:"setTrackModeNameLock"`
				SetAcmLockMode struct {
					SetEnabled struct {
						Value bool `json:"value"`
					} `json:"setEnabled"`
					ResetScanPhase struct {
					} `json:"resetScanPhase"`
					SetScanPatternSet struct {
						ScanPatternSet string `json:"scanPatternSet"`
					} `json:"setScanPatternSet"`
					SetCenterAzimuth struct {
						Source string  `json:"source"`
						Value  float64 `json:"value"`
					} `json:"setCenterAzimuth"`
					SetCenterElevation struct {
						Source string  `json:"source"`
						Value  float64 `json:"value"`
					} `json:"setCenterElevation"`
					SetFsmActive struct {
						Fsm    string `json:"fsm"`
						Active bool   `json:"active"`
					} `json:"setFsmActive"`
					SetDistGatePos struct {
						Source string  `json:"source"`
						Pos    float64 `json:"pos"`
						Width  float64 `json:"width"`
					} `json:"setDistGatePos"`
					SetRelSpeedGatePos struct {
						Source string  `json:"source"`
						Pos    float64 `json:"pos"`
						Width  float64 `json:"width"`
					} `json:"setRelSpeedGatePos"`
					SetScopeRangeSet struct {
						ScopeRangeSet string `json:"scopeRangeSet"`
					} `json:"setScopeRangeSet"`
					SetTrackModeNameLock struct {
					} `json:"setTrackModeNameLock"`
					EnableTrackModes struct {
					} `json:"enableTrackModes"`
				} `json:"setAcmLockMode"`
				ResetLockMode struct {
					SetFsmActive struct {
						Fsm    string `json:"fsm"`
						Active bool   `json:"active"`
					} `json:"setFsmActive"`
				} `json:"resetLockMode"`
				SetTrackMode struct {
					SetEnabled struct {
						Value bool `json:"value"`
					} `json:"setEnabled"`
					SetScanPatternSet struct {
					} `json:"setScanPatternSet"`
					SetScanPattern struct {
						ScanPattern string `json:"scanPattern"`
					} `json:"setScanPattern"`
					AddTargetOfInterest struct {
					} `json:"addTargetOfInterest"`
					SetLastTargetOfInterestActive struct {
					} `json:"setLastTargetOfInterestActive"`
					UpdateActiveTargetOfInterest struct {
					} `json:"updateActiveTargetOfInterest"`
					SetCenterAzimuth struct {
						Source string `json:"source"`
					} `json:"setCenterAzimuth"`
					SetCenterElevation struct {
						Source string `json:"source"`
					} `json:"setCenterElevation"`
					SetDistGatePos struct {
						Source string  `json:"source"`
						Width  float64 `json:"width"`
					} `json:"setDistGatePos"`
					SetRelSpeedGatePos struct {
						Source string  `json:"source"`
						Width  float64 `json:"width"`
					} `json:"setRelSpeedGatePos"`
					SetFsmActive struct {
						Fsm    string `json:"fsm"`
						Active bool   `json:"active"`
					} `json:"setFsmActive"`
					SetIllumination struct {
						Illumination bool `json:"illumination"`
					} `json:"setIllumination"`
					SetTrackModeNameTrack struct {
					} `json:"setTrackModeNameTrack"`
					EnableTrackModes struct {
					} `json:"enableTrackModes"`
				} `json:"setTrackMode"`
				ResetTrackMode struct {
					ClearTargetsOfInterest struct {
					} `json:"clearTargetsOfInterest"`
					SetIllumination struct {
						Illumination bool `json:"illumination"`
					} `json:"setIllumination"`
					SetFsmActive struct {
						Fsm    string `json:"fsm"`
						Active bool   `json:"active"`
					} `json:"setFsmActive"`
				} `json:"resetTrackMode"`
				SetPulseTrackParams struct {
					SetTransiver struct {
						Transiver string `json:"transiver"`
					} `json:"setTransiver"`
					SetSignal struct {
						Signal string `json:"signal"`
					} `json:"setSignal"`
					DoCustomActionTemplate struct {
						Fsm  string `json:"fsm"`
						Name string `json:"name"`
					} `json:"doCustomActionTemplate"`
				} `json:"setPulseTrackParams"`
				SetPulseDopplerTrackParams struct {
					SetTransiver struct {
						Transiver string `json:"transiver"`
					} `json:"setTransiver"`
					SetSignal struct {
						Signal string `json:"signal"`
					} `json:"setSignal"`
					DoCustomActionTemplate struct {
						Fsm  string `json:"fsm"`
						Name string `json:"name"`
					} `json:"doCustomActionTemplate"`
				} `json:"setPulseDopplerTrackParams"`
			} `json:"actionsTemplates"`
			Transitions struct {
				Init struct {
					StateFrom string `json:"stateFrom"`
					Event     string `json:"event"`
					StateTo   string `json:"stateTo"`
					Actions   struct {
						Init struct {
						} `json:"init"`
						SetPulseDopplerStandbyMode struct {
						} `json:"setPulseDopplerStandbyMode"`
					} `json:"actions"`
				} `json:"init"`
				StandbyToSearch struct {
					StateFrom string `json:"stateFrom"`
					Command   string `json:"command"`
					Event     string `json:"event"`
					StateTo   string `json:"stateTo"`
					Actions   struct {
						ResetStandbyMode struct {
						} `json:"resetStandbyMode"`
						DoCustomActionTemplate struct {
							Fsm  string `json:"fsm"`
							Name string `json:"name"`
						} `json:"doCustomActionTemplate"`
					} `json:"actions"`
				} `json:"standbyToSearch"`
				SearchToStandby struct {
					StateFrom string `json:"stateFrom"`
					Command   string `json:"command"`
					Event     string `json:"event"`
					StateTo   string `json:"stateTo"`
					Actions   struct {
						DoCustomActionTemplate []struct {
							Fsm  string `json:"fsm"`
							Name string `json:"name"`
						} `json:"doCustomActionTemplate"`
					} `json:"actions"`
				} `json:"searchToStandby"`
				DesignationLock struct {
					StateFrom string `json:"stateFrom"`
					Command   string `json:"command"`
					Actions   struct {
						DoCustomActionTemplate struct {
							Fsm  string `json:"fsm"`
							Name string `json:"name"`
						} `json:"doCustomActionTemplate"`
					} `json:"actions"`
				} `json:"designationLock"`
				CheckDesignationType0 struct {
					StateFrom string `json:"stateFrom"`
					Command   string `json:"command"`
					StateTo   string `json:"stateTo"`
					Actions   struct {
						CheckDesignationTypeEquals struct {
							Value int `json:"value"`
						} `json:"checkDesignationTypeEquals"`
					} `json:"actions"`
				} `json:"checkDesignationType0"`
				DesignationLockResponce struct {
					StateFrom string `json:"stateFrom"`
					Event     string `json:"event"`
					StateTo   string `json:"stateTo"`
					Actions   struct {
						DoCustomActionTemplate []struct {
							Fsm  string `json:"fsm"`
							Name string `json:"name"`
						} `json:"doCustomActionTemplate"`
					} `json:"actions"`
				} `json:"designationLockResponce"`
				ReturnToSearchMode struct {
					StateFrom string `json:"stateFrom"`
					Event     string `json:"event"`
					StateTo   string `json:"stateTo"`
				} `json:"returnToSearchMode"`
				DesignationLockToDesignationTrack struct {
					StateFrom string `json:"stateFrom"`
					Event     string `json:"event"`
					StateTo   string `json:"stateTo"`
					Actions   struct {
						ResetLockMode struct {
						} `json:"resetLockMode"`
						SetTrackMode struct {
						} `json:"setTrackMode"`
					} `json:"actions"`
				} `json:"designationLockToDesignationTrack"`
				FailedDesignationLock struct {
					StateFrom string `json:"stateFrom"`
					Event     string `json:"event"`
					StateTo   string `json:"stateTo"`
					Actions   struct {
						DisableTrackModes struct {
						} `json:"disableTrackModes"`
						ResetLockMode struct {
						} `json:"resetLockMode"`
						DoCustomActionTemplate struct {
							Fsm  string `json:"fsm"`
							Name string `json:"name"`
						} `json:"doCustomActionTemplate"`
					} `json:"actions"`
				} `json:"failedDesignationLock"`
				FinishedDesignationTrack struct {
					StateFrom string `json:"stateFrom"`
					Event     string `json:"event"`
					Command   string `json:"command"`
					StateTo   string `json:"stateTo"`
					Actions   struct {
						DisableTrackModes struct {
						} `json:"disableTrackModes"`
						ResetTrackMode struct {
						} `json:"resetTrackMode"`
						DoCustomActionTemplate struct {
							Fsm  string `json:"fsm"`
							Name string `json:"name"`
						} `json:"doCustomActionTemplate"`
					} `json:"actions"`
				} `json:"finishedDesignationTrack"`
				SearchToAcmLock struct {
					StateFrom string `json:"stateFrom"`
					Command   string `json:"command"`
					StateTo   string `json:"stateTo"`
					Actions   struct {
						DoCustomActionTemplate struct {
							Fsm  string `json:"fsm"`
							Name string `json:"name"`
						} `json:"doCustomActionTemplate"`
						SetAcmLockMode struct {
						} `json:"setAcmLockMode"`
					} `json:"actions"`
				} `json:"searchToAcmLock"`
				AcmStandbyToLock struct {
					StateFrom string   `json:"stateFrom"`
					Command   []string `json:"command"`
					StateTo   string   `json:"stateTo"`
					Actions   struct {
						ResetStandbyMode struct {
						} `json:"resetStandbyMode"`
						SetAcmLockMode struct {
						} `json:"setAcmLockMode"`
					} `json:"actions"`
				} `json:"acmStandbyToLock"`
				AcmLockToAcmTrack struct {
					StateFrom string `json:"stateFrom"`
					Event     string `json:"event"`
					StateTo   string `json:"stateTo"`
					Actions   struct {
						SetFsmActive struct {
							Fsm    string `json:"fsm"`
							Active bool   `json:"active"`
						} `json:"setFsmActive"`
						SetTrackMode struct {
						} `json:"setTrackMode"`
					} `json:"actions"`
				} `json:"acmLockToAcmTrack"`
				AcmLockToStandby struct {
					StateFrom string `json:"stateFrom"`
					Command   string `json:"command"`
					StateTo   string `json:"stateTo"`
					Actions   struct {
						DisableTrackModes struct {
						} `json:"disableTrackModes"`
						ResetLockMode struct {
						} `json:"resetLockMode"`
						DoCustomActionTemplate struct {
							Fsm  string `json:"fsm"`
							Name string `json:"name"`
						} `json:"doCustomActionTemplate"`
					} `json:"actions"`
				} `json:"acmLockToStandby"`
				AcmLockToSearch struct {
					StateFrom string `json:"stateFrom"`
					Command   string `json:"command"`
					StateTo   string `json:"stateTo"`
					Actions   struct {
						DisableTrackModes struct {
						} `json:"disableTrackModes"`
						ResetLockMode struct {
						} `json:"resetLockMode"`
						DoCustomActionTemplate struct {
							Fsm  string `json:"fsm"`
							Name string `json:"name"`
						} `json:"doCustomActionTemplate"`
					} `json:"actions"`
				} `json:"acmLockToSearch"`
				AcmTrackToAcmLock struct {
					StateFrom string `json:"stateFrom"`
					Event     string `json:"event"`
					StateTo   string `json:"stateTo"`
					Actions   struct {
						ResetTrackMode struct {
						} `json:"resetTrackMode"`
						SetAcmLockMode struct {
						} `json:"setAcmLockMode"`
					} `json:"actions"`
				} `json:"acmTrackToAcmLock"`
				AcmTrackToStandby struct {
					StateFrom string `json:"stateFrom"`
					Command   string `json:"command"`
					StateTo   string `json:"stateTo"`
					Actions   struct {
						DisableTrackModes struct {
						} `json:"disableTrackModes"`
						ResetTrackMode struct {
						} `json:"resetTrackMode"`
						DoCustomActionTemplate struct {
							Fsm  string `json:"fsm"`
							Name string `json:"name"`
						} `json:"doCustomActionTemplate"`
					} `json:"actions"`
				} `json:"acmTrackToStandby"`
				UpdateStandbyMode struct {
					StateFrom string `json:"stateFrom"`
					Event     string `json:"event"`
					Actions   struct {
						DoCustomActionTemplate struct {
							Fsm  string `json:"fsm"`
							Name string `json:"name"`
						} `json:"doCustomActionTemplate"`
					} `json:"actions"`
				} `json:"updateStandbyMode"`
				UpdateSearchMode struct {
					StateFrom string `json:"stateFrom"`
					Event     string `json:"event"`
					Actions   struct {
						DoCustomActionTemplate []struct {
							Fsm  string `json:"fsm"`
							Name string `json:"name"`
						} `json:"doCustomActionTemplate"`
					} `json:"actions"`
				} `json:"updateSearchMode"`
				SwitchScanPattern struct {
					StateFrom []string `json:"stateFrom"`
					Command   string   `json:"command"`
					Actions   struct {
						SetNextScanPattern struct {
						} `json:"setNextScanPattern"`
					} `json:"actions"`
				} `json:"switchScanPattern"`
				SwitchScopeRange struct {
					Command string `json:"command"`
					Actions struct {
						SetNextScopeRange struct {
						} `json:"setNextScopeRange"`
					} `json:"actions"`
				} `json:"switchScopeRange"`
			} `json:"transitions"`
		} `json:"main"`
		SearchModes struct {
			StateInit   string `json:"stateInit"`
			Transitions struct {
				InitToPulseDoppler struct {
					StateFrom string `json:"stateFrom"`
					Event     string `json:"event"`
					StateTo   string `json:"stateTo"`
					Actions   struct {
						SetCustomActionTemplate []struct {
							Fsm                string `json:"fsm"`
							Name               string `json:"name"`
							ActionTemplateName string `json:"actionTemplateName"`
						} `json:"setCustomActionTemplate"`
					} `json:"actions"`
				} `json:"initToPulseDoppler"`
				PulseDopplerToTws struct {
					StateFrom string `json:"stateFrom"`
					Command   string `json:"command"`
					StateTo   string `json:"stateTo"`
					Actions   struct {
						SetCustomActionTemplate []struct {
							Fsm                string `json:"fsm"`
							Name               string `json:"name"`
							ActionTemplateName string `json:"actionTemplateName"`
						} `json:"setCustomActionTemplate"`
						SetFsmActive []struct {
							Fsm    string `json:"fsm"`
							Active bool   `json:"active"`
						} `json:"setFsmActive"`
					} `json:"actions"`
				} `json:"pulseDopplerToTws"`
				TwsToPulseDopplerVelocity struct {
					StateFrom string `json:"stateFrom"`
					Command   string `json:"command"`
					StateTo   string `json:"stateTo"`
					Actions   struct {
						SetCustomActionTemplate []struct {
							Fsm                string `json:"fsm"`
							Name               string `json:"name"`
							ActionTemplateName string `json:"actionTemplateName"`
						} `json:"setCustomActionTemplate"`
						SetFsmActive []struct {
							Fsm    string `json:"fsm"`
							Active bool   `json:"active"`
						} `json:"setFsmActive"`
					} `json:"actions"`
				} `json:"twsToPulseDopplerVelocity"`
				PulseDopplerVelocityToPulse struct {
					StateFrom string `json:"stateFrom"`
					Command   string `json:"command"`
					StateTo   string `json:"stateTo"`
					Actions   struct {
						SetCustomActionTemplate []struct {
							Fsm                string `json:"fsm"`
							Name               string `json:"name"`
							ActionTemplateName string `json:"actionTemplateName"`
						} `json:"setCustomActionTemplate"`
						SetFsmActive []struct {
							Fsm    string `json:"fsm"`
							Active bool   `json:"active"`
						} `json:"setFsmActive"`
					} `json:"actions"`
				} `json:"pulseDopplerVelocityToPulse"`
				PulseToPulseDoppler struct {
					StateFrom string `json:"stateFrom"`
					Command   string `json:"command"`
					StateTo   string `json:"stateTo"`
					Actions   struct {
						SetCustomActionTemplate []struct {
							Fsm                string `json:"fsm"`
							Name               string `json:"name"`
							ActionTemplateName string `json:"actionTemplateName"`
						} `json:"setCustomActionTemplate"`
						SetFsmActive []struct {
							Fsm    string `json:"fsm"`
							Active bool   `json:"active"`
						} `json:"setFsmActive"`
					} `json:"actions"`
				} `json:"pulseToPulseDoppler"`
			} `json:"transitions"`
		} `json:"searchModes"`
		TrackModes struct {
			StateInit   string `json:"stateInit"`
			Transitions struct {
				Enter struct {
					Event   string `json:"event"`
					StateTo string `json:"stateTo"`
					Actions struct {
						DoCustomActionTemplate struct {
							Fsm  string `json:"fsm"`
							Name string `json:"name"`
						} `json:"doCustomActionTemplate"`
					} `json:"actions"`
				} `json:"enter"`
				UpdatePrimary struct {
					StateFrom string `json:"stateFrom"`
					Event     string `json:"event"`
					Actions   struct {
						DoCustomActionTemplate struct {
							Fsm  string `json:"fsm"`
							Name string `json:"name"`
						} `json:"doCustomActionTemplate"`
					} `json:"actions"`
				} `json:"updatePrimary"`
				UpdateSecondary struct {
					StateFrom string `json:"stateFrom"`
					Event     string `json:"event"`
					Actions   struct {
						DoCustomActionTemplate struct {
							Fsm  string `json:"fsm"`
							Name string `json:"name"`
						} `json:"doCustomActionTemplate"`
					} `json:"actions"`
				} `json:"updateSecondary"`
				PrimaryToSecondary struct {
					StateFrom string `json:"stateFrom"`
					Command   string `json:"command"`
					StateTo   string `json:"stateTo"`
					Actions   struct {
						DoCustomActionTemplate struct {
							Fsm  string `json:"fsm"`
							Name string `json:"name"`
						} `json:"doCustomActionTemplate"`
					} `json:"actions"`
				} `json:"primaryToSecondary"`
				PulseDopplerToPulse struct {
					StateFrom string `json:"stateFrom"`
					Command   string `json:"command"`
					StateTo   string `json:"stateTo"`
					Actions   struct {
						DoCustomActionTemplate struct {
							Fsm  string `json:"fsm"`
							Name string `json:"name"`
						} `json:"doCustomActionTemplate"`
					} `json:"actions"`
				} `json:"pulseDopplerToPulse"`
			} `json:"transitions"`
		} `json:"trackModes"`
		Search struct {
			StateInit   string `json:"stateInit"`
			Transitions struct {
				Scan struct {
					Event   string `json:"event"`
					Actions struct {
						Scan struct {
						} `json:"scan"`
						SetCenterAzimuth []struct {
							Source string  `json:"source"`
							Value  float64 `json:"value,omitempty"`
						} `json:"setCenterAzimuth"`
						SetCenterElevation []struct {
							Source string  `json:"source"`
							Value  float64 `json:"value,omitempty"`
						} `json:"setCenterElevation"`
					} `json:"actions"`
				} `json:"scan"`
				Detect struct {
					Event   string `json:"event"`
					Actions struct {
						SetDistGatePos struct {
							Source string  `json:"source"`
							Width  float64 `json:"width"`
						} `json:"setDistGatePos"`
						SetRelSpeedGatePos struct {
							Source string  `json:"source"`
							Width  float64 `json:"width"`
						} `json:"setRelSpeedGatePos"`
						DetectTarget struct {
						} `json:"detectTarget"`
					} `json:"actions"`
				} `json:"detect"`
				AddTarget struct {
					Event   string `json:"event"`
					Actions struct {
						AddTarget struct {
						} `json:"addTarget"`
						UpdateActiveDetectedTarget struct {
						} `json:"updateActiveDetectedTarget"`
					} `json:"actions"`
				} `json:"addTarget"`
				SwitchSelectedTarget struct {
					Command string `json:"command"`
					Actions struct {
						SetNextDetectedTargetActive struct {
						} `json:"setNextDetectedTargetActive"`
					} `json:"actions"`
				} `json:"switchSelectedTarget"`
				SetCueAzimuth struct {
					Command string `json:"command"`
					Actions struct {
						SetCueAzimuth struct {
						} `json:"setCueAzimuth"`
					} `json:"actions"`
				} `json:"setCueAzimuth"`
				SetCueDist struct {
					Command string `json:"command"`
					Actions struct {
						SetCueDist struct {
						} `json:"setCueDist"`
						SetCueDopplerSpeed struct {
						} `json:"setCueDopplerSpeed"`
					} `json:"actions"`
				} `json:"setCueDist"`
				SetCueElevation struct {
					Command string `json:"command"`
					Actions struct {
						SetCueElevation struct {
						} `json:"setCueElevation"`
					} `json:"actions"`
				} `json:"setCueElevation"`
				SetSelectedTarget struct {
					Command string `json:"command"`
					Actions struct {
						SetDetectedTargetActive struct {
						} `json:"setDetectedTargetActive"`
					} `json:"actions"`
				} `json:"setSelectedTarget"`
			} `json:"transitions"`
		} `json:"search"`
		Tws struct {
			StateInit   string `json:"stateInit"`
			Transitions struct {
				Scan struct {
					Event   string `json:"event"`
					Actions struct {
						Scan struct {
						} `json:"scan"`
						ExtrapolateTargetsOfInterest struct {
						} `json:"extrapolateTargetsOfInterest"`
						ClearTargetsOfInterest struct {
							TimeOut float64 `json:"timeOut"`
						} `json:"clearTargetsOfInterest"`
						SetCueToActiveTargetOfInterest struct {
						} `json:"setCueToActiveTargetOfInterest"`
						SetCenterAzimuth []struct {
							Source string  `json:"source"`
							Value  float64 `json:"value,omitempty"`
						} `json:"setCenterAzimuth"`
						SetCenterElevation []struct {
							Source string  `json:"source"`
							Value  float64 `json:"value,omitempty"`
						} `json:"setCenterElevation"`
					} `json:"actions"`
				} `json:"scan"`
				Detect struct {
					Event   string `json:"event"`
					Actions struct {
						SetDistGatePos struct {
							Source string  `json:"source"`
							Width  float64 `json:"width"`
						} `json:"setDistGatePos"`
						SetRelSpeedGatePos struct {
							Source string  `json:"source"`
							Width  float64 `json:"width"`
						} `json:"setRelSpeedGatePos"`
						DetectTarget struct {
						} `json:"detectTarget"`
					} `json:"actions"`
				} `json:"detect"`
				AddTarget struct {
					Event   string `json:"event"`
					Actions struct {
						UpdateTargetOfInterest struct {
							Limit   int     `json:"limit"`
							TimeOut float64 `json:"timeOut"`
							Radius  float64 `json:"radius"`
							Blend   float64 `json:"blend"`
						} `json:"updateTargetOfInterest"`
						UpdateActiveDetectedTarget struct {
						} `json:"updateActiveDetectedTarget"`
						SetCueToActiveTargetOfInterest struct {
						} `json:"setCueToActiveTargetOfInterest"`
					} `json:"actions"`
				} `json:"addTarget"`
				SwitchSelectedTarget struct {
					Command string `json:"command"`
					Actions struct {
						SetNextDetectedTargetActive struct {
						} `json:"setNextDetectedTargetActive"`
					} `json:"actions"`
				} `json:"switchSelectedTarget"`
				SetCueAzimuth struct {
					Command string `json:"command"`
					Actions struct {
						SetCueAzimuth struct {
						} `json:"setCueAzimuth"`
					} `json:"actions"`
				} `json:"setCueAzimuth"`
				SetCueDist struct {
					Command string `json:"command"`
					Actions struct {
						SetCueDist struct {
						} `json:"setCueDist"`
						SetCueDopplerSpeed struct {
						} `json:"setCueDopplerSpeed"`
					} `json:"actions"`
				} `json:"setCueDist"`
				SetCueElevation struct {
					Command string `json:"command"`
					Actions struct {
						SetCueElevation struct {
						} `json:"setCueElevation"`
					} `json:"actions"`
				} `json:"setCueElevation"`
				SetSelectedTarget struct {
					Command string `json:"command"`
					Actions struct {
						SetDetectedTargetActive struct {
						} `json:"setDetectedTargetActive"`
					} `json:"actions"`
				} `json:"setSelectedTarget"`
				DesignateTarget struct {
					Command string `json:"command"`
					Actions struct {
						DesignateActiveDetectedTarget struct {
							Type        int `json:"type"`
							SensorIndex int `json:"sensorIndex"`
						} `json:"designateActiveDetectedTarget"`
						DesignateTargetUnderCue struct {
							Type        int `json:"type"`
							SensorIndex int `json:"sensorIndex"`
						} `json:"designateTargetUnderCue"`
					} `json:"actions"`
				} `json:"designateTarget"`
			} `json:"transitions"`
		} `json:"tws"`
		Lock struct {
			StateInit   string `json:"stateInit"`
			Transitions struct {
				Scan struct {
					Event   string `json:"event"`
					Actions struct {
						Scan struct {
						} `json:"scan"`
					} `json:"actions"`
				} `json:"scan"`
				Detect struct {
					Event   string `json:"event"`
					Actions struct {
						DetectTarget struct {
						} `json:"detectTarget"`
					} `json:"actions"`
				} `json:"detect"`
			} `json:"transitions"`
		} `json:"lock"`
		Track struct {
			StateInit   string `json:"stateInit"`
			Transitions struct {
				Detect struct {
					Event   string `json:"event"`
					Actions struct {
						DetectTarget struct {
						} `json:"detectTarget"`
					} `json:"actions"`
				} `json:"detect"`
				Track struct {
					Event   string `json:"event"`
					Actions struct {
						UpdateActiveTargetOfInterest struct {
						} `json:"updateActiveTargetOfInterest"`
						SetCenterAzimuth struct {
							Source string `json:"source"`
						} `json:"setCenterAzimuth"`
						SetCenterElevation struct {
							Source string `json:"source"`
						} `json:"setCenterElevation"`
						SetDistGatePos struct {
							Source string  `json:"source"`
							Width  float64 `json:"width"`
						} `json:"setDistGatePos"`
						SetRelSpeedGatePos struct {
							Source string  `json:"source"`
							Width  float64 `json:"width"`
						} `json:"setRelSpeedGatePos"`
					} `json:"actions"`
				} `json:"track"`
				Extrapolate struct {
					Event   string `json:"event"`
					Actions struct {
						ExtrapolateTargetsOfInterest struct {
						} `json:"extrapolateTargetsOfInterest"`
						ClearTargetsOfInterest struct {
							TimeOut float64 `json:"timeOut"`
						} `json:"clearTargetsOfInterest"`
						SetCenterAzimuth struct {
							Source string `json:"source"`
						} `json:"setCenterAzimuth"`
						SetCenterElevation struct {
							Source string `json:"source"`
						} `json:"setCenterElevation"`
						SetDistGatePos struct {
							Source string  `json:"source"`
							Width  float64 `json:"width"`
						} `json:"setDistGatePos"`
						SetRelSpeedGatePos struct {
							Source string  `json:"source"`
							Width  float64 `json:"width"`
						} `json:"setRelSpeedGatePos"`
					} `json:"actions"`
				} `json:"extrapolate"`
			} `json:"transitions"`
		} `json:"track"`
	} `json:"fsms"`
}

func (rg RadarGithub) ToAPIModel(url string, createdAt time.Time) *Radar {
	urlParts := strings.Split(url, "/")
	filename := urlParts[len(urlParts)-1]

	name := stripFilename(filename)
	origin := strings.Split(name, "_")[0]

	r := &Radar{
		Origin: origin,
		Name:   name,
		RawURL: url,

		Type:      rg.Type,
		CreatedAt: createdAt,
	}

	// Missiles with a sustainer
	// if rg.Rocket.TimeFire1 != 0 {
	// 	m.SustainerBurnTime = fmt.Sprintf("%.1f", rg.Rocket.TimeFire1)
	// } else {
	// 	m.SustainerBurnTime = ""
	// }

	return r
}

func (r Radars) ToEmptyInterfaces() []interface{} {
	ifs := make([]interface{}, len(r))
	for i, s := range r {
		ifs[i] = s
	}

	return ifs
}
