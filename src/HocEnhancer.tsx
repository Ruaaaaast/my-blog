import React, { MouseEvent } from "react";

// The definition of props to will be added to the wrapped component
type PlayGroundProps = {
  x: number;
  y: number;
  value: number;
  onIncrement(): void;
  onDecrement(): void;
};

interface MakeCounterState {
  value: number;
  x: number;
  y: number;
}

export const withMouse = <P extends object>(
  Component: React.ComponentType<P>
) =>
  class extends React.Component<P, MakeCounterState> {
    state: MakeCounterState = { x: 0, y: 0, value: 0 };

    handleMouseMove = (event: MouseEvent) => {
      this.setState({
        x: event.clientX,
        y: event.clientY
      });
    };

    increment = () => {
      this.setState(prevState => ({
        value: prevState.value + 1
      }));
    };

    decrement = () => {
      this.setState(prevState => ({
        value: prevState.value - 1
      }));
    };

    render() {
      return (
        <div onMouseMove={this.handleMouseMove}>
          <Component
            {...this.props}
            x={this.state.x}
            y={this.state.y}
            value={this.state.value}
            onIncrement={this.increment}
            onDecrement={this.decrement}
          />
          ;
        </div>
      );
    }
  };

const Playground: React.FC<PlayGroundProps> = ({
  x,
  y,
  value,
  onDecrement,
  onIncrement
}) => {
  return (
    <div style={{ height: "800px", backgroundColor: "red" }}>
      <h1>
        ({x}, {y})
      </h1>
      <button onClick={onDecrement}> - </button>
      {value}
      <button onClick={onIncrement}> + </button>
    </div>
  );
};

export default withMouse(Playground);
