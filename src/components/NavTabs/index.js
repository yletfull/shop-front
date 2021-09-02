import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import NavTabsLink from '@/components/NavTabsLink';
import styles from './styles.module.scss';

const propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.node,
      path: PropTypes.string,
      exact: PropTypes.bool,
    }),
  ).isRequired,
  className: PropTypes.string,
};
const defaultProps = {
  className: '',
};

const NavTabs = function NavTabs(
  { options, className, ...props }
) {
  return (
    <div
      {...props}
      className={cx(styles.wrapper, className)}
    >
      {options.map(({ path, title, exact, ...attrs }) => (
        <NavTabsLink
          key={path}
          path={path}
          title={title}
          exact={exact || false}
          {...attrs}
        />
      ))}
    </div>
  );
};

NavTabs.propTypes = propTypes;
NavTabs.defaultProps = defaultProps;

export default NavTabs;
