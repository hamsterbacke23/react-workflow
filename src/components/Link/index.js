import React, { Component } from 'react';
import './link.css';

class Link extends Component {
  state = {
    selected: false
  };

  generateLinePath = (firstPoint, lastPoint) => {
    return `M${firstPoint.x},${firstPoint.y} L ${lastPoint.x},${lastPoint.y}`;
  };

  generateCurvePath = (firstPoint, lastPoint, curvy = 0) => {
    const isHorizontal =
      Math.abs(firstPoint.x - lastPoint.x) >
      Math.abs(firstPoint.y - lastPoint.y);
    const curvyX = isHorizontal ? curvy : 0;
    const curvyY = isHorizontal ? 0 : curvy;

    return `M${firstPoint.x},${firstPoint.y} C ${firstPoint.x +
      curvyX},${firstPoint.y + curvyY}
    ${lastPoint.x - curvyX},${lastPoint.y - curvyY} ${lastPoint.x},${
      lastPoint.y
    }`;
  };

  generateLinkSegment(path) {
    return (
      <path className="linkPath" strokeWidth="0.5" stroke="#222" d={path} />
    );
  }

  generateLink(path, extraProps, id) {
    const Bottom = React.cloneElement(this.generateLinkSegment(path));

    const Top = React.cloneElement(Bottom, {
      ...extraProps,
      strokeLinecap: 'round',
      onMouseLeave: () => {
        this.setState({ selected: false });
      },
      onMouseEnter: () => {
        this.setState({ selected: true });
      },
      ref: null,
      strokeOpacity: this.state.selected ? 0.1 : 0,
      strokeWidth: 20
    });

    return (
      <g key={'link-' + id}>
        {Bottom}
        {Top}
      </g>
    );
  }

  render() {
    const paths = [];

    const pointLeft = this.props.data.points[0];
    const pointRight = this.props.data.points[1];

    paths.push(
      this.generateLink(this.generateCurvePath(pointLeft, pointRight, 50))
    );

    return <g>{paths}</g>;
  }
}

export default Link;
