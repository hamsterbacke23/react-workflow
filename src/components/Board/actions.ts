import { createAction } from 'typesafe-actions';

export const nodeActions = {
  moveItem: createAction('NODE_DRAG', (id: string, x: number, y: number) => ({
    type: 'NODE_DRAG',
    id,
    x,
    y
  }))
};
