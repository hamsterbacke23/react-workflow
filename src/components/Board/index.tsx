import * as React from 'react';
import { BoardProps } from './index';
import { BaseComponent, BaseComponentProps } from '../../BaseComponent';
import { BaseAction } from '../../actions/BaseAction';

export interface BoardProps extends BaseComponentProps {
  actionStartedFiring?: Function;
}

class Board extends BaseComponent<BoardProps> {
  constructor(props: BoardProps) {
    super(props);
  }

  startFiringAction(action: BaseAction) {
    this.setState({ action: action });
  }

  getMouseElement(event: object) {
    return null;
  }

  handleElement(element: Element) {
    return null;
  }

  onMouseDown = (event: any) => {
    window.console.log(event.clientX, event.clientY);
    // Decide what is clicked
    const element = this.getMouseElement(event);
    if (element) {
      // TODO: if element is a valid board element, react here
      this.handleElement(element);
    }
  };

  onMouseMove = (event: any) => {
    window.console.log(event.clientX, event.clientY);

    return null;
  };

  render() {
    return (
      <div
        style={{ backgroundColor: '#eee', minHeight: '1000px' }}
        onMouseDown={this.onMouseDown}
        onMouseMove={this.onMouseMove}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Board;
