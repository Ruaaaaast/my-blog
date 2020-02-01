import React from "react";

export interface InjectedCounterProps {
  value: number;
  onIncrement(): void;
  onDecrement(): void;
}

interface MakeCounterState {
  value: number;
}

const makeCounter = <P extends InjectedCounterProps>(
  Component: React.ComponentType<P>
) =>
  class MakeCounter extends React.Component<P, MakeCounterState> {
    state: MakeCounterState = {
      value: 0
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
        <Component
          {...this.props}
          value={this.state.value}
          onIncrement={this.increment}
          onDecrement={this.decrement}
        />
      );
    }
  };

const Counter = (props: InjectedCounterProps) => (
  <div style={{ height: "800px", backgroundColor: "red" }}>
    <button onClick={props.onDecrement}> - </button>
    {props.value}
    <button onClick={props.onIncrement}> + </button>
  </div>
);

export default makeCounter(Counter);
