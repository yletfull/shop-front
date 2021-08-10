import React from 'react';
import SVGIconContainer from './SVGIconContainer';

const Equals = function IconEquals(props) {
  return (
    <SVGIconContainer
      {...props}
      height={512}
      width={384}
    >
      <path d="M368 304H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h352c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16zm0-160H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h352c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16z" />
    </SVGIconContainer>
  );
};

export default Equals;
