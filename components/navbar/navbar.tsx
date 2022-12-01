/* eslint-disable max-len */
/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import { Navbar, Center, Tooltip, UnstyledButton, createStyles, Group } from '@mantine/core';
import {
  Icon as TablerIcon,
  Home2,
  Tank,
  Rocket,
  Plane,
  Radar,
  InfoSquare,
  Router,
} from 'tabler-icons-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
// import { MantineLogoSmall } from '../../shared/MantineLogo';

const useStyles = createStyles((theme) => ({
  link: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.white,
    opacity: 0.85,

    '&:hover': {
      opacity: 1,
      backgroundColor: theme.colors[theme.primaryColor][9],
    },
  },

  linkHome: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.md,
    display: 'flex',
    alignItems: 'top',
    justifyContent: 'center',
    color: theme.white,
    opacity: 0.85,

    '&:hover': {
      opacity: 1,
      backgroundColor: theme.colors[theme.primaryColor][9],
    },

    alignSelf: 'flex-start',
    left: 0,
    top: 0,
    position: 'absolute',
  },

  active: {
    opacity: 1,
    '&, &:hover': {
      backgroundColor: theme.colors[theme.primaryColor][8],
    },
  },
}));

interface NavbarLinkProps {
  icon: TablerIcon;
  label: string;
  path: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, path, onClick }: NavbarLinkProps) {
  const { classes, cx } = useStyles();
  // const router = useRouter();

  // const [active, setActive] = useState(false);

  // console.log('navbar router', router.pathname);

  // if (router.pathname === path) {
  //   setActive(true);
  // }

  return (
    <Tooltip label={label} position="right" withArrow transitionDuration={200}>
      <Link href={path} passHref>
        <UnstyledButton
          onClick={onClick}
          className={cx(classes.link, { [classes.active]: active })}
        >
          <Icon />
        </UnstyledButton>
      </Link>
    </Tooltip>
  );
}

function NavbarLinkHome({ icon: Icon, label, active, path, onClick }: NavbarLinkProps) {
  const { classes, cx } = useStyles();

  return (
    <Tooltip label={label} position="right" withArrow transitionDuration={200}>
      <Link href={path} passHref>
        <UnstyledButton
          onClick={onClick}
          className={cx(classes.linkHome, { [classes.active]: active })}
        >
          <Icon />
        </UnstyledButton>
      </Link>
    </Tooltip>
  );
}

const routes = [
  { icon: Home2, label: 'Home', path: '/' },
  { icon: Plane, label: 'Aircraft', path: '/aircraft' },
  { icon: Tank, label: 'Ground Vehicles', path: '/ground' },
  { icon: Rocket, label: 'Missiles', path: '/missiles' },
  { icon: Radar, label: 'Radars', path: '/radars' },
  { icon: InfoSquare, label: 'About', path: '/about' },
];

const useNavbarStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: theme.colors[theme.primaryColor][6],
  },
}));

export function NavbarMinimalColored({ path }) {
  const router = useRouter();
  const { classes } = useNavbarStyles();

  // const HomeLink: NavbarLinkProps = {
  //   icon: Home2,
  //   label: 'Home',
  //   path: '/',
  // };

  // const HLink = (
  //   <NavbarLink {...HomeLink} key={HomeLink.label} onClick={() => setActive(0)} active={true} />
  // );

  // const AboutLink: NavbarLinkProps = {
  //   icon: InfoSquare,
  //   label: 'About',
  //   path: '/about',
  // };

  let links = routes.map((link, index) => (
    <NavbarLink {...link} key={link.label} active={router.pathname === link.path} />
  ));

  // links = [
  //   <NavbarLinkHome
  //     {...HomeLink}
  //     key={HomeLink.label}
  //     onClick={() => setActive(0)}
  //     active={0 === active}
  //   />,
  //   ...links,
  // ];

  // console.log(links);
  // console.log(active);
  return (
    <Navbar width={{ base: 60 }} fixed={true} p="sm" className={classes.navbar}>
      {/* <Center>
        <NavbarLink icon={Home2} label="Home" path="/" />
      </Center> */}
      <Center>
        <Navbar.Section grow mt={30}>
          <Group align="center" spacing={0}>
            {links}
          </Group>
        </Navbar.Section>
      </Center>
      {/* <Center>
        <Navbar.Section>
          <NavbarLink icon={InfoSquare} label="About" path="/about" />
        </Navbar.Section>
      </Center> */}
      {/* <Navbar.Section>
        <Group direction="column" align="center" spacing={0}>
          <NavbarLink icon={SwitchHorizontal} label="Change account" />
          <NavbarLink icon={Logout} label="Logout" />
        </Group>
      </Navbar.Section> */}
    </Navbar>
  );
}
