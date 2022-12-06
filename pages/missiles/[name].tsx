/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-extra-semi */
/* eslint-disable linebreak-style */

import { Button, ScrollArea, Text, Title } from '@mantine/core';
import {
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
  InferGetServerSidePropsType,
  InferGetStaticPropsType,
} from 'next';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import { MissileCard } from '../../components/cards/missile';
import Layout from '../../components/layout';
import { baseRepoURL, GithubDirContents, repoMissilesPath } from '../../data/github';
import { Missile } from '../../data/missile';
import { useScrollLock } from '@mantine/hooks';
import { MissileTableProps, MissileTable, MissileAPI } from '../../components/tables/MissileTable';
import { MakeThundyAPIRequest } from '../../lib/api';

export interface MissileProps {
  missile;
}

export const baseRawURL =
  'https://raw.githubusercontent.com/gszabi99/War-Thunder-Datamine/master/aces.vromfs.bin_u/gamedata/weapons/rocketguns';

// export const getStaticPaths: GetStaticPaths = async () => {
//   const res = MakeThundyAPIRequest('/api/missiles');
//   const missiles = (await (await res).json()) as MissileAPI[];

//   const paths = [];

//   for (const m of missiles) {
//     // console.log(m.name, m.rawURL);
//     paths.push({
//       params: {
//         name: m.name,
//       },
//     });
//   }

//   return {
//     paths,
//     fallback: false,
//   };
// };

// export interface MissileProps {
//   missile;
// }

// export interface MissilePropsStatic {
//   missileName;
// }

// export const getStaticProps: GetStaticProps = async (context) => {
//   // const resAPI = MakeThundyAPIRequest('/api/missiles?name=' + context.params.name);
//   // const missileAPI = (await (await resAPI).json()) as MissileAPI;

//   // // console.log(context);
//   // // const res = await fetch(context.params.rawURL as string);
//   // const res = await fetch(missileAPI.rawURL as string);

//   // const missileData = await res.json();

//   const missileProps: MissilePropsStatic = {
//     missileName: context.params.name,
//   };

//   return {
//     props: {
//       missileProps,
//     },
//   };
// };

export const getServerSideProps: GetServerSideProps = async (context) => {
  const resAPI = MakeThundyAPIRequest('/api/missiles?name=' + context.params.name);
  const missileAPI = (await (await resAPI).json()) as MissileAPI;

  // console.log(context);
  // const res = await fetch(context.params.rawURL as string);
  const res = await fetch(missileAPI.rawURL as string);
  const missileData = await res.json();

  // const missileProps: MissilePropsStatic = {
  //   missileName: context.params.name,
  // };

  // return {
  //   props: {
  //     missileProps,
  //   },
  // };
  // const missileURL = `${baseRawURL}/${context.params.name}.blkx`;
  // console.log('fetching missile data', missileURL);
  // const res = await fetch(missileURL);
  // const missileData = (await res.json()) as Missile;

  const missileProps: MissileProps = {
    missile: missileData as Missile,
  };

  return {
    props: {
      missileProps,
    },
  };
};
export default function Name({
  missileProps,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const name = router.query.name;

  const [scrollLocked, setScrollLocked] = useScrollLock(false);

  return (
    <>
      <Title>{name}</Title>
      <MissileCard missileProps={missileProps}></MissileCard>
    </>
  );
}

Name.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
