import React, { MouseEvent } from "react";

export const withMouse = <P extends object>(
  Component: React.ComponentType<P>
) =>
  class extends React.Component<P> {
    state = { x: 0, y: 0 };

    handleMouseMove = (event: MouseEvent) => {
      this.setState({
        x: event.clientX,
        y: event.clientY
      });
    };

    render() {
      return (
        <div onMouseMove={this.handleMouseMove}>
          <Component {...(this.state as P)} />;
        </div>
      );
    }
  };

type PlayGroundProps = {
  x: number;
  y: number;
};

const Playground: React.FC<PlayGroundProps> = ({ x, y }) => {
  return (
    <div style={{ height: "800px", backgroundColor: "red" }}>
      <h1>
        ({x}, {y})
      </h1>
    </div>
  );
};

export default withMouse(Playground);
