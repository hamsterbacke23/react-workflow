import * as React from 'react';
import { connect } from 'react-redux';
import Node from '../Node';
import Board from '../Board';
import { RootState } from '../../reducer';

import { BaseComponent, BaseComponentProps } from '../../BaseComponent';
import Link from '../Link';
import './style.css';

interface AppProps extends BaseComponentProps {
  workflowState: any;
}

class App extends BaseComponent<AppProps> {
  render() {
    return (
      <div style={{ minHeight: 1000 }}>
        <svg className="linkLayer">
          {this.props.workflowState.links.map((link: object, index: number) => (
            <Link key={`link-${index}`} data={link} />
          ))}
        </svg>
        {this.props.workflowState.nodes.map((node: object, index: number) => (
          <Node key={`node-${index}`} data={node} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  workflowState: state.workflow
});

export default connect<AppProps>(mapStateToProps)(App);
