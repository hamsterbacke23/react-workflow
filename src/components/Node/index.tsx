import * as React from 'react';
import './style.css';
import { BaseComponent, BaseComponentProps } from '../../BaseComponent';
import { NodeProps } from './index';
import Draggable, { DraggableData } from 'react-draggable';
import { Port } from '../Port';

export interface NodeProps extends BaseComponentProps {
  data: any;
  onMove: Function;
}

export class Node extends BaseComponent<NodeProps> {
  ports: Array<Object> = [];

  onDrag = (e: any, dragData: DraggableData) => {
    this.props.onMove({
      id: this.props.data.id,
      ports: this.ports,
      dragData
    });
  };

  /**
   * On initialization, save the ports of this node to a global array
   */
  setPortPosition = (id: string, x: number, y: number) => {
    this.ports.push({ id, x, y });
  };

  render() {
    const { x, y, id, ports } = this.props.data;

    return (
      <Draggable onDrag={this.onDrag} defaultPosition={{ x, y }}>
        <div className="node" data-id={id}>
          {ports.map((port: object, index: number) => (
            <Port
              key={`port-${index}`}
              onPortSetup={this.setPortPosition}
              data={port}
            />
          ))}
        </div>
      </Draggable>
    );
  }
}

export default Node;
