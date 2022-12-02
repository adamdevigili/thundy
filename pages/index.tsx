/* eslint-disable linebreak-style */

import { GetStaticProps, InferGetStaticPropsType } from 'next';
import {
  Title,
  Text,
  Anchor,
  Center,
  HoverCard,
  Group,
  Flex,
  Button,
  Tooltip,
  Container,
  ActionIcon,
} from '@mantine/core';
import type { ReactElement } from 'react';
import { MissileTable } from '../components/tables/MissileTable';
import { Missile } from '../data/missile';
import { NavbarMinimalColored } from '../components/navbar/navbar';
// import mockData from '../data/mock_data.json';
import Layout from '../components/layout';
import { HomeNavButton, HomeNavButtonProps } from '../components/home/navButton';
import Link from 'next/link';
import { title } from 'process';
import { Plane } from 'tabler-icons-react';
// import NestedLayout from '../components/nested-layout';

export default function Home() {
  return (
    <>
      <Container>
        <Title sx={{ fontSize: 100, fontWeight: 900, letterSpacing: -2 }} align="center" mt={100}>
          Thundy.xyz
        </Title>
        <Text color="dimmed" align="center" size="lg" sx={{ maxWidth: 580 }} mx="auto" mt="xl">
          Datamined tables for War Thunder
        </Text>

        <Text align="center" size="xl" sx={{ a: { color: '#666' } }} mx="auto" mt="xl">
          <div>
            <Link href="/missiles">
              <a>Missiles</a>
            </Link>
          </div>
          <div>
            <Tooltip.Floating label="Coming soon™">
              <Text>
                <span style={{ textDecoration: 'line-through' }}>Radars</span>
              </Text>
            </Tooltip.Floating>
          </div>
          <div>
            <Tooltip.Floating label="Coming soon™">
              <Text>
                <span style={{ textDecoration: 'line-through' }}>Aircraft</span>
              </Text>
            </Tooltip.Floating>
          </div>
          <div>
            <Tooltip.Floating label="Coming soon™">
              <Text>
                <span style={{ textDecoration: 'line-through' }}>Ground Vehicles</span>
              </Text>
            </Tooltip.Floating>
          </div>
        </Text>
      </Container>
    </>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

// export default function HomePage() {
//   return (
//     <>
//       {/* <Title sx={{ fontSize: 100, fontWeight: 900, letterSpacing: -2 }} align="center" mt={100}>
//         Welcome to{' '}
//         <Text inherit variant="gradient" component="span">
//           Mantine
//         </Text>
//       </Title>
//       <Text color="dimmed" align="center" size="lg" sx={{ maxWidth: 580 }} mx="auto" mt="xl">
//         This starter Next.js projects includes a minimal setup for server side rendering, if you
//         want to learn more on Mantine + Next.js integration follow{' '}
//         <Anchor href="https://mantine.dev/theming/next/" size="lg">
//           this guide
//         </Anchor>
//         . To get started edit index.tsx file.
//       </Text> */}
//       {/* <ColorSchemeToggle /> */}
//     </>
//   );
// }
