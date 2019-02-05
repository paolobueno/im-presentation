import React, {createContext, useState, cloneElement} from 'react';

const {Provider, Consumer} = createContext({items: new Set(), toggle: () => {}});

export const Item = ({children, value}) => {
  const child = React.Children.only(children);
  return (
    <Consumer>
      {({toggle, items}) =>
        cloneElement(child, {active: items.has(value), onClick: () => toggle(value)})
      }
    </Consumer>
  );
};

export const Toggler = ({onChange, initial, children}) => {
  const [items, setItems] = useState(new Set(initial));
  return (
    <Provider
      value={{
        items,
        toggle: value => {
          items.has(value) ? items.delete(value) : items.add(value);
          const newItems = new Set(items);
          setItems(newItems);
          onChange(Array.from(newItems));
        },
      }}
    >
      {children}
    </Provider>
  );
};

export default Toggler;
