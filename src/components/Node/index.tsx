import * as React from 'react';
import './style.css';
import { BaseComponent, BaseComponentProps } from '../../BaseComponent';
import { NodeProps } from './index';
import Draggable, { DraggableData } from 'react-draggable';
import { nodeActions } from './actions';
import { connect } from 'react-redux';
import { Port } from '../Port';

export interface NodeProps extends BaseComponentProps {
  data: any;
}

export interface NodeDispatchProps {
  move: Function;
}

export class Node extends BaseComponent<NodeProps & NodeDispatchProps> {
  ports: Array<Object> = [];

  onDrag = (e: any, dragData: DraggableData) => {
    this.props.move(this.props.data.id, this.ports, dragData);
  };

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

const mapDispatchToProps = (dispatch: any) => ({
  move: (id: string, ports: Array<Object>, dragData: DraggableData) =>
    dispatch(nodeActions.moveItem(id, ports, dragData))
});

export default connect<void, NodeDispatchProps>(null, mapDispatchToProps)(Node);
