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

const comparisonColors = {
  0: '#21A321', // Green
  1: '#2D882D',
  2: '#2D582D',
  3: '#722D2D',
  4: '#9C2A2A',
  5: '#CE1B1B', // Red
};

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

export interface MissileAPI {
  origin: string;
  name: string;
  guidanceType: string;
  warmUpTime: string;
  workTime: string;
  loadFactorMax: string;
  machMax: string;
  burnTime: string;
  sustainerBurnTime: string;
  rawURL: string;
}

export interface MissileRow {
  origin: string;
  name: string;
  guidanceType: string;
  warmUpTime: string;
  workTime: string;
  loadFactorMax: string;
  machMax: string;
  burnTime: string;
  sustainerBurnTime: string;
  rawURL: string;
}

export interface Comparable {
  value: string;
  color?: string;
  higherBetter?: boolean;
}

export interface MissileRowComparable {
  origin: string;
  name: string;
  guidanceType: string;

  // Comparable values
  warmUpTime?: Comparable;
  workTime?: Comparable;
  loadFactorMax?: Comparable;
  machMax?: Comparable;
  burnTime?: Comparable;
  sustainerBurnTime?: Comparable;
}

// interface MissileTableProps {
//   data: MissileRow[];
// }

export interface MissileTableProps {
  missiles: MissileAPI[];
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

function getFlagEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function convertMissileAPIToRow(m: MissileAPI): MissileRow {
  // console.log('here\n', JSON.stringify(m));

  // const flag = flags[m.mesh.substring(0, 2).toUpperCase()];
  // console.log(flag.unicode)

  // const flag = getFlagEmoji(m.mesh.substring(0, 2));

  const mRow: MissileRow = {
    origin: getFlagEmoji(m.origin),
    name: m.name,
    guidanceType: m.guidanceType,
    loadFactorMax: m.loadFactorMax,
    machMax: m.machMax,
    warmUpTime: m.warmUpTime,
    workTime: m.workTime,
    burnTime: m.burnTime,
    sustainerBurnTime: m.sustainerBurnTime,
    rawURL: m.rawURL,
  };

  if (mRow.sustainerBurnTime === '') {
    mRow.sustainerBurnTime = '-';
  }

  // console.log('there', mRow);

  return mRow;
}

function convertMissilesToRows(missiles: MissileAPI[]): MissileRow[] {
  // console.log('here\n', mp);

  // const mRow: MissileRow[] = [
  //   {
  //     name: m.rawData.mesh,
  //     loadFactorMax: getLoadFactor(m),
  //     // warmUpTime: 10,
  //   },
  // ];

  // console.log('there', mRow);
  return missiles.map((m) => convertMissileAPIToRow(m));
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

// function compareMissileRowComparable(a: MissileRowComparable, b: MissileRowComparable, sortBy: keyof MissileRow) {
//   if (a[sortBy].toLowerCase() < b.value.toLowerCase()) {
//     return -1;
//   }
//   if (a.value.toLowerCase() > b.value.toLowerCase()) {
//     return 1;
//   }
//   return 0;
// }

// function sortDataComparable(
//   data: MissileRowComparable[],
//   payload: { sortBy: keyof MissileRow; reversed: boolean; search: string }
// ) {
//   if (!payload.sortBy) {
//     return filterDataComparable(data, payload.search);
//   }

//   return filterDataComparable(
//     [...data].sort(compareComparable),
//     payload.search
//   );
// }

// function filterDataComparable(data: MissileRowComparable[], search: string) {
//   const keys = Object.keys(data[0]);
//   const query = search.toLowerCase().trim();
//   return data.filter((item) => keys.some((key) => item[key].toLowerCase().includes(query)));
// }

export interface ComparableWithIndex {
  comparable: Comparable;
  index: number;
}

// Color the fields of the provided rows, indicating the "best" as green, the "worst" as red, and apply a gradient
// for the values in between
function convertMissileRowToMissileRowComparable(data: MissileRow[]): MissileRowComparable[] {
  let ret: MissileRowComparable[] = [];

  // build map of type -> array of object with value and index
  let compDict: { [key: string]: ComparableWithIndex[] } = {};

  if (data.length != 0) {
    let i = 0;
    for (var row of data) {
      // console.log(row);
      let mrCmp: MissileRowComparable = {
        origin: row.origin,
        name: row.name,
        guidanceType: row.guidanceType,
      };

      ret.push(mrCmp);

      for (const [k, v] of Object.entries(row)) {
        // Non-comparable fields
        if (!['origin', 'name', 'guidanceType'].includes(k)) {
          let cmp: ComparableWithIndex = {
            index: i,
            comparable: {
              higherBetter: true,
              value: v,
            },
          };

          if (['warmUpTime', 'workTime'].includes(k)) {
            cmp.comparable.higherBetter = false;
          }

          // console.log('compDict', compDict);

          if (k in compDict) {
            compDict[k].push(cmp);
          } else {
            compDict[k] = [cmp];
          }
        }
      }
      i++;
    }

    // Sort the arrays for all the fields, apply the color
    for (const [k, v] of Object.entries(compDict)) {
      // console.log('k', k, 'v', v);
      v.sort((a, b) => {
        if (!v[0].comparable.higherBetter) {
          return a.comparable.value.localeCompare(b.comparable.value, 'en', { numeric: true });
        }
        return b.comparable.value.localeCompare(a.comparable.value, 'en', { numeric: true });
      });

      // Iterate over the sorted fields, populate the color based on the location (for now), and update the returning
      // array with this new field with the color supplied
      v.forEach((field, i) => {
        if (data.length > 1 && field.comparable.value !== '-') {
          // if (!field.comparable.higherBetter) {
          //   field.comparable.color = comparisonColors[i];
          // } else {
          //   field.comparable.color = comparisonColors[Object.keys(comparisonColors).length - i - 1];
          // }

          field.comparable.color = comparisonColors[i];
        } else {
          field.comparable.color = 'none';
        }
        ret[field.index][k] = field.comparable;
      });
    }
  }

  console.log(compDict);

  //

  return ret;
}

export function MissileTable({ missiles }: MissileTableProps) {
  const data = convertMissilesToRows(missiles);
  const { classes, cx } = useStyles();

  const [search, setSearch] = useState('');

  // Main table
  const [sortedData, setSortedData] = useState(data);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [sortBy, setSortBy] = useState<keyof MissileRow>(null);

  // Compare table
  const [sortedDataCompare, setSortedDataCompare] = useState([]);
  const [reverseSortDirectionCompare, setReverseSortDirectionCompare] = useState(false);
  const [sortByCompare, setSortByCompare] = useState<keyof MissileRow>(null);

  const [toCompare, toCompareHandlers] = useListState<MissileRow>([]);
  const [toCompareComparable, toCompareComparableHandlers] = useListState<MissileRowComparable>([]);

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
        <td>{row.burnTime}</td>
        <td>{row.sustainerBurnTime}</td>
      </tr>
    );
  });

  const comparingColored = convertMissileRowToMissileRowComparable(toCompare);

  const comparing = toCompare.map((row, i) => {
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
          </UnstyledButton>
        </td>
        <td>
          <Link href={nameLink}>
            <Anchor<'a'> size="sm">{row.name}</Anchor>
          </Link>
        </td>
        <td>{row.origin}</td>
        <td>{row.guidanceType}</td>
        <td style={{ backgroundColor: comparingColored[i].loadFactorMax.color }}>
          {row.loadFactorMax}
        </td>
        <td style={{ backgroundColor: comparingColored[i].machMax.color }}>{row.machMax}</td>
        <td style={{ backgroundColor: comparingColored[i].warmUpTime.color }}>{row.warmUpTime}</td>
        <td style={{ backgroundColor: comparingColored[i].workTime.color }}>{row.workTime}</td>
        <td style={{ backgroundColor: comparingColored[i].burnTime.color }}>{row.burnTime}</td>
        <td style={{ backgroundColor: comparingColored[i].sustainerBurnTime.color }}>
          {row.sustainerBurnTime}
        </td>
      </tr>
    );
  });

  // 1A1B1E

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
      <Title my="sm">Missiles</Title>
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
                sorted={sortBy === 'burnTime'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('burnTime')}
                description="How long the missile's rocket motor will burn for"
              >
                BurnTime(s)
              </Th>
              <Th
                sorted={sortBy === 'sustainerBurnTime'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('sustainerBurnTime')}
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
                    sorted={sortByCompare === 'burnTime'}
                    reversed={reverseSortDirectionCompare}
                    onSort={() => setSortingCompare('burnTime')}
                    description="How long the missile's rocket motor will burn for"
                  >
                    BurnTime(s)
                  </Th>
                  <Th
                    sorted={sortByCompare === 'sustainerBurnTime'}
                    reversed={reverseSortDirectionCompare}
                    onSort={() => setSortingCompare('sustainerBurnTime')}
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
