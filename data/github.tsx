/* eslint-disable linebreak-style */
export interface GithubDirContents {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: string;
  _links: Links;
}

export interface Links {
  self: string;
  git: string;
  html: string;
}

export const baseRepoURL =
  'https://api.github.com/repos/gszabi99/War-Thunder-Datamine/contents/aces.vromfs.bin_u/gamedata';

export const baseRawURL =
  'https://raw.githubusercontent.com/gszabi99/War-Thunder-Datamine/master/aces.vromfs.bin_u/gamedata';

export const repoMissilesPath = '/weapons/rocketguns';
export const repoSensorsPath = '/sensors';
