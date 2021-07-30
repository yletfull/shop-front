import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {
  getHasUnlimitedAccess,
  getAbilitiesBySection,
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
    const abilities = useSelector(getAbilitiesBySection);
    const hasUnlimitedAccess = useSelector(getHasUnlimitedAccess);

    const isAvailable = hasUnlimitedAccess
      || (section && action && abilities[section]);

    if (!isAvailable) {
      return null;
    }

    return (
      <Component
        readonly={!abilities[section]?.[action]}
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
