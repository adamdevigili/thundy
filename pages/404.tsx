/* eslint-disable linebreak-style */
import { Title, Text } from '@mantine/core';
import { ReactElement } from 'react';
import Layout from '../components/layout';

export default function Custom404() {
  return (
    <>
      <Title sx={{ fontSize: 300, fontWeight: 900, letterSpacing: -2 }} align="center" mt={100}>
        F
      </Title>
      <Text color="dimmed" align="center" size="lg" sx={{ maxWidth: 580 }} mx="auto" mt="xl">
        Not a valid URL
      </Text>
    </>
  );
}

Custom404.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
