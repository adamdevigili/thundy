import { Button, Container, Modal, ScrollArea, Table } from '@mantine/core';
import { Missile } from '../../data/missile';
import { GetCustomPropertyString, GetSound } from '../../lib/missiles';

export interface HomeNavButtonProps {
  icon: any;
  title: string;
}

export function HomeNavButton(title, icon) {
  return <Button>{title}</Button>;
}
