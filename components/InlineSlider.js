/**
 * inspired by https://github.com/tmcw/react-tangle
 */
import {clamp} from "ramda";
import React, {memo, useState, useRef, useEffect} from "react";

const noop = () => {};
const identity = (x) => x;

const InlineSlider = memo(function InlineSlider({
  value = 0,
  min = 0,
  max = 100,
  onChange = noop,
  format = identity,
  pixelsPerUnit = 5,
  style,
  Component = (props) => <p {...props} />,
  ...props
}) {
  const clampToValues = clamp(min, max);

  const pointerId = useRef(null);
  const el = useRef(null);

  const [dragging, setDragging] = useState(false);
  const [dragValue, setDragValue] = useState(0);
  const [startX, setStartX] = useState(0);

  useEffect(
    function setGlobalCursor() {
      document.body.style.cursor = dragging ? "ew-resize" : null;
      return () => {
        document.body.style.cursor = null;
      };
    },
    [dragging],
  );

  const events = {
    onPointerDown: (e) => {
      pointerId.current = e.pointerId;
      el.current.setPointerCapture(pointerId.current);
      setDragging(true);
      setStartX(e.screenX);
      setDragValue(value);
    },
    onPointerUp: () => {
      setDragging(false);
      el.current.releasePointerCapture(pointerId.current);
    },
    onPointerMove: (e) => {
      if (!dragging) {
        return;
      }
      e.preventDefault();
      const delta = e.screenX - startX;
      const newValue = clampToValues(
        Math.floor(dragValue + delta / pixelsPerUnit),
      );
      onChange(newValue);
    },
  };
  return (
    <Component
      ref={el}
      {...props}
      style={{cursor: "ew-resize", ...style}}
      {...events}
    >
      {format(value)}
    </Component>
  );
});

export default InlineSlider;
