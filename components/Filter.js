import React, {Fragment, memo} from "react";
import * as uuid from "uuid";

const Filter = memo(function Filter({
  cssPre,
  cssPost,
  children,
  render,
  style,
  ...props
}) {
  const filterId = uuid.v4();
  const filter = [cssPre, `url("#${filterId}")`, cssPost].join(" ");
  return (
    <Fragment>
      <svg style={{display: "absolute"}} width={0} height={0}>
        <filter id={filterId}>{children}</filter>
      </svg>
      {render({style: {...style, filter}, ...props})}
    </Fragment>
  );
});

export default Filter;
