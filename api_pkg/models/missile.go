package models

import (
	"fmt"
	"strings"
)

type Missiles []*Missile

type Missile struct {
	Origin            string `bson:"origin" json:"origin"`
	Name              string `bson:"name" json:"name"`
	GuidanceType      string `bson:"guidanceType" json:"guidanceType"`
	WarmUpTime        string `bson:"warmUpTime" json:"warmUpTime"`
	WorkTime          string `bson:"workTime" json:"workTime"`
	LoadFactorMax     string `bson:"loadFactorMax" json:"loadFactorMax"`
	MachMax           string `bson:"machMax" json:"machMax"`
	BurnTime          string `bson:"burnTime" json:"burnTime"`
	SustainerBurnTime string `bson:"sustainerBurnTime" json:"sustainerBurnTime"`
	RawURL            string `bson:"rawURL" json:"rawURL"`
}

type MissileGithub struct {
	RocketGun       bool    `json:"rocketGun"`
	PresetCost      int     `json:"preset_cost"`
	Bullets         int     `json:"bullets"`
	ShotFreq        float64 `json:"shotFreq"`
	Sound           string  `json:"sound"`
	HelicopterGroup int     `json:"helicopterGroup"`
	Mesh            string  `json:"mesh"`
	MeshDesployed   string  `json:"mesh_deployed"`
	Tags            struct {
	} `json:"tags"`
	Rocket struct {
		NormalizationPreset                string    `json:"normalizationPreset"`
		RicochetPreset                     string    `json:"ricochetPreset"`
		SecondaryShattersPreset            string    `json:"secondaryShattersPreset"`
		StabilityThreshold                 float64   `json:"stabilityThreshold"`
		StabilityCaliberToArmorThreshold   float64   `json:"stabilityCaliberToArmorThreshold"`
		StabilityReductionAfterRicochet    float64   `json:"stabilityReductionAfterRicochet"`
		StabilityReductionAfterPenetration float64   `json:"stabilityReductionAfterPenetration"`
		BulletType                         string    `json:"bulletType"`
		BulletName                         string    `json:"bulletName"`
		Caliber                            float64   `json:"caliber"`
		Mass                               float64   `json:"mass"`
		ExplosiveType                      string    `json:"explosiveType"`
		ExplosiveMass                      float64   `json:"explosiveMass"`
		MassEnd                            float64   `json:"massEnd"`
		MaxDeltaAngle                      float64   `json:"maxDeltaAngle"`
		DragCx                             float64   `json:"dragCx"`
		Length                             float64   `json:"length"`
		WingAreaMult                       float64   `json:"wingAreaMult"`
		DistFromCmToStab                   float64   `json:"distFromCmToStab"`
		CxK                                float64   `json:"CxK"`
		WdK                                []float64 `json:"WdK"`
		FinsAoaHor                         float64   `json:"finsAoaHor"`
		FinsAoaVer                         float64   `json:"finsAoaVer"`
		FinsLatAccel                       float64   `json:"finsLatAccel"`
		Force                              float64   `json:"force"`
		TimeFire                           float64   `json:"timeFire"`
		Force1                             float64   `json:"force1"`
		TimeFire1                          float64   `json:"timeFire1"`
		MassEnd1                           float64   `json:"massEnd1"`
		FireDelay                          float64   `json:"fireDelay"`
		SpawnExplosionFx                   bool      `json:"spawnExplosionFx"`
		SpawnExplosionWreckage             bool      `json:"spawnExplosionWreckage"`
		SelfDestructionFx                  string    `json:"selfDestructionFx"`
		ExplosionEffect                    string    `json:"explosionEffect"`
		GroundCollisionEffect              string    `json:"groundCollisionEffect"`
		RicochetEffect                     string    `json:"ricochetEffect"`
		WaterCollisionEffect               string    `json:"waterCollisionEffect"`
		ExplosionPatchRadius               float64   `json:"explosionPatchRadius"`
		VisualShattersWaterOffset          float64   `json:"visualShattersWaterOffset"`
		VisualShattersGroundOffset         float64   `json:"visualShattersGroundOffset"`
		FireEffect                         string    `json:"fireEffect"`
		SmokeEffect                        string    `json:"smokeEffect"`
		HazeEffect                         string    `json:"hazeEffect"`
		EndSmokeViscosity                  float64   `json:"endSmokeViscosity"`
		EffectOffset                       []float64 `json:"effectOffset"`
		MaxDistance                        float64   `json:"maxDistance"`
		MinDistance                        float64   `json:"minDistance"`
		DistanceFuse                       bool      `json:"distanceFuse"`
		HitPowerMult                       float64   `json:"hitPowerMult"`
		FuseDelayDist                      float64   `json:"fuseDelayDist"`
		ExplodeTreshold                    []float64 `json:"explodeTreshold"`
		GuidanceSfx                        string    `json:"guidanceSfx"`
		GuidanceType                       string    `json:"guidanceType"`
		HasProximityFuse                   bool      `json:"hasProximityFuse"`
		ExplodeHitPower                    float64   `json:"explodeHitPower"`
		ExplodeArmorPower                  float64   `json:"explodeArmorPower"`
		ExplodeRadius                      []float64 `json:"explodeRadius"`
		RendinstDamageRadius               float64   `json:"rendinstDamageRadius"`
		StatType                           string    `json:"statType"`
		ShutterDamage                      bool      `json:"shutterDamage"`
		ShutterDamageRadius                float64   `json:"shutterDamageRadius"`
		ShutterAmount                      int       `json:"shutterAmount"`
		ShutterArmorPower                  float64   `json:"shutterArmorPower"`
		ShutterHit                         float64   `json:"shutterHit"`
		AdvancedMissiles                   bool      `json:"advancedMissiles"`
		UseStartSpeed                      bool      `json:"useStartSpeed"`
		StartSpeed                         float64   `json:"startSpeed"`
		EndSpeed                           float64   `json:"endSpeed"`
		TimeLife                           float64   `json:"timeLife"`
		MachMax                            float64   `json:"machMax"`
		LoadFactorMax                      float64   `json:"loadFactorMax"`
		RangeMax                           float64   `json:"rangeMax"`
		Price                              float64   `json:"price"`
		AmountPerTier                      float64   `json:"amountPerTier"`
		IconType                           string    `json:"iconType"`
		StabilityRicochetModifier          struct {
			Mod1 []float64   `json:"mod1"`
			Mod2 []float64   `json:"mod2"`
			Mod3 [][]float64 `json:"mod3"`
		} `json:"stabilityRicochetModifier"`
		PressureDamage struct {
			DamageType string `json:"damageType"`
		} `json:"pressureDamage"`
		Collisions struct {
			Default struct {
				Fx string `json:"fx"`
			} `json:"default"`
			HorLandMesh struct {
				Fx string `json:"fx"`
			} `json:"horLandMesh"`
			Soil struct {
				Fx string `json:"fx"`
			} `json:"soil"`
			Dirt struct {
				Fx string `json:"fx"`
			} `json:"dirt"`
			Road struct {
				Fx string `json:"fx"`
			} `json:"road"`
			RoadSoil struct {
				Fx string `json:"fx"`
			} `json:"roadSoil"`
			BricksRed struct {
				Fx string `json:"fx"`
			} `json:"bricks_red"`
			Sand struct {
				Fx string `json:"fx"`
			} `json:"sand"`
			DuneSand struct {
				Fx string `json:"fx"`
			} `json:"duneSand"`
			RoadSand struct {
				Fx string `json:"fx"`
			} `json:"roadSand"`
			QuickSand struct {
				Fx string `json:"fx"`
			} `json:"quickSand"`
			Snow struct {
				Fx string `json:"fx"`
			} `json:"snow"`
			Ice struct {
				Fx string `json:"fx"`
			} `json:"ice"`
			RoadSnow struct {
				Fx string `json:"fx"`
			} `json:"roadSnow"`
			SnowLower struct {
				Fx string `json:"fx"`
			} `json:"snowLower"`
			Glass struct {
				Fx string `json:"fx"`
			} `json:"glass"`
			Wood struct {
				Fx string `json:"fx"`
			} `json:"wood"`
			Steel struct {
				Fx string `json:"fx"`
			} `json:"steel"`
			Metal struct {
				Fx string `json:"fx"`
			} `json:"metal"`
			Buildings struct {
				Fx string `json:"fx"`
			} `json:"buildings"`
			VerLandMesh struct {
				Fx string `json:"fx"`
			} `json:"verLandMesh"`
			Concrete struct {
				Fx string `json:"fx"`
			} `json:"concrete"`
			Rocks struct {
				Fx string `json:"fx"`
			} `json:"rocks"`
			RocksSlippery struct {
				Fx string `json:"fx"`
			} `json:"rocksSlippery"`
			Fabric struct {
				Fx string `json:"fx"`
			} `json:"fabric"`
			StoneSnow struct {
				Fx string `json:"fx"`
			} `json:"stone_snow"`
		} `json:"collisions"`
		ShatterCollisions struct {
			GroundCollisionEffect string `json:"groundCollisionEffect"`
			WaterCollisionEffect  string `json:"waterCollisionEffect"`
			Default               struct {
				Fx string `json:"fx"`
			} `json:"default"`
			HorLandMesh struct {
				Fx string `json:"fx"`
			} `json:"horLandMesh"`
			Soil struct {
				Fx string `json:"fx"`
			} `json:"soil"`
			Dirt struct {
				Fx string `json:"fx"`
			} `json:"dirt"`
			Road struct {
				Fx string `json:"fx"`
			} `json:"road"`
			BricksRed struct {
				Fx string `json:"fx"`
			} `json:"bricks_red"`
			RoadSoil struct {
				Fx string `json:"fx"`
			} `json:"roadSoil"`
			Sand struct {
				Fx string `json:"fx"`
			} `json:"sand"`
			DuneSand struct {
				Fx string `json:"fx"`
			} `json:"duneSand"`
			RoadSand struct {
				Fx string `json:"fx"`
			} `json:"roadSand"`
			QuickSand struct {
				Fx string `json:"fx"`
			} `json:"quickSand"`
			Snow struct {
				Fx string `json:"fx"`
			} `json:"snow"`
			Ice struct {
				Fx string `json:"fx"`
			} `json:"ice"`
			RoadSnow struct {
				Fx string `json:"fx"`
			} `json:"roadSnow"`
			SnowLower struct {
				Fx string `json:"fx"`
			} `json:"snowLower"`
			Glass struct {
				Fx string `json:"fx"`
			} `json:"glass"`
			Wood struct {
				Fx string `json:"fx"`
			} `json:"wood"`
			Steel struct {
				Fx string `json:"fx"`
			} `json:"steel"`
			Metal struct {
				Fx string `json:"fx"`
			} `json:"metal"`
			Buildings struct {
				Fx string `json:"fx"`
			} `json:"buildings"`
			VerLandMesh struct {
				Fx string `json:"fx"`
			} `json:"verLandMesh"`
			Concrete struct {
				Fx string `json:"fx"`
			} `json:"concrete"`
			Rocks struct {
				Fx string `json:"fx"`
			} `json:"rocks"`
			RocksSlippery struct {
				Fx string `json:"fx"`
			} `json:"rocksSlippery"`
			Fabric struct {
				Fx string `json:"fx"`
			} `json:"fabric"`
			StoneSnow struct {
				Fx string `json:"fx"`
			} `json:"stone_snow"`
		} `json:"shatterCollisions"`
		DamageParts struct {
			Body struct {
				Hp             float64 `json:"hp"`
				ArmorClass     string  `json:"armorClass"`
				ArmorThickness float64 `json:"armorThickness"`
			} `json:"body"`
		} `json:"DamageParts"`
		DamageEffects struct {
			Part struct {
				Name  string `json:"name"`
				OnHit struct {
					Expl float64 `json:"expl"`
				} `json:"onHit"`
				OnKill struct {
					Destruction float64 `json:"destruction"`
				} `json:"onKill"`
			} `json:"part"`
		} `json:"DamageEffects"`
		Damage struct {
			Shatter struct {
				UseRealShatters bool    `json:"useRealShatters"`
				CountPortion    float64 `json:"countPortion"`
				Segment         []struct {
					RadiusScale      float64   `json:"radiusScale,omitempty"`
					PenetrationScale float64   `json:"penetrationScale,omitempty"`
					DamageScale      float64   `json:"damageScale,omitempty"`
					Angles           []float64 `json:"angles"`
					CountPortion     float64   `json:"countPortion"`
				} `json:"segment"`
			} `json:"shatter"`
			ShatterDamage struct {
				BreachConeAngle float64 `json:"breachConeAngle"`
			} `json:"shatterDamage"`
			Explosive struct {
				Radius float64 `json:"radius"`
				Offset float64 `json:"offset"`
			} `json:"explosive"`
		} `json:"damage"`
		Guidance struct {
			WarmUpTime         float64 `json:"warmUpTime"`
			WorkTime           float64 `json:"workTime"`
			UncageBeforeLaunch bool    `json:"uncageBeforeLaunch"`
			BreakLockMaxTime   float64 `json:"breakLockMaxTime"`
			LockAfterLaunch    bool    `json:"lockAfterLaunch"`
			UseTargetVel       bool    `json:"useTargetVel"`
			LockTimeOut        float64 `json:"lockTimeOut"`
			AfterLaunchSpeedUp float64 `json:"afterLaunchSpeedUp"`
			IrSeeker           struct {
				RangeBand0                float64 `json:"rangeBand0"`
				RangeBand2                float64 `json:"rangeBand2"`
				RangeBand3                float64 `json:"rangeBand3"`
				RangeMax                  float64 `json:"rangeMax"`
				Fov                       float64 `json:"fov"`
				MinAngleToSun             float64 `json:"minAngleToSun"`
				LockAngleMax              float64 `json:"lockAngleMax"`
				AngleMax                  float64 `json:"angleMax"`
				RateMax                   float64 `json:"rateMax"`
				ProlongationTimeMax       float64 `json:"prolongationTimeMax"`
				DesignationSourceTypeMask int     `json:"designationSourceTypeMask"`
			} `json:"irSeeker"`
			RadarSeeker struct {
				Band                      int     `json:"band"`
				SideLobesAttenuation      float64 `json:"sideLobesAttenuation"`
				LockAngleMax              float64 `json:"lockAngleMax"`
				AngleMax                  float64 `json:"angleMax"`
				RateMax                   float64 `json:"rateMax"`
				ProlongationTimeMax       float64 `json:"prolongationTimeMax"`
				DesignationSourceTypeMask int     `json:"designationSourceTypeMask"`
				Transmitter               struct {
					Power   float64 `json:"power"`
					Antenna struct {
						AngleHalfSens        float64 `json:"angleHalfSens"`
						SideLobesSensitivity float64 `json:"sideLobesSensitivity"`
					} `json:"antenna"`
				} `json:"transmitter"`
				Receiver struct {
					Rcs             float64 `json:"rcs"`
					Range           float64 `json:"range"`
					RangeMax        float64 `json:"rangeMax"`
					TimeGainControl bool    `json:"timeGainControl"`
					Antenna         struct {
						AngleHalfSens        float64 `json:"angleHalfSens"`
						SideLobesSensitivity float64 `json:"sideLobesSensitivity"`
					} `json:"antenna"`
				} `json:"receiver"`
				DopplerSpeed struct {
					Presents       bool    `json:"presents"`
					MinValue       float64 `json:"minValue"`
					MaxValue       float64 `json:"maxValue"`
					Width          float64 `json:"width"`
					RefWidth       float64 `json:"refWidth"`
					SignalWidthMin float64 `json:"signalWidthMin"`
				} `json:"dopplerSpeed"`
				DopplerSpeedGate struct {
					FilterAlpha                 float64 `json:"filterAlpha"`
					FilterBetta                 float64 `json:"filterBetta"`
					DopplerSpeedGateSearchRange float64 `json:"dopplerSpeedGateSearchRange"`
				} `json:"dopplerSpeedGate"`
			} `json:"radarSeeker"`
			GuidanceAutopilot struct {
				TimeOut             float64   `json:"timeOut"`
				PropNavMult         float64   `json:"propNavMult"`
				ReqAccelMax         float64   `json:"reqAccelMax"`
				AccelControlProp    float64   `json:"accelControlProp"`
				AccelControlIntg    float64   `json:"accelControlIntg"`
				AccelControlDiff    float64   `json:"accelControlDiff"`
				BaseIndSpeed        float64   `json:"baseIndSpeed"`
				AccelControlIntgLim float64   `json:"accelControlIntgLim"`
				TimeToHitToGain0    []float64 `json:"timeToHitToGain0"`
				TimeToHitToGain1    []float64 `json:"timeToHitToGain1"`
				TimeToHitToGain2    []float64 `json:"timeToHitToGain2"`
				TimeToHitToGain3    []float64 `json:"timeToHitToGain3"`
				TimeToHitToGain4    []float64 `json:"timeToHitToGain4"`
				TimeToGain0         []float64 `json:"timeToGain0"`
				TimeToGain1         []float64 `json:"timeToGain1"`
			} `json:"guidanceAutopilot"`
			Table0 struct {
				Altitude        float64   `json:"altitude"`
				FighterMach     []float64 `json:"fighterMach"`
				TargetMach      []float64 `json:"targetMach"`
				RangeMin        []float64 `json:"rangeMin"`
				RangeMax        []float64 `json:"rangeMax"`
				TimeMax         []float64 `json:"timeMax"`
				RangeMaxAltDiff []float64 `json:"rangeMaxAltDiff"`
				TimeMaxAltDiff  []float64 `json:"timeMaxAltDiff"`
				TargetMach2Mult float64   `json:"targetMach2Mult"`
			} `json:"table0"`
			Table1 struct {
				Altitude        float64   `json:"altitude"`
				FighterMach     []float64 `json:"fighterMach"`
				TargetMach      []float64 `json:"targetMach"`
				RangeMin        []float64 `json:"rangeMin"`
				RangeMax        []float64 `json:"rangeMax"`
				TimeMax         []float64 `json:"timeMax"`
				RangeMaxAltDiff []float64 `json:"rangeMaxAltDiff"`
				TimeMaxAltDiff  []float64 `json:"timeMaxAltDiff"`
				TargetMach2Mult float64   `json:"targetMach2Mult"`
			} `json:"table1"`
			Table2 struct {
				Altitude        float64   `json:"altitude"`
				FighterMach     []float64 `json:"fighterMach"`
				TargetMach      []float64 `json:"targetMach"`
				RangeMin        []float64 `json:"rangeMin"`
				RangeMax        []float64 `json:"rangeMax"`
				TimeMax         []float64 `json:"timeMax"`
				RangeMaxAltDiff []float64 `json:"rangeMaxAltDiff"`
				TimeMaxAltDiff  []float64 `json:"timeMaxAltDiff"`
				TargetMach2Mult float64   `json:"targetMach2Mult"`
			} `json:"table2"`
		} `json:"guidance"`
		ArcadeProp struct {
			FinsAoaHor float64 `json:"finsAoaHor"`
			FinsAoaVer float64 `json:"finsAoaVer"`
		} `json:"arcadeProp"`
		ProximityFuse struct {
			TimeOut           float64   `json:"timeOut"`
			Radius            float64   `json:"radius"`
			DetectShells      bool      `json:"detectShells"`
			ShellCaliberRange []float64 `json:"shellCaliberRange"`
		} `json:"proximityFuse"`
		Armorpower struct {
			ArmorPower0M     []float64 `json:"ArmorPower0m"`
			ArmorPower100M   []float64 `json:"ArmorPower100m"`
			ArmorPower7000M  []float64 `json:"ArmorPower7000m"`
			ArmorPower10000M []float64 `json:"ArmorPower10000m"`
		} `json:"armorpower"`
		Hitpower struct {
			HitPower0M     []float64 `json:"HitPower0m"`
			HitPower10000M []float64 `json:"HitPower10000m"`
		} `json:"hitpower"`
	} `json:"rocket"`
}

func (mg MissileGithub) ToAPIModel(url string) *Missile {
	urlParts := strings.Split(url, "/")
	filename := urlParts[len(urlParts)-1]

	name := stripFilename(filename)
	origin := strings.Split(name, "_")[0]

	m := &Missile{
		Origin:        origin,
		Name:          name,
		GuidanceType:  mg.Rocket.GuidanceType,
		WarmUpTime:    fmt.Sprintf("%.1f", mg.Rocket.Guidance.WarmUpTime),
		WorkTime:      fmt.Sprintf("%.1f", mg.Rocket.Guidance.WorkTime),
		LoadFactorMax: fmt.Sprintf("%.1f", mg.Rocket.LoadFactorMax),
		MachMax:       fmt.Sprintf("%.1f", mg.Rocket.MachMax),
		BurnTime:      fmt.Sprintf("%.1f", mg.Rocket.TimeFire),
		RawURL:        url,
	}

	// Missiles with a sustainer
	if mg.Rocket.TimeFire1 != 0 {
		m.SustainerBurnTime = fmt.Sprintf("%.1f", mg.Rocket.TimeFire1)
	} else {
		m.SustainerBurnTime = ""
	}

	return m
}

func stripFilename(filename string) string {
	r := strings.NewReplacer(
		".blkx", "",
		"_sidewinder", "",
		"_rocket", "",
		"_sparrow", "",
	)

	return r.Replace(filename)
}

func (m Missiles) ToEmptyInterfaces() []interface{} {
	ifs := make([]interface{}, len(m))
	for i, s := range m {
		ifs[i] = s
	}

	return ifs
}
