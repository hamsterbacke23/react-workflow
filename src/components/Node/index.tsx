import * as React from 'react';
import './style.css';

export interface NodeProps {
  x: number;
  y: number;
}

export interface NodeState {}

export class Node<
  P extends NodeProps = NodeProps,
  S = NodeState
> extends React.Component<P, S> {
  render() {
    const { x, y } = this.props;

    return (
      <div
        className="node"
        style={{
          left: `${x}px`,
          top: `${y}px`
        }}
      >
        Node
      </div>
    );
  }
}

export default Node;
