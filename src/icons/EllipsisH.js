import React from 'react';
import PropTypes from 'prop-types';
import SVGIconContainer from './SVGIconContainer';

const propTypes = {
  fill: PropTypes.string,
};

const defaultProps = {
  fill: 'hsl(0, 0%, 40%)',
};

const EllipsisH = function EllipsisH({
  fill,
  ...props
}) {
  return (
    <SVGIconContainer
      {...props}
      height={512}
      width={512}
      fill={fill}
    >
      <path d="M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z" />
    </SVGIconContainer>
  );
};

EllipsisH.propTypes = propTypes;
EllipsisH.defaultProps = defaultProps;

export default EllipsisH;
