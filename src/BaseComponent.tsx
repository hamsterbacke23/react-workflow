import * as React from 'react';

export interface BaseComponentProps {
  /**
   * Override the base class name
   */
  baseClass?: string;
  /**
   * append additional classes
   */
  className?: string;

  /**
   * Additional props to add
   */
  extraProps?: any;
}

export class BaseComponent<
  P extends BaseComponentProps = BaseComponentProps,
  S = any
> extends React.Component<P, S> {
  constructor(props: P) {
    super(props);
  }

  getProps(): any {
    return {
      ...((this.props.extraProps as any) || {})
    };
  }
}
