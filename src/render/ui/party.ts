import { CLASSES, RACES } from '../../core/data';

export const className = (id: string): string => CLASSES.find((c) => c.id === id)?.name ?? id;
export const raceName = (id: string): string => RACES.find((r) => r.id === id)?.name ?? id;
