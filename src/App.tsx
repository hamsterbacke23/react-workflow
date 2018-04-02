import * as React from 'react';
import { connect } from 'react-redux';
import './App.css';
import Node from './components/Node';
import Board from './components/Board';
import { RootState } from './reducer';
import { BaseComponent, BaseComponentProps } from './BaseComponent';

interface AppProps extends BaseComponentProps {
  appState: RootState;
}

class App extends BaseComponent<AppProps> {
  render() {
    return (
      <div className="App">
        <Board>
          <Node x={200} y={440} />
          <Node x={150} y={300} />
          <Node x={100} y={100} />
        </Board>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  appState: state.workflow
});

export default connect<AppProps>(mapStateToProps)(App);
