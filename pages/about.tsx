/* eslint-disable linebreak-style */
import { Title, Text } from '@mantine/core';
import { ReactElement } from 'react';
import { BrandGithub } from 'tabler-icons-react';
import Layout from '../components/layout';

export default function About() {
  return (
    <>
      <Title sx={{ fontSize: 100, fontWeight: 900, letterSpacing: -2 }} align="center" mt={100}>
        About
      </Title>
      <Text color="dimmed" align="center" size="xl" sx={{}} mx="auto" mt="xl">
        v0.0.2
      </Text>
      <Text color="dimmed" align="center" size="lg" sx={{ a: { color: '#666' } }} mx="auto" mt="xl">
        <a href="https://github.com/adamdevigili/thundy" target="_blank">
          <BrandGithub />
        </a>
      </Text>
    </>
  );
}

About.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
