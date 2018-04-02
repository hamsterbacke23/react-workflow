import initWorkflowData from './state.json';

export type RootState = {
  workflow: object
};

const initState = {
  workflow: initWorkflowData
};

const todos = (state: RootState = initState, action) => {
  window.console.log(state);
  switch (action.type) {
    case 'NODE_DRAG':
      return {
        ...state,
        draggedNode: action.item
      };
    default:
      return state;
  }
};
export default todos;
