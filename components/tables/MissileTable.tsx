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
  Tooltip,
  Anchor,
  List,
  Checkbox,
  Button,
  ListItem,
} from '@mantine/core';
import {
  Selector,
  ChevronDown,
  ChevronUp,
  Search,
  Plus,
  CodePlus,
  SquarePlus,
  SquareMinus,
} from 'tabler-icons-react';
import { US } from 'country-flag-icons/string/3x2';
import { Guidance, Missile } from '../../data/missile';
import Link from 'next/link';
import { useListState } from '@mantine/hooks';
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

  search: {
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
  guidanceType: string;
  warmUpTime: string;
  workTime: string;
  loadFactorMax: string;
  machMax: string;
  timeFire: string;
  sustainerTimeFire: string;
}

// interface MissileTableProps {
//   data: MissileRow[];
// }

export interface MissileTableProps {
  missiles: Missile[];
}

interface ThCompareProps {
  description: string;
}

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
  description: string;
}

function getCustomPropertyNumber(m: Missile, k: string): number {
  for (const f of m.rocket) {
    if (f.hasOwnProperty(k)) {
      return f[k];
    }
  }

  return -1;
}

function getCustomPropertyString(m: Missile, k: string): string {
  // console.log('getLoadFactor', m)
  for (const f of m.rocket) {
    if (f.hasOwnProperty(k)) {
      return f[k];
    }
  }

  return '';
}

export function GetCustomPropertyString(m: Missile, k: string): string {
  // console.log('getLoadFactor', m)
  for (const f of m.rocket) {
    if (f.hasOwnProperty(k)) {
      return f[k];
    }
  }

  return undefined;
}

export function GetGuidance(m: Missile): Guidance {
  // console.log('missile', m);
  // console.log(typeof m.rocket);
  if (!Array.isArray(m.rocket)) {
    // console.log('not a missile', m.mesh);
    return undefined;
  }

  // console.log(m);

  // console.log('getLoadFactor', m)
  for (const f of m.rocket) {
    // console.log(f);
    if (f.hasOwnProperty('guidance')) {
      if (f.guidance.hasOwnProperty('warmUpTime')) {
        // console.log('found AAM', m.mesh);
        return f.guidance as Guidance;
      }
    }
  }

  return undefined;
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
    name: m.name,
    guidanceType: getCustomPropertyString(m, 'guidanceType'),
    loadFactorMax: getCustomPropertyNumber(m, 'loadFactorMax').toString(),
    machMax: getCustomPropertyNumber(m, 'machMax').toString(),
    warmUpTime: GetGuidance(m).warmUpTime.toString(),
    workTime: GetGuidance(m).workTime.toString(),
    timeFire: getCustomPropertyNumber(m, 'timeFire').toString(),
    sustainerTimeFire: getCustomPropertyNumber(m, 'timeFire1').toString(),
  };

  if (mRow.sustainerTimeFire === '-1') {
    mRow.sustainerTimeFire = '-';
  }

  // console.log('there', mRow);

  return mRow;
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

function Th({ children, reversed, sorted, onSort, description }: ThProps) {
  const { classes } = useStyles();
  const Icon = sorted ? (reversed ? ChevronUp : ChevronDown) : Selector;
  return (
    <th className={classes.th}>
      <Tooltip label={description} position="right" withArrow transitionDuration={200}>
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
      </Tooltip>
    </th>
  );
}

function ThCompare({ description }: ThCompareProps) {
  const { classes } = useStyles();
  // const Icon = sorted ? (reversed ? ChevronUp : ChevronDown) : Selector;
  return (
    <th className={classes.th}>
      <Tooltip label={description} position="right" transitionDuration={200}>
        <UnstyledButton className={classes.control}>
          {/* <Group>
            <Text weight={500} size="sm">
            </Text>
            <Center className={classes.icon}><Icon size={14} /></Center>
          </Group> */}
        </UnstyledButton>
      </Tooltip>
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
        return b[payload.sortBy].localeCompare(a[payload.sortBy], 'en', { numeric: true });
      }

      return a[payload.sortBy].localeCompare(b[payload.sortBy], 'en', { numeric: true });
    }),
    payload.search
  );
}

export function MissileTable({ missiles }: MissileTableProps) {
  // console.log("Missile Table", missiles)
  // const md: MissileData = {
  //   missiles: missileData,
  // }
  const data = convertMissilesToRows(missiles);
  const { classes, cx } = useStyles();

  const [search, setSearch] = useState('');

  const [sortedData, setSortedData] = useState(data);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [sortBy, setSortBy] = useState<keyof MissileRow>(null);

  const [sortedDataCompare, setSortedDataCompare] = useState([]);
  const [reverseSortDirectionCompare, setReverseSortDirectionCompare] = useState(false);
  const [sortByCompare, setSortByCompare] = useState<keyof MissileRow>(null);

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

  const handleCompareAdd = (event: React.MouseEventHandler<HTMLInputElement>) => {
    console.log('added');
  };

  const [toCompare, toCompareHandlers] = useListState<MissileRow>([]);

  const setSortingCompare = (field: keyof MissileRow) => {
    const reversed = field === sortByCompare ? !reverseSortDirectionCompare : false;
    setReverseSortDirectionCompare(reversed);
    setSortByCompare(field);
    toCompareHandlers.setState(sortData(toCompare, { sortBy: field, reversed, search }));
  };

  const rows = sortedData.map((row) => {
    const nameLink = `/missiles/${row.name}`;
    return (
      <tr key={row.name}>
        <td>
          <UnstyledButton
            onClick={(event) => {
              let i = toCompare.indexOf(row);
              if (i < 0) {
                toCompareHandlers.append(row);
              } else {
                toCompareHandlers.remove(i);
              }
            }}
          >
            {toCompare.indexOf(row) < 0 ? <SquarePlus /> : <SquareMinus />}
            {/* <Checkbox
              onChange={(event) => {
                let i = toCompare.indexOf(row.name);
                if (i >= 0) {
                  toCompareHandlers.remove(i);
                } else {
                  toCompareHandlers.append(row.name);
                }
              }}
            /> */}
          </UnstyledButton>
        </td>
        <td>
          <Link href={nameLink}>
            <Anchor<'a'> size="sm">{row.name}</Anchor>
          </Link>
        </td>
        <td>{row.origin}</td>
        <td>{row.guidanceType}</td>
        <td>{row.loadFactorMax}</td>
        <td>{row.machMax}</td>
        <td>{row.warmUpTime}</td>
        <td>{row.workTime}</td>
        <td>{row.timeFire}</td>
        <td>{row.sustainerTimeFire}</td>
      </tr>
    );
  });

  const comparing = toCompare.map((row) => {
    const nameLink = `/missiles/${row.name}`;
    return (
      <tr key={row.name}>
        <td>
          <UnstyledButton
            onClick={(event) => {
              let i = toCompare.indexOf(row);
              if (i >= 0) {
                toCompareHandlers.remove(i);
              } else {
                toCompareHandlers.append(row);
              }
            }}
          >
            <SquareMinus />
            {/* <Checkbox
              onChange={(event) => {
                let i = toCompare.indexOf(row.name);
                if (i >= 0) {
                  toCompareHandlers.remove(i);
                } else {
                  toCompareHandlers.append(row.name);
                }
              }}
            /> */}
          </UnstyledButton>
        </td>
        <td>
          <Link href={nameLink}>
            <Anchor<'a'> size="sm">{row.name}</Anchor>
          </Link>
        </td>
        <td>{row.origin}</td>
        <td>{row.guidanceType}</td>
        <td>{row.loadFactorMax}</td>
        <td>{row.machMax}</td>
        <td>{row.warmUpTime}</td>
        <td>{row.workTime}</td>
        <td>{row.timeFire}</td>
        <td>{row.sustainerTimeFire}</td>
      </tr>
    );
  });

  // const comparing = toCompare.map((value, index) => (
  //   <>
  //     <ListItem>
  //       <UnstyledButton
  //         onClick={(event) => {
  //           let i = toCompare.indexOf(value);
  //           if (i >= 0) {
  //             toCompareHandlers.remove(i);
  //           } else {
  //             toCompareHandlers.append(value);
  //           }
  //         }}
  //       >
  //         <SquareMinus />
  //       </UnstyledButton>
  //       {value}
  //     </ListItem>
  //   </>
  // <List.Item>

  // </List.Item>
  // ));

  return (
    <>
      <Title my="sm"> Missiles </Title>
      <TextInput
        placeholder="Search by any field"
        my="md"
        // mt="md"
        icon={<Search size={14} />}
        size="sm"
        value={search}
        onChange={handleSearchChange}
        className={cx(classes.search)}
      />
      <ScrollArea sx={{ height: 600 }}>
        <Table
          horizontalSpacing="md"
          verticalSpacing="xs"
          sx={{ tableLayout: 'auto', minWidth: 200 }}
        >
          <thead className={cx(classes.header)}>
            <tr>
              <ThCompare description="Add to compare" />
              <Th
                sorted={sortBy === 'name'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('name')}
                description="Missile name. Click to view raw data"
              >
                Name
              </Th>
              <Th
                sorted={sortBy === 'origin'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('origin')}
                description="Country of origin"
              >
                Origin
              </Th>
              <Th
                sorted={sortBy === 'guidanceType'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('guidanceType')}
                description="The type of guidance the missile uses"
              >
                GuidanceType
              </Th>
              <Th
                sorted={sortBy === 'loadFactorMax'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('loadFactorMax')}
                description="Maximum G forces the missile can pull in-flight"
              >
                LoadFactor(g)
              </Th>
              <Th
                sorted={sortBy === 'machMax'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('machMax')}
                description="Maximum speed achievable by missile"
              >
                MachMax
              </Th>
              <Th
                sorted={sortBy === 'warmUpTime'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('warmUpTime')}
                description='How long it takes a missile to "spool up" and become ready to fire'
              >
                WarmUpTime(s)
              </Th>
              <Th
                sorted={sortBy === 'workTime'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('workTime')}
                description="How long the missile searches for a target before deactivating"
              >
                WorkTime(s)
              </Th>
              <Th
                sorted={sortBy === 'timeFire'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('timeFire')}
                description="How long the missile's rocket motor will burn for"
              >
                BurnTime(s)
              </Th>
              <Th
                sorted={sortBy === 'sustainerTimeFire'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('sustainerTimeFire')}
                description="How long the missile's sustainer (secondary) rocket motor will burn for"
              >
                SustainerBurnTime(s)
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
      <div>
        <Title my="sm">Compare</Title>
        {toCompare.length > 0 ? (
          <ScrollArea sx={{ height: 600 }}>
            <Table
              horizontalSpacing="md"
              verticalSpacing="xs"
              sx={{ tableLayout: 'auto', minWidth: 200 }}
            >
              <thead className={cx(classes.header)}>
                <tr>
                  <ThCompare description="Remove from compare" />
                  <Th
                    sorted={sortByCompare === 'name'}
                    reversed={reverseSortDirectionCompare}
                    onSort={() => setSortingCompare('name')}
                    description="Missile name. Click to view raw data"
                  >
                    Name
                  </Th>
                  <Th
                    sorted={sortByCompare === 'origin'}
                    reversed={reverseSortDirectionCompare}
                    onSort={() => setSortingCompare('origin')}
                    description="Country of origin"
                  >
                    Origin
                  </Th>
                  <Th
                    sorted={sortByCompare === 'guidanceType'}
                    reversed={reverseSortDirectionCompare}
                    onSort={() => setSortingCompare('guidanceType')}
                    description="The type of guidance the missile uses"
                  >
                    GuidanceType
                  </Th>
                  <Th
                    sorted={sortByCompare === 'loadFactorMax'}
                    reversed={reverseSortDirectionCompare}
                    onSort={() => setSortingCompare('loadFactorMax')}
                    description="Maximum G forces the missile can pull in-flight"
                  >
                    LoadFactor(g)
                  </Th>
                  <Th
                    sorted={sortByCompare === 'machMax'}
                    reversed={reverseSortDirectionCompare}
                    onSort={() => setSortingCompare('machMax')}
                    description="Maximum speed achievable by missile"
                  >
                    MachMax
                  </Th>
                  <Th
                    sorted={sortByCompare === 'warmUpTime'}
                    reversed={reverseSortDirectionCompare}
                    onSort={() => setSortingCompare('warmUpTime')}
                    description='How long it takes a missile to "spool up" and become ready to fire'
                  >
                    WarmUpTime(s)
                  </Th>
                  <Th
                    sorted={sortByCompare === 'workTime'}
                    reversed={reverseSortDirectionCompare}
                    onSort={() => setSortingCompare('workTime')}
                    description="How long the missile searches for a target before deactivating"
                  >
                    WorkTime(s)
                  </Th>
                  <Th
                    sorted={sortByCompare === 'timeFire'}
                    reversed={reverseSortDirectionCompare}
                    onSort={() => setSortingCompare('timeFire')}
                    description="How long the missile's rocket motor will burn for"
                  >
                    BurnTime(s)
                  </Th>
                  <Th
                    sorted={sortByCompare === 'sustainerTimeFire'}
                    reversed={reverseSortDirectionCompare}
                    onSort={() => setSortingCompare('sustainerTimeFire')}
                    description="How long the missile's sustainer (secondary) rocket motor will burn for"
                  >
                    SustainerBurnTime(s)
                  </Th>
                </tr>
              </thead>
              <tbody>{comparing}</tbody>
            </Table>
          </ScrollArea>
        ) : (
          <tr>
            <td>
              <Text weight={500} align="center">
                Add rows to compare
              </Text>
            </td>
          </tr>
        )}
        {/* <List>{comparing}</List> */}
      </div>
    </>
  );
}
