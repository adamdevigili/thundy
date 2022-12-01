import { baseRepoURL, GithubDirContents } from '../data/github';
import { Missile } from '../data/missile';

// export async function getMissileData(name) {
//   console.log(name);
//   const missileURL = `${baseRawURL}/${name}.blkx`;
//   console.log('fetching missile data', missileURL);
//   const res = await fetch(missileURL).then;
//   return res.json() as Missile;
// }

export function GetCustomPropertyString(m: Missile, k: string): string {
  // console.log('getLoadFactor', m)
  for (const f of m.rocket) {
    if (f.hasOwnProperty(k)) {
      return f[k];
    }
  }

  return undefined;
}

export function GetSound(m: Missile): string {
  return m.sound;
}
