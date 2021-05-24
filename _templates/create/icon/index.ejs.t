---
to: src/icons/<%= h.changeCase.pascal(name) %>.js
---
import React from 'react';
import SVGIconContainer from './SVGIconContainer';

const <%= h.changeCase.pascal(name) %> = function Icon<%= h.changeCase.pascal(name)%>(props) {
  return (
    <SVGIconContainer
      {...props}
      height={}
      width={}
    >
    </SVGIconContainer>
  );
};

export default <%= h.changeCase.pascal(name) %>;
