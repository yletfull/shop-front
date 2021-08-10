import React from 'react';
import SVGIconContainer from './SVGIconContainer';

const Save = function IconSave(props) {
  return (
    <SVGIconContainer
      {...props}
      height={32}
      width={32}
    >
      <path d="M23,5H9C7.346,5,6,6.346,6,8v19c0,0.382,0.218,0.73,0.561,0.898c0.344,0.167,0.752,0.126,1.053-0.109L16,21.267l8.386,6.522C24.565,27.929,24.782,28,25,28c0.149,0,0.3-0.034,0.439-0.102C25.782,27.73,26,27.382,26,27V8C26,6.346,24.654,5,23,5z M24,24.956l-7.386-5.745C16.434,19.07,16.217,19,16,19s-0.434,0.07-0.614,0.21L8,24.956V8c0-0.551,0.449-1,1-1h14c0.551,0,1,0.449,1,1V24.956z" />
    </SVGIconContainer>
  );
};

export default Save;
