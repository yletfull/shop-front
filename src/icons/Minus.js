import React from 'react';
import SVGIconContainer from './SVGIconContainer';

const Minus = function IconMinus(props) {
  return (
    <SVGIconContainer
      {...props}
      height={512}
      width={304}
    >
      <path d="M368 224H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h352c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16z" />
    </SVGIconContainer>
  );
};

export default Minus;
