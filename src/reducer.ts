const initWorkflowData = require('./state.json');

export type RootState = {
  workflow: {
    nodes: any;
    links: any;
  };
};

const initState = {
  workflow: initWorkflowData
};

const todos = (state: RootState = initState, action: any) => {
  switch (action.type) {
    case 'NODE_DRAG':
      const newLinks = JSON.parse(JSON.stringify(state.workflow.links));
      const newNodes = state.workflow.nodes.map((node: any) => {
        if (node.id === action.id) {
          // update position
          node.x = action.dragData.x;
          node.y = action.dragData.y;
          newLinks.map((link: any) => {
            if (link.source === node.id || link.target === node.id) {
              link.ports = action.ports.map((port: any) => {
                if (port.id === link.targetPort) {
                  const lastPosition = link.points.length - 1;
                  link.points[lastPosition].x =
                    link.points[lastPosition].x + action.dragData.deltaX;
                  link.points[lastPosition].y =
                    link.points[lastPosition].y + action.dragData.deltaY;
                }
                if (port.id === link.sourcePort) {
                  link.points[0].x = link.points[0].x + action.dragData.deltaX;
                  link.points[0].y = link.points[0].y + action.dragData.deltaY;
                }
                return port;
              });
            }
            return link;
          });
        }

        return node;
      });

      return {
        ...state,
        workflow: {
          ...state.workflow,
          nodes: newNodes,
          links: newLinks
        }
      };
    default:
      return state;
  }
};
export default todos;
