/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-extra-semi */
/* eslint-disable linebreak-style */

import Link from 'next/link';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { Title, Text, Anchor, Container, Grid, Skeleton } from '@mantine/core';
import { ReactElement, useState } from 'react';
import {
  MissileTableProps,
  MissileTable,
  GetCustomPropertyString,
  GetGuidance,
} from '../../components/tables/MissileTable';
import { Missile } from '../../data/missile';
import { NavbarMinimalColored } from '../../components/navbar/navbar';
import { baseRepoURL, GithubDirContents, repoMissilesPath } from '../../data/github';
import Layout from '../../components/layout';
import { url } from 'inspector';
// import mockData from '../data/mock_data.json';

export const baseRawURL =
  'https://raw.githubusercontent.com/gszabi99/War-Thunder-Datamine/master/aces.vromfs.bin_u/gamedata/weapons/rocketguns';

async function getMissileData(path: string) {}

// type MissileTableProps = {
//   isLoading: boolean;
//   missileData: Missile[];
// };

export const getStaticProps: GetStaticProps = async (context) => {
  console.log('----------------');

  const res = await fetch(`${baseRepoURL}${repoMissilesPath}`);
  const files = (await res.json()) as GithubDirContents[];

  // console.log(files);
  const missileNames = files.map((file) => file.name);

  // let missileData: Missile[] = [];

  // res = await fetch(`${baseRawURL}/us_aim9b_sidewinder.blkx`);
  // missileData[0] = (await res.json()) as Missile;

  // res = await fetch(`${baseRawURL}/us_aim9j_sidewinder.blkx`);
  // missileData[1] = (await res.json()) as Missile;

  // -----
  // await missileNames.reduce(async (promise, n) => {
  //     // This line will wait for the last async function to finish.
  //     // The first iteration uses an already resolved Promise
  //     // so, it will immediately continue.
  //     await promise;
  //     if (n.includes('aim9')) {
  //         console.log('fetching: ' + n)
  //         res = await fetch(`${baseRawURL}/${n}`)
  //         .then(await res.json())
  //         .then(missileData.push(res) as Missile)
  //     }

  //     console.log(missileData);

  //   }, Promise.resolve());

  // -----
  // promises
  // await Promise.all(
  //     missileNames.map(n => fetch(`${baseRawURL}/${n}`))
  // );

  //  const resps = Promise.all();

  // ------

  // for (const n of missileNames) {
  //     if (n.includes('aim9')) {
  //         console.log('fetching: ' + n);
  //         res = await fetch(`${baseRawURL}/${n}`);
  //         missileData.push(await res.json()) as Missile;
  //         console.log('adding: ' + n);
  //     }
  // };

  // Dict to account for duplicate missile names in different files (common :()
  const missileObj = {};
  const missileURLs: string[] = [];

  for (const n of missileNames) {
    if (
      n.includes('cn_') ||
      n.includes('de_') ||
      n.includes('fr_') ||
      n.includes('il_') ||
      n.includes('it_') ||
      n.includes('jp_') ||
      n.includes('su_') ||
      n.includes('swd_') ||
      n.includes('uk_') ||
      n.includes('us_')
    ) {
      missileURLs.push(`${baseRawURL}/${n}`);
    }

    // if (n.includes('us_aim') || n.includes('su_r_')) {
    //   // console.log(`${baseRawURL}/${n}`);
    //   missileURLs.push(`${baseRawURL}/${n}`);
    // }

    // if (n.includes('us_')) {
    //   missileURLs.push(`${baseRawURL}/${n}`);
    // }
  }

  // console.log(missileURLs);

  let missilePromises = {};

  // let missilePromises = [];

  for (let url of missileURLs) {
    missilePromises[url] = fetch(url);
  }

  async function resolveJSONPromises(promises) {
    for (let p of promises) {
      missilePromises[p.url] = await p.json();
      // console.log(r.url);
    }

    return Promise.resolve();

    // console.log('missilePromises', missilePromises);

    // const entries = Object.entries(missilePromises);
    // const resolved = await Promise.all(Object.entries(missilePromises).map((o) => o[1]));
    // entries.forEach((o) => (o[1] = resolved[1]));
    // missilePromises = Object.fromEntries(entries);
  }

  // console.log(Object.values(missilePromises));

  // const entries = Object.entries(missilePromises);
  // const resolved = await Promise.all(Object.entries(missilePromises).map((o) => o[1]));
  // entries.forEach((o) => (o[1] = resolved[1]));
  // const x = Object.fromEntries(entries);

  // console.log(x);

  await Promise.all(Object.values(missilePromises))
    .then((responses) => resolveJSONPromises(responses))
    .then(function (pdata) {
      // console.log('pdata', pdata);

      // console.log(missilePromises);
      for (const [url, data] of Object.entries(missilePromises)) {
        const d = data as Missile;
        // console.log('url', url);
        // console.log('data', data);

        // const name = url.split('/')[-1].split('.')[0];

        // console.log('len', url.length);

        const splitURL = url.split('/');
        const name = splitURL[splitURL.length - 1].split('.')[0];

        d.name = name;

        // console.log('data', d);

        // console.log(url);

        // missileObj[m.mesh] = m;
        // const b = GetCustomPropertyString(m, 'bulletName');
        // console.log(m.mesh, ',', b);

        // const missileType = GetCustomPropertyString(m, 'iconType');

        // if (
        //   missileType === 'missile_air_to_air' ||
        //   missileType === 'missile_type_b_air_to_air' ||
        //   missileType === 'missile_type_b_air_to_air_midrange'
        // ) {
        // console.log('checking missile', d);
        if (GetGuidance(d) !== undefined) {
          // console.log('adding missile', d);
          missileObj[name] = data;
        }
      }
    });

  const missileData = Object.values(missileObj);

  // console.log('missileObj', missileObj);
  // console.log("break")
  // console.log('missileData', missileData);

  //   console.log(missileData);

  // if (!missileData) {
  //   return {
  //     notFound: true,
  //   };
  // }

  const missileProps: MissileTableProps = {
    missiles: missileData as Missile[],
  };
  return {
    props: { missileProps }, // will be passed to the page component as props
  };
};

export default function Missiles({ missileProps }: InferGetStaticPropsType<typeof getStaticProps>) {
  // console.log("Missiles", mp)
  return (
    <>
      <MissileTable {...missileProps} />
    </>
  );
}

Missiles.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
