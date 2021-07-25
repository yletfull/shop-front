import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const propTypes = {
  target: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.any,
  ]).isRequired,
  children: PropTypes.node.isRequired,
};

const Portal = function Portal({
  target,
  children,
}) {
  const root = typeof target === 'string'
    ? document.querySelector(target)
    : target;

  if (!root) {
    return null;
  }

  return createPortal(
    children,
    root,
  );
};

Portal.propTypes = propTypes;

export default Portal;
