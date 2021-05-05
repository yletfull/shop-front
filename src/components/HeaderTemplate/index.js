import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './styles.module.scss';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  className: PropTypes.string,
};

const defaultProps = {
  className: '',
};

const AppLayout = function AppLayout(props) {
  const { children, className } = props;

  const childrenArr = Array.isArray(children)
    ? children.map((el) => el)
    : [children];

  return (
    childrenArr[0]
      && (
        <div
          className={cx(
            styles.wrapper,
            className,
          )}
        >
          {!childrenArr[1]
            ? childrenArr[0]
            : (
              <React.Fragment>
                <div className={[styles.wrapperLeftSide]}>
                  {childrenArr[0]}
                </div>
                <hr className={styles.hr} />
                <div className={styles.wrapperRightSide}>
                  {childrenArr[1]}
                </div>
              </React.Fragment>
            )}
        </div>
      )

  );
};

AppLayout.propTypes = propTypes;
AppLayout.defaultProps = defaultProps;

export default AppLayout;
