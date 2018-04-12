import * as React from 'react';
import Node from '../Node';

import { BaseComponent, BaseComponentProps } from '../../BaseComponent';
import Link from '../Link';
import './style.css';

const workflowState = require('../../state.json');

export class App extends BaseComponent {
  state = {
    workflow: workflowState
  };

  onMove = (action: any) => {
    const state = this.state;
    const newLinks = JSON.parse(JSON.stringify(state.workflow.links));
    const newNodes = state.workflow.nodes.map((node: any) => {
      if (node.id === action.id) {
        // update position
        node.x = action.dragData.x;
        node.y = action.dragData.y;

        // update links
        newLinks.map((link: any) => {
          if (link.source === node.id || link.target === node.id) {
            // there is an affected link, go through it's ports
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

    this.setState({
      ...state,
      workflow: {
        ...state.workflow,
        nodes: newNodes,
        links: newLinks
      }
    });
  };

  render() {
    return (
      <div style={{ minHeight: 1000 }}>
        <svg className="linkLayer">
          {this.state.workflow.links.map((link: object, index: number) => (
            <Link key={`link-${index}`} data={link} />
          ))}
        </svg>
        {this.state.workflow.nodes.map((node: object, index: number) => (
          <Node onMove={this.onMove} key={`node-${index}`} data={node} />
        ))}
      </div>
    );
  }
}

export default App;
