import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {
  getHasUnlimitedAccess,
  getPermissionsBySection,
} from '@/store/auth/selectors';

const propTypes = {
  Component: PropTypes.element,
};

const defaultProps = {
  Component: null,
};

const wrappedPropTypes = {
  action: PropTypes.string,
  section: PropTypes.string,
};

const wrappedDefaultProps = {
  action: 'view',
  section: '',
};

const withCheckRights = function withCheckRights(Component) {
  const WrappedWithCheckRights = function WrappedWithCheckRights({
    action,
    section,
    ...props
  }) {
    const permissions = useSelector(getPermissionsBySection);
    const hasUnlimitedAccess = useSelector(getHasUnlimitedAccess);

    const isAvailable = hasUnlimitedAccess
      || (section && action && permissions[section]);

    if (!isAvailable) {
      return null;
    }

    return (
      <Component
        readOnly={!permissions[section]?.[action]}
        {...props}
      />
    );
  };

  WrappedWithCheckRights.propTypes = wrappedPropTypes;
  WrappedWithCheckRights.defaultProps = wrappedDefaultProps;

  return WrappedWithCheckRights;
};

withCheckRights.propTypes = propTypes;
withCheckRights.defaultProps = defaultProps;

export default withCheckRights;
