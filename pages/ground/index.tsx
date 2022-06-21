/* eslint-disable linebreak-style */
import { Title, Text } from '@mantine/core';
import { ReactElement } from 'react';
import Layout from '../../components/layout';

export default function Ground() {
  return (
    <>
      <Title sx={{ fontSize: 100, fontWeight: 900, letterSpacing: -2 }} align="center" mt={100}>
        Ground Vehicles
      </Title>
      <Text color="dimmed" align="center" size="lg" sx={{ maxWidth: 580 }} mx="auto" mt="xl">
        Coming Soon..
      </Text>
    </>
  );
}

Ground.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
