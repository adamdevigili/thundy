/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-extra-semi */
/* eslint-disable linebreak-style */

import { Button, ScrollArea, Text, Title } from '@mantine/core';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import { SensorCard } from '../../components/cards/sensor';
import Layout from '../../components/layout';
import { baseRawURL, baseRepoURL, GithubDirContents, repoSensorsPath } from '../../data/github';
import { Sensor } from '../../data/sensors';
import { useScrollLock } from '@mantine/hooks';

export const getStaticPaths: GetStaticPaths = async () => {
  console.log('fetching all missile file names');
  const res = await fetch(`${baseRepoURL}${repoSensorsPath}`);
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
      f.name.includes('sw_') ||
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

export interface SensorProps {
  sensor: Sensor;
}

export const getStaticProps: GetStaticProps = async (context) => {
  console.log('----------------');

  const sensorURL = `${baseRawURL}${repoSensorsPath}/${context.params.name}.blkx`;
  console.log('fetching missile data', sensorURL);
  const res = await fetch(sensorURL);
  const sensorData = (await res.json()) as Sensor;

  // console.log(sensorData);

  const sensorProps: SensorProps = {
    sensor: sensorData,
  };

  return {
    props: {
      sensorProps: sensorProps,
    },
  };
};

export default function Name({ sensorProps }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  const { name } = router.query;

  const [scrollLocked, setScrollLocked] = useScrollLock(false);

  return (
    <>
      <Title>{name}</Title>
      <SensorCard sensorProps={sensorProps}></SensorCard>
    </>
  );
}

Name.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
