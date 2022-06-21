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
} from '@mantine/core';
import { Selector, ChevronDown, ChevronUp, Search } from 'tabler-icons-react';
import { US } from 'country-flag-icons/string/3x2';
import { Sensor } from '../../data/sensors';
import Link from 'next/link';
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

export interface SensorRow {
  // origin: string;
  name: string;
  clearName: string;
  type: string;
  range: string;
  specialRange: string;
  // workTime: string;
  // loadFactorMax: string;
  // machMax: string;
  // timeFire: string;
  // sustainerTimeFire: string;
}

// interface MissileTableProps {
//   data: MissileRow[];
// }

export interface SensorTableProps {
  sensors: Sensor[];
}

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
  description: string;
}

// function getCustomPropertyNumber(m: Sensor, k: string): number {
//   for (const f of m.rocket) {
//     if (f.hasOwnProperty(k)) {
//       return f[k];
//     }
//   }

//   return -1;
// }

// function getCustomPropertyString(m: Sensor, k: string): string {
//   // console.log('getLoadFactor', m)
//   for (const f of m.rocket) {
//     if (f.hasOwnProperty(k)) {
//       return f[k];
//     }
//   }

//   return '';
// }

// export function GetCustomPropertyString(m: Sensor, k: string): string {
//   // console.log('getLoadFactor', m)
//   for (const f of m.rocket) {
//     if (f.hasOwnProperty(k)) {
//       return f[k];
//     }
//   }

//   return undefined;
// }

// export function GetGuidance(m: Sensor): Guidance {
//   // console.log('missile', m);
//   // console.log(typeof m.rocket);
//   if (!Array.isArray(m.rocket)) {
//     // console.log('not a missile', m.mesh);
//     return undefined;
//   }

//   // console.log(m);

//   // console.log('getLoadFactor', m)
//   for (const f of m.rocket) {
//     // console.log(f);
//     if (f.hasOwnProperty('guidance')) {
//       if (f.guidance.hasOwnProperty('warmUpTime')) {
//         // console.log('found AAM', m.mesh);
//         return f.guidance as Guidance;
//       }
//     }
//   }

//   return undefined;
// }

function getFlagEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function getRadarRanges(s: Sensor): string[] {
  if (s.transivers.hasOwnProperty('common')) {
    return [mToKM(s.transivers.common.range).toString(), '-'];
  }

  if (s.transivers.hasOwnProperty('search')) {
    return [mToKM(s.transivers.search.range).toString(), '-'];
  }

  if (s.transivers.hasOwnProperty('track')) {
    return [mToKM(s.transivers.track.range).toString(), '-'];
  }

  if (s.transivers.hasOwnProperty('GTM')) {
    return [mToKM(s.transivers.GTM.range).toString(), '-'];
  }

  if (s.transivers.hasOwnProperty('ATM')) {
    return [mToKM(s.transivers.ATM.range).toString(), '-'];
  }

  if (s.transivers.hasOwnProperty('ranging')) {
    return [mToKM(s.transivers.ranging.range).toString(), '-'];
  }

  if (s.transivers.hasOwnProperty('radar')) {
    return [mToKM(s.transivers.radar.range).toString(), '-'];
  }

  if (s.transivers.hasOwnProperty('radarTrack')) {
    return [mToKM(s.transivers.radarTrack.range).toString(), '-'];
  }

  if (s.transivers.hasOwnProperty('irstTrack')) {
    return [mToKM(s.transivers.irstTrack.range).toString(), '-'];
  }

  if (s.transivers.hasOwnProperty('IRST')) {
    return [mToKM(s.transivers.IRST.range).toString(), '-'];
  }

  if (s.transivers.hasOwnProperty('pulse')) {
    let range = mToKM(s.transivers.pulse.range).toString();
    if (s.transivers.hasOwnProperty('pulseDoppler')) {
      return [range, mToKM(s.transivers.pulseDoppler.range).toString()];
    }

    if (s.transivers.hasOwnProperty('MTI')) {
      return [range, mToKM(s.transivers.MTI.range).toString()];
    }

    return [range, '-'];
  }

  return ['-', '-'];
}

function mToKM(s: number): number {
  return s / 1000;
}

function convertSensorToRow(s: Sensor): SensorRow {
  // console.log('here\n', JSON.stringify(m));

  // const flag = flags[m.mesh.substring(0, 2).toUpperCase()];
  // console.log(flag.unicode)

  // const flag = getFlagEmoji(m.mesh.substring(0, 2));

  // console.log('---');
  // console.log(s.name);
  // console.log(s.transivers);
  // console.log('===');

  const radarRanges = getRadarRanges(s);
  const sRow: SensorRow = {
    // origin: flag,
    name: s.name,
    clearName: s.clearName,
    type: s.type,
    range: radarRanges[0],
    specialRange: radarRanges[1],
    // range: s.range.toString(),
    // guidanceType: getCustomPropertyString(m, 'guidanceType'),
    // loadFactorMax: getCustomPropertyNumber(m, 'loadFactorMax').toString(),
    // machMax: getCustomPropertyNumber(m, 'machMax').toString(),
    // warmUpTime: GetGuidance(m).warmUpTime.toString(),
    // workTime: GetGuidance(m).workTime.toString(),
    // timeFire: getCustomPropertyNumber(m, 'timeFire').toString(),
    // sustainerTimeFire: getCustomPropertyNumber(m, 'timeFire1').toString(),
  };

  // if (mRow.sustainerTimeFire === '-1') {
  //   mRow.sustainerTimeFire = '-';
  // }

  // console.log('there', mRow);

  return sRow;
}

function convertSensorsToRows(sensors: Sensor[]): SensorRow[] {
  // console.log('here\n', mp);

  // const mRow: MissileRow[] = [
  //   {
  //     name: m.rawData.mesh,
  //     loadFactorMax: getLoadFactor(m),
  //     // warmUpTime: 10,
  //   },
  // ];

  // console.log('there', mRow);
  // return sensors.map((m) => convertSensorToRow(m));
  return sensors.filter((m) => m.type === 'radar').map((m) => convertSensorToRow(m));
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

function filterData(data: SensorRow[], search: string) {
  const keys = Object.keys(data[0]);
  const query = search.toLowerCase().trim();
  return data.filter((item) => keys.some((key) => item[key].toLowerCase().includes(query)));
}

function sortData(
  data: SensorRow[],
  payload: { sortBy: keyof SensorRow; reversed: boolean; search: string }
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

export function SensorTable({ sensors: sensors }: SensorTableProps) {
  // console.log("Missile Table", missiles)
  // const md: MissileData = {
  //   missiles: missileData,
  // }
  const data = convertSensorsToRows(sensors);
  const { classes, cx } = useStyles();

  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState<keyof SensorRow>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const [scrolled, setScrolled] = useState(false);

  const setSorting = (field: keyof SensorRow) => {
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

  const rows = sortedData.map((row) => {
    const nameLink = `/radars/${row.name}`;
    return (
      <tr key={row.name}>
        <td>
          <Link href={nameLink}>
            <Anchor<'a'> size="sm">{row.name}</Anchor>
          </Link>
        </td>
        <td>{row.type}</td>
        <td>{row.range}</td>
        <td>{row.specialRange}</td>
        {/* <td>{row.loadFactorMax}</td>
        <td>{row.machMax}</td>
        <td>{row.warmUpTime}</td>
        <td>{row.workTime}</td>
        <td>{row.timeFire}</td>
        <td>{row.sustainerTimeFire}</td> */}
      </tr>
    );
  });

  return (
    <>
      <Title my="sm"> Radars </Title>
      <ScrollArea sx={{ height: 600 }}>
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
        <Table
          horizontalSpacing="md"
          verticalSpacing="xs"
          sx={{ tableLayout: 'auto', minWidth: 200 }}
        >
          <thead className={cx(classes.header)}>
            <tr>
              <Th
                sorted={sortBy === 'name'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('name')}
                description="Radar name. Click to view raw data"
              >
                Name
              </Th>
              <Th
                sorted={sortBy === 'type'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('type')}
                description="Radar type"
              >
                Type
              </Th>
              <Th
                sorted={sortBy === 'range'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('range')}
                description="Radar range"
              >
                Range (km)
              </Th>
              <Th
                sorted={sortBy === 'specialRange'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('specialRange')}
                description="Special radar range (Doppler, MTI)"
              >
                Range* (km)
              </Th>
              {/* <Th
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
              </Th> */}
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
