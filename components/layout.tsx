/* eslint-disable linebreak-style */
// import Navbar from './navbar';
// import Footer from './footer';

import { Button, Grid } from '@mantine/core';
import { useScrollLock } from '@mantine/hooks';
import { useEffect } from 'react';
import { NavbarMinimalColored } from './navbar/navbar';
import { useRouter } from 'next/router';

export default function Layout({ children }) {
  const [scrollLocked, setScrollLocked] = useScrollLock(false);

  const router = useRouter();
  return (
    <>
      <Grid gutter="sm">
        <Grid.Col span={1}>
          <NavbarMinimalColored path={router.route} />
        </Grid.Col>
        <Grid.Col span={11}>
          <main>{children}</main>
        </Grid.Col>
      </Grid>
    </>
  );
}
