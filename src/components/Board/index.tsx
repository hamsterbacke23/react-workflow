import * as React from 'react';
import { BoardProps } from './index';
import { BaseComponent, BaseComponentProps } from '../../BaseComponent';
import { BaseAction } from '../../actions/BaseAction';
import { MoveItemsAction } from '../../actions/MoveItemsAction';
import { RootState } from '../../reducer';
import { connect } from 'react-redux';
import { nodeActions } from './actions';

export interface BoardProps extends BaseComponentProps {
  move: Function;
}

export interface BoardState {
  action: BaseAction;
  id: string;
}

class Board extends BaseComponent<BoardProps, BoardState> {
  state = {
    action: new BaseAction(0, 0),
    id: ''
  };

  constructor(props: BoardProps) {
    super(props);
  }

  getMouseElement(event: any) {
    window.console.log('getmouselement');
    const element = event.target as Element;

    if (element) {
      return element;
    }
    return null;
  }

  initMovingElement(element: Element, event: any) {
    const container = element.closest('.node[data-id]');
    if (container) {
      const id = container.getAttribute('data-id');
      const action = new MoveItemsAction(event.clientX, event.clientY);
      if (id) {
        this.setState({ action, id });
      }
    }

    return null;
  }

  onMouseDown = (event: any) => {
    // Decide what is clicked
    const element = this.getMouseElement(event);

    if (element) {
      // TODO: if element is a valid board element, react here
      this.initMovingElement(element, event);
    }
  };

  onMouseMove = (event: any) => {
    if (this.state.action instanceof MoveItemsAction) {
      const amountX = event.clientX - this.state.action.mouseX;
      const amountY = event.clientY - this.state.action.mouseY;
      if (this.state.id) {
        this.props.move(this.state.id, amountX, amountY);
      }
    }

    return null;
  };

  onMouseUp = (event: any) => {
    if (this.state.action) {
      this.setState({ action: new BaseAction(0, 0) });
    }
  };

  render() {
    return (
      <div
        style={{ backgroundColor: '#eee', minHeight: '1000px' }}
        onMouseDown={this.onMouseDown}
        onMouseMove={this.onMouseMove}
        onMouseUp={this.onMouseUp}
      >
        {this.props.children}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  move: (id: string, x: number, y: number) =>
    dispatch(nodeActions.moveItem(id, x, y))
});

export default connect<void, BoardProps>(null, mapDispatchToProps)(Board);
