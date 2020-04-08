import React from "react";
import styled from "styled-components";

export const P = styled.p({});
export const A = styled.a({});
export const LI = styled.li({});

export const Legend = ({children}) => (
  <small style={{fontSize: "0.6em"}}>{children}</small>
);
