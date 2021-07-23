import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const Portal = function Portal(props) {
  const root = document.getElementById('portal-modals');

  if (!root) {
    return null;
  }

  return createPortal(
    props.children,
    root,
  );
};

Portal.propTypes = propTypes;

export default Portal;
