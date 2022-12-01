/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-extra-semi */
/* eslint-disable linebreak-style */

import { Button, ScrollArea, Text, Title } from '@mantine/core';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import { MissileCard } from '../../components/cards/missile';
import Layout from '../../components/layout';
import { baseRepoURL, GithubDirContents, repoMissilesPath } from '../../data/github';
import { Missile } from '../../data/missile';
import { useScrollLock } from '@mantine/hooks';
import { MissileTableProps, MissileTable, MissileAPI } from '../../components/tables/MissileTable';
import { MakeThundyAPIRequest } from '../../lib/api';

export const getStaticPaths: GetStaticPaths = async () => {
  const res = MakeThundyAPIRequest('/api/missiles');
  const missiles = (await (await res).json()) as MissileAPI[];

  const paths = [];

  for (const m of missiles) {
    // console.log(m.name, m.rawURL);
    paths.push({
      params: {
        name: m.name,
      },
    });
  }

  return {
    paths,
    fallback: false,
  };
};

export interface MissileProps {
  missile;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const resAPI = MakeThundyAPIRequest('/api/missiles?name=' + context.params.name);
  const missileAPI = (await (await resAPI).json()) as MissileAPI;

  // console.log(context);
  // const res = await fetch(context.params.rawURL as string);
  const res = await fetch(missileAPI.rawURL as string);

  const missileData = await res.json();

  const missileProps: MissileProps = {
    missile: missileData,
  };

  return {
    props: {
      missileProps,
    },
  };
};

export default function Name({ missileProps }: InferGetStaticPropsType<typeof getStaticProps>) {
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
