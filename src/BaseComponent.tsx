import * as React from 'react';

export interface BaseComponentProps {}

export class BaseComponent<
  P extends BaseComponentProps = BaseComponentProps,
  S = any
> extends React.Component<P, S> {
  constructor(props: P) {
    super(props);
  }
}
