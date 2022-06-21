/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-extra-semi */
/* eslint-disable linebreak-style */

import { Button, ScrollArea, Text, Title } from '@mantine/core';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import { baseRawURL } from '.';
import { MissileCard } from '../../components/cards/missile';
import Layout from '../../components/layout';
import { baseRepoURL, GithubDirContents, repoMissilesPath } from '../../data/github';
import { Missile } from '../../data/missile';
import { useScrollLock } from '@mantine/hooks';

export const getStaticPaths: GetStaticPaths = async () => {
  console.log('fetching all missile file names');
  const res = await fetch(`${baseRepoURL}${repoMissilesPath}`);
  const files = (await res.json()) as GithubDirContents[];

  const paths = [];

  for (const f of files) {
    if (
      f.name.includes('cn_') ||
      f.name.includes('de_') ||
      f.name.includes('fr_') ||
      f.name.includes('il_') ||
      f.name.includes('it_') ||
      f.name.includes('jp_') ||
      f.name.includes('su_') ||
      f.name.includes('swd_') ||
      f.name.includes('uk_') ||
      f.name.includes('us_')
    ) {
      // console.log(`${baseRawURL}/${n}`);
      paths.push({
        params: {
          name: f.name.split('.')[0],
        },
      });
    }

    // if (n.includes('us_')) {
    //   missileURLs.push(`${baseRawURL}/${n}`);
    // }
  }

  // const paths = files.filter((file) => {
  //   if (file.name.includes('us_aim9')) {
  //     console.log(file.name.split('.'));
  //     const n = file.name.split('.')[0];
  //     return {
  //       params: {
  //         name: n,
  //       },
  //     };
  //   }
  // });

  // console.log('paths', paths);

  return {
    paths,
    fallback: false,
  };
};

export interface MissileProps {
  missile: Missile;
}

export const getStaticProps: GetStaticProps = async (context) => {
  console.log('----------------');

  const missileURL = `${baseRawURL}/${context.params.name}.blkx`;
  console.log('fetching missile data', missileURL);
  const res = await fetch(missileURL);
  const missileData = (await res.json()) as Missile;

  const missileProps: MissileProps = {
    missile: missileData as Missile,
  };

  return {
    props: {
      missileProps,
    },
  };
};

export default function Name({ missileProps }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  const { name } = router.query;

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
