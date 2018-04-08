import React, { Component } from 'react';
import { BaseComponent, BaseComponentProps } from '../../BaseComponent';

export interface PortProps extends BaseComponentProps {
  onPortSetup: Function;
  data: any;
  children?: any;
}

export class Port extends BaseComponent<PortProps> {
  ref: HTMLDivElement | null;

  componentDidMount() {
    if (!this.ref) {
      return;
    }
    const centerX = this.ref.offsetLeft + this.ref.offsetWidth / 2;
    const centerY = this.ref.offsetTop + this.ref.offsetHeight / 2;
    this.props.onPortSetup(this.props.data.id, centerX, centerY);
  }

  render() {
    return (
      <div className={this.props.data.name} ref={el => (this.ref = el)}>
        {this.props.data.name}
      </div>
    );
  }
}

export default Port;
