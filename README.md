# memo-render-inline
This library helps you memoize inline objects and functions created in the <b>render function of a class Component.</b>

It's inspired by the [useCallback Hooks](https://reactjs.org/docs/hooks-reference.html#usecallback). So if you want to memoize something just like the useCallback Hooks in a class Component, you should give this a shot.

# Rules
Basically, this is similar to how Hooks work([Relies on the order in which Hooks are called](https://reactjs.org/docs/hooks-rules.html#explanation)). So there are some limitations as well.

1. [Only Call it at the Top Level.](https://reactjs.org/docs/hooks-rules.html#only-call-hooks-at-the-top-level)
2. Only Call it from the render lifecycle method of a class Component.


# Installation

```
npm install --save memo-render-inline
```


# Usage

```jsx
import memoComponent from "memo-render-inline";

class MyComponent extends Component {
    state = {
        height: 100,
    };
    render() {
        const memo = memoComponent(this);
        const { height } = this.state;
        return (
            <div
                style={memo(
                    {
                        width: 100,
                        height,
                    },
                    [height] // you can set some dependencies just like the useCallback Hook
                )}
                onClick={memoComponent(this)(() => { console.log("if you prefer call it in one line."); })}
            >
                {[1, 2, 3].map((val) => (
                    <ExpensivePureComponent
                        key={val}
                        style={memo({
                            width: 100,
                            height: 100,
                        })}
                        onClick={memo(() => alert(val), [val])}
                    >
                        {val}
                    </ExpensivePureComponent>
                ))}
                <button
                    onClick={() =>
                        // ExpensivePureComponent's render lifecycle method won't be triggered.
                        this.setState({ height: this.state.height + 10 })
                    }
                >
                    refresh
                </button>
            </div>
        );
    }
}

```
