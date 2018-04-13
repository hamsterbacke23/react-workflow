import * as React from 'react';
import Node from '../Node';
import Draggable from 'react-draggable';
import { BaseComponent, BaseComponentProps } from '../../BaseComponent';
import Link from '../Link';
import './style.css';

const workflowState = require('../../state.json');

export interface AppState {
  workflow: any;
  zoomLevel: number;
}

export class App extends BaseComponent<BaseComponentProps, AppState> {
  constructor(props: BaseComponentProps) {
    super(props);
    this.state = {
      workflow: workflowState,
      zoomLevel: 100
    };
  }

  onWheel = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    const zoomLevel = this.state.zoomLevel;
    const oldZoomFactor = zoomLevel / 100;
    let scrollDelta = event.deltaY;

    //check if it is pinch gesture
    if (event.ctrlKey && scrollDelta % 1 !== 0) {
      /*Chrome and Firefox sends wheel event with deltaY that
          have fractional part, also `ctrlKey` prop of the event is true
          though ctrl isn't pressed
        */
      scrollDelta /= 3;
    } else {
      scrollDelta /= 60;
    }
    if (zoomLevel + scrollDelta > 10) {
      this.setState({ zoomLevel: zoomLevel + scrollDelta });
    }
  };

  onNodeMove = (action: any) => {
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
                // update last point of link (equals the point at the targetPort)
                const lastPosition = link.points.length - 1;
                link.points[lastPosition].x =
                  link.points[lastPosition].x + action.dragData.deltaX;
                link.points[lastPosition].y =
                  link.points[lastPosition].y + action.dragData.deltaY;
              }
              if (port.id === link.sourcePort) {
                // update first point of link (equals the point at the sourcePort)
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
      <div className="board">
        Zoom: {Math.round(this.state.zoomLevel) / 100}
        <Draggable>
          <div onWheel={this.onWheel} className="zoomLayer">
            <div
              className="zoomLayer"
              style={{
                transform:
                  'translate(0,0) scale(' + this.state.zoomLevel / 100.0 + ')'
              }}
            >
              <svg className="linkLayer">
                {this.state.workflow.links.map(
                  (link: object, index: number) => (
                    <Link key={`link-${index}`} data={link} />
                  )
                )}
              </svg>

              {this.state.workflow.nodes.map((node: object, index: number) => (
                <Node
                  onMove={this.onNodeMove}
                  key={`node-${index}`}
                  data={node}
                />
              ))}
            </div>
          </div>
        </Draggable>
      </div>
    );
  }
}

export default App;
