import { createAction } from 'typesafe-actions';
import { DraggableData } from 'react-draggable';

export const nodeActions = {
  moveItem: createAction(
    'NODE_DRAG',
    (id: string, ports: Array<Object>, dragData: DraggableData) => ({
      type: 'NODE_DRAG',
      id,
      ports,
      dragData
    })
  )
};
