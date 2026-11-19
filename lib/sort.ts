import { Manager } from '@/types/manager';

export const sortById = <T extends { id: number }>(items: T[]) =>
  [...items].sort((a, b) => a.id - b.id);

export const sortManagers = (managers: Manager[]) =>
  [...managers].sort(
    (a, b) =>
      (a.order ?? Number.MAX_SAFE_INTEGER) -
        (b.order ?? Number.MAX_SAFE_INTEGER) || a.id - b.id,
  );
