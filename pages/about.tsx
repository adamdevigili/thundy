/* eslint-disable linebreak-style */
import { Title, Text, Stack } from '@mantine/core';
import { ReactElement } from 'react';
import { BrandGithub } from 'tabler-icons-react';
import Layout from '../components/layout';

export default function About() {
  return (
    <>
      <Stack align="center">
        <Title sx={{ fontSize: 100, fontWeight: 900, letterSpacing: -2 }} align="center" mt={100}>
          About
        </Title>
        <Text>
          {' '}
          Data provided by{' '}
          <a href="https://github.com/gszabi99/War-Thunder-Datamine" target="_blank">
            gszabi99/War-Thunder-Datamine
          </a>
        </Text>
        <Text color="dimmed" align="center" size="xl" sx={{}} mx="auto" mt="xl">
          v0.1.0
        </Text>
        <Text
          color="dimmed"
          align="center"
          size="lg"
          sx={{ a: { color: '#666' } }}
          mx="auto"
          mt="xl"
        >
          <a href="https://github.com/adamdevigili/thundy" target="_blank">
            <BrandGithub />
          </a>
        </Text>
      </Stack>
    </>
  );
}

About.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
