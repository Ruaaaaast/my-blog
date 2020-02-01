### High Order Components

#### What is high order components?

A high order components (HOC) is a function takes a component and returns a component

higher order components will be divided into two basic patterns, which we’ll name enhancers and injectors:
1. Enhancers: Wrap a component with additional functionality/props.
2. Injectors: Inject props into a component.

##### Enhancers

```
// The definition of props to will be added to the wrapped component

type MousePositionProps = {
  x: number;
  y: number;
};
```

```
// withMouse takes a component as input and output a component with added props of type MousePositionProps

export const withMouse = <P extends object>(  
  Component: React.ComponentType<P>
) =>
  class extends React.Component<P & MousePositionProps> {

  }
```

`React.ComponentType`

`React.Component<P & MousePositionProps>`



Use cases
