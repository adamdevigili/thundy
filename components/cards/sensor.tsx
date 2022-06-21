import { Container, Modal, ScrollArea, Table } from '@mantine/core';
import { Sensor } from '../../data/sensors';
import { GetCustomPropertyString, GetSound } from '../../lib/missiles';

export function SensorCard({ sensorProps }) {
  const m = sensorProps.sensor as Sensor;
  return (
    <ScrollArea style={{ height: 1000 }}>
      {/* <Table
        horizontalSpacing="md"
        verticalSpacing="xs"
        sx={{ tableLayout: 'auto', minWidth: 200 }}
      >
        <tbody>
          <tr key={'loadFactorMax'}>
            <td>{JSON.stringify(m, null, 2)}</td>
          </tr>
        </tbody>
      </Table> */}
      <div>
        <pre>{JSON.stringify(m, null, 2)}</pre>
      </div>
    </ScrollArea>
  );
}

// export function MissileModal({ missileProps }) {
//   const m = missileProps.missile as Missile;
//   return (
//     <Modal opened={opened} onClose={() => setOpened(false)} title="Introduce yourself!">
//       <div>
//         <pre>{JSON.stringify(m, null, 2)}</pre>
//       </div>
//     </Modal>
//   );
// }
