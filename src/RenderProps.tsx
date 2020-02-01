import React, { MouseEvent } from "react";

type MouseProps = {
  render: ({ x, y }: MouseState) => JSX.Element;
};

interface MouseState {
  x: number;
  y: number;
}

class Mouse extends React.Component<MouseProps> {
  state: MouseState = { x: 0, y: 0 };

  handleMouseMove = (event: MouseEvent) => {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  };
  render() {
    return (
      <div
        style={{ height: "800px", backgroundColor: "red" }}
        onMouseMove={this.handleMouseMove}
      >
        {/*
      Instead of providing a static representation of what <Mouse> renders,
      use the `render` prop to dynamically determine what to render.
    */}
        {this.props.render(this.state)}
      </div>
    );
  }
}

export default class MouseDiv extends React.Component {
  render() {
    return (
      <div>
        <p> Move your mouse </p>
        <Mouse
          render={({ x, y }) => (
            <h1>
              ({x}, {y})
            </h1>
          )}
        />
      </div>
    );
  }
}
