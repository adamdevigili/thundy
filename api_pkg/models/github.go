package models

import (
	"regexp"
	"strings"

	"github.com/rs/zerolog/log"
)

type RepoContents []RepoContent

type RepoContent struct {
	Name        string `json:"name"`
	Path        string `json:"path"`
	Sha         string `json:"sha"`
	Size        int    `json:"size"`
	URL         string `json:"url"`
	HTMLURL     string `json:"html_url"`
	GitURL      string `json:"git_url"`
	DownloadURL string `json:"download_url"`
	Type        string `json:"type"`
	Links       struct {
		Self string `json:"self"`
		Git  string `json:"git"`
		HTML string `json:"html"`
	} `json:"_links"`
}

func (rc RepoContents) FilterAAMs() RepoContents {
	var filteredTargets RepoContents

	seen := make(map[string]bool)

	for _, file := range rc {
		if _, ok := seen[file.Name]; !ok {
			if file.isAAM() {
				filteredTargets = append(filteredTargets, file)
			}
		}

		// if strings.Contains(rc.Name, "us_") ||
		// 	strings.Contains(rc.Name, "de_") ||
		// 	strings.Contains(rc.Name, "fr_") ||
		// 	strings.Contains(rc.Name, "il_") ||
		// 	strings.Contains(rc.Name, "it_") ||
		// 	strings.Contains(rc.Name, "jp_") ||
		// 	strings.Contains(rc.Name, "su_") ||
		// 	strings.Contains(rc.Name, "swd_") ||
		// 	strings.Contains(rc.Name, "uk_") ||
		// 	strings.Contains(rc.Name, "us_") {

	}

	return filteredTargets
}

func (rc RepoContents) FilterRadars() RepoContents {
	var filteredTargets RepoContents

	seen := make(map[string]bool)

	for _, file := range rc {
		if _, ok := seen[file.Name]; !ok {
			if file.isRadar() {
				filteredTargets = append(filteredTargets, file)
				log.Info().Str("file.Name", file.Name).Msg("including file")
			}
		}

		// if strings.Contains(rc.Name, "us_") ||
		// 	strings.Contains(rc.Name, "de_") ||
		// 	strings.Contains(rc.Name, "fr_") ||
		// 	strings.Contains(rc.Name, "il_") ||
		// 	strings.Contains(rc.Name, "it_") ||
		// 	strings.Contains(rc.Name, "jp_") ||
		// 	strings.Contains(rc.Name, "su_") ||
		// 	strings.Contains(rc.Name, "swd_") ||
		// 	strings.Contains(rc.Name, "uk_") ||
		// 	strings.Contains(rc.Name, "us_") {

	}

	return filteredTargets
}

const (
	defaultExclusions = `default|cwp|bol_pod|launcher|chaff|rocket|lb|mm`
	usExclusions      = `tow|tiny_tim|mighty_mouse|hydra|hvar|agm|stinger|fim`
	ukExclusions      = `rp3|inch|crv7|hvar|uncle_tom`
	swdExclusions     = `rb52|rb53|rb55|rb75|rb_05a`
	ruExclusions      = `rs82|rs132|ros|rofs|rbs|m8|m13|kh|9m|3m|25ld`
)

var (
	inclusions = []string{
		// "us_aim",
		// "uk_",
		// "swd_",
		// "su_",
		// "it_",
		"us_",
	}
	exclusions = []string{
		defaultExclusions,
		usExclusions,
		// ukExclusions,
		// swdExclusions,
		// ruExclusions,
	}
)

func (rc RepoContent) isAAM() bool {
	// reInclude := regexp.MustCompile(buildInclusionRegEx())
	reExclude := regexp.MustCompile(buildExclusionRegEx())
	log.Info().Str("reExclude", reExclude.String()).Msg("excluding")

	// return !reExclude.MatchString(rc.Name) && reInclude.MatchString(rc.Name)

	exclude := !reExclude.MatchString(rc.Name)
	if exclude {
		log.Info().Str("name", rc.Name).Msg("excluding object")
	}
	return exclude
}

func (rc RepoContent) isRadar() bool {
	reInclude := regexp.MustCompile(buildInclusionRegEx())
	// reExclude := regexp.MustCompile(buildExclusionRegEx())
	// log.Info().Str("reExclude", reExclude.String()).Msg("excluding")

	// return !reExclude.MatchString(rc.Name) && reInclude.MatchString(rc.Name)

	include := reInclude.MatchString(rc.Name)
	if include {
		log.Info().Str("name", rc.Name).Msg("including object")
	}
	return include
}

func buildExclusionRegEx() string {
	return strings.Join(exclusions, "|")
}

func buildInclusionRegEx() string {
	return strings.Join(inclusions, "|")
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
