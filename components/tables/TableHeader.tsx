/* eslint-disable linebreak-style */

import React, { useState } from 'react';
import {
  createStyles,
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  Title,
} from '@mantine/core';
import { Selector, ChevronDown, ChevronUp, Search } from 'tabler-icons-react';
import { US } from 'country-flag-icons/string/3x2';
import { Guidance, Missile } from '../../data/missile';
// import flags from '../../data/flags.json';

const useStyles = createStyles((theme) => ({
  header: {
    position: 'sticky',
    top: 0,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    transition: 'box-shadow 150ms ease',

    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[2]
      }`,
    },
  },

  th: {
    padding: '0 !important',
  },

  control: {
    width: '100%',
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  icon: {
    width: 21,
    height: 21,
    borderRadius: 21,
  },
}));

export interface MissileRow {
  origin: string;
  name: string;
  warmUpTime: string;
  workTime: string;
  loadFactorMax: string;
  machMax: string;
  timeFire: string;
}

interface MissileTableProps {
  data: MissileRow[];
}

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
}

function getCustomPropertyNumber(m: Missile, k: string): number {
  for (const f of m.rocket) {
    if (f.hasOwnProperty(k)) {
      return f[k];
    }
  }

  return -1;
}

// function getCustomPropertyString(m: Missile, k: string): string {
//   // console.log('getLoadFactor', m)
//   for (const f of m.rocket) {
//     if (f.hasOwnProperty(k)) {
//       return f[k];
//     }
//   }

//   return -1;
// }

function getGuidance(m: Missile): Guidance {
  // console.log('getLoadFactor', m)
  for (const f of m.rocket) {
    if (f.hasOwnProperty('guidance')) {
      return f.guidance as Guidance;
    }
  }

  return null;
}

function getFlagEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function convertMissileToRow(m: Missile): MissileRow {
  // console.log('here\n', JSON.stringify(m));

  // const flag = flags[m.mesh.substring(0, 2).toUpperCase()];
  // console.log(flag.unicode)

  const flag = getFlagEmoji(m.mesh.substring(0, 2));

  const mRow: MissileRow = {
    origin: flag,
    name: m.mesh,
    loadFactorMax: getCustomPropertyNumber(m, 'loadFactorMax').toString(),
    machMax: getCustomPropertyNumber(m, 'machMax').toString(),
    warmUpTime: getGuidance(m).warmUpTime.toString(),
    workTime: getGuidance(m).workTime.toString(),
    timeFire: getCustomPropertyNumber(m, 'timeFire').toString(),
  };

  // console.log('there', mRow);

  return mRow;
}

export interface MissileProps {
  missiles: Missile[];
}

function convertMissilesToRows(missiles: Missile[]): MissileRow[] {
  // console.log('here\n', mp);

  // const mRow: MissileRow[] = [
  //   {
  //     name: m.rawData.mesh,
  //     loadFactorMax: getLoadFactor(m),
  //     // warmUpTime: 10,
  //   },
  // ];

  // console.log('there', mRow);
  return missiles.map((m) => convertMissileToRow(m));
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const { classes } = useStyles();
  const Icon = sorted ? (reversed ? ChevronUp : ChevronDown) : Selector;
  return (
    <th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group position="apart">
          <Text weight={500} size="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon size={14} />
          </Center>
        </Group>
      </UnstyledButton>
    </th>
  );
}

function filterData(data: MissileRow[], search: string) {
  const keys = Object.keys(data[0]);
  const query = search.toLowerCase().trim();
  return data.filter((item) => keys.some((key) => item[key].toLowerCase().includes(query)));
}

function sortData(
  data: MissileRow[],
  payload: { sortBy: keyof MissileRow; reversed: boolean; search: string }
) {
  if (!payload.sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[payload.sortBy].localeCompare(a[payload.sortBy]);
      }

      return a[payload.sortBy].localeCompare(b[payload.sortBy]);
    }),
    payload.search
  );
}

export function MissileTable({ missiles }: MissileProps) {
  // console.log("Missile Table", missiles)
  // const md: MissileData = {
  //   missiles: missileData,
  // }
  const data = convertMissilesToRows(missiles);
  const { classes, cx } = useStyles();

  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState<keyof MissileRow>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const [scrolled, setScrolled] = useState(false);

  const setSorting = (field: keyof MissileRow) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(sortData(data, { sortBy, reversed: reverseSortDirection, search: value }));
  };

  const rows = sortedData.map((row) => (
    <tr key={row.name}>
      <td>{row.origin}</td>
      <td>{row.name}</td>
      <td>{row.loadFactorMax}</td>
      <td>{row.machMax}</td>
      <td>{row.warmUpTime}</td>
      <td>{row.workTime}</td>
      <td>{row.timeFire}</td>
    </tr>
  ));

  return (
    <>
      <ScrollArea sx={{ height: 600 }}>
        <TextInput
          placeholder="Search by any field"
          my="md"
          // mt="md"
          icon={<Search size={14} />}
          size="sm"
          value={search}
          onChange={handleSearchChange}
          className={cx(classes.header)}
        />
        <Table
          horizontalSpacing="md"
          verticalSpacing="xs"
          sx={{ tableLayout: 'auto', minWidth: 200 }}
        >
          <thead className={cx(classes.header)}>
            <tr>
              <Th
                sorted={sortBy === 'origin'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('origin')}
              >
                Origin
              </Th>
              <Th
                sorted={sortBy === 'name'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('name')}
              >
                Name
              </Th>
              <Th
                sorted={sortBy === 'loadFactorMax'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('loadFactorMax')}
              >
                LoadFactor(g)
              </Th>
              <Th
                sorted={sortBy === 'machMax'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('machMax')}
              >
                MachMax
              </Th>
              <Th
                sorted={sortBy === 'warmUpTime'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('warmUpTime')}
              >
                WarmUpTime(s)
              </Th>
              <Th
                sorted={sortBy === 'workTime'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('workTime')}
              >
                WorkTime(s)
              </Th>
              <Th
                sorted={sortBy === 'timeFire'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('timeFire')}
              >
                BurnTime(s)
              </Th>
            </tr>
          </thead>
          <tbody>
            {rows.length > 0 ? (
              rows
            ) : (
              <tr>
                <td>
                  <Text weight={500} align="center">
                    Nothing found
                  </Text>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </ScrollArea>
    </>
  );
}
