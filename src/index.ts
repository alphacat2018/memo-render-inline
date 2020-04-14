import { Component } from "react";
import shallowEquals from "./shallow-equals";

const FUNC_DO_NOTHING = () => {};
const components = new WeakMap();
const memoComponent: (component: Component) => <T>(val: T, dependencies?: any[]) => T = (component: Component) => {
    if (!components.has(component)) {
        const originalComponentWillUnmount = component.componentWillUnmount || FUNC_DO_NOTHING;
        const originalRender = component.render;
        const counterValueMap = new Map();
        let counter = 0;

        component.componentWillUnmount = () => {
            components.delete(component);
            originalComponentWillUnmount.apply(component);
        };
        component.render = () => {
            counter = 0;
            return originalRender.apply(component);
        };

        const func = (value: any, dependencies?: any[]) => {
            let current = {
                value,
                dependencies,
            };
            let currentNumber = counter++;
            if (counterValueMap.has(currentNumber)) {
                const prev = counterValueMap.get(currentNumber);
                if (shallowEquals(prev.dependencies, current.dependencies)) {
                    return prev.value;
                }
            }

            counterValueMap.set(currentNumber, current);
            return current.value;
        };

        components.set(component, func);
    }

    return components.get(component);
};

export default memoComponent;
