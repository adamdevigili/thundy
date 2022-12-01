/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-extra-semi */
/* eslint-disable linebreak-style */

import Link from 'next/link';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { Title, Text, Anchor, Container, Grid, Skeleton } from '@mantine/core';
import { ReactElement, useState } from 'react';
import { MissileTableProps, MissileTable, MissileAPI } from '../../components/tables/MissileTable';
import { Missile } from '../../data/missile';
import { NavbarMinimalColored } from '../../components/navbar/navbar';
import { baseRepoURL, GithubDirContents, repoMissilesPath } from '../../data/github';
import Layout from '../../components/layout';
import { url } from 'inspector';
import { MakeThundyAPIRequest } from '../../lib/api';

export const getStaticProps: GetStaticProps = async (context) => {
  console.log('getStaticProps ----------------');

  const res = MakeThundyAPIRequest('/api/missiles');
  const data = (await (await res).json()) as MissileAPI[];

  const missileProps: MissileTableProps = {
    missiles: data,
  };
  return {
    props: { missileProps },
  };
};

export default function Missiles({ missileProps }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <MissileTable {...missileProps} />
    </>
  );
}

Missiles.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
