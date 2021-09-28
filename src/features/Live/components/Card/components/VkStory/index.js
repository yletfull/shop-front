import React from 'react';
import PropTypes from 'prop-types';
import VkIcon from '@/icons/Vk';
import styles from './styles.module.scss';

const propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
  icon: PropTypes.string,
};
const defaultProps = {
  icon: VkIcon,
};

const Story = function Story({
  title,
  content,
  href,
  icon,
  ...props
}) {
  return (
    <div
      className={styles.wrapper}
      {...props}
    >
      <div
        className={styles.content}
        style={{ backgroundImage: `url(${content})` }}
      />

      <a
        className={styles.header}
        href={href}
        target="_blank"
        rel="noreferrer"
      >
        <span className={styles.headerMarker} />

        <div className={styles.headerInfoGroup}>
          <img
            className={styles.headerIcon}
            src={icon}
            alt={title}
          />

          <div className={styles.headerInfo}>
            <span
              className={styles.headerInfoTitle}
            >
              {title}
            </span>

            <span className={styles.headerInfoTypeDescripiton}>
              Реклама
            </span>
          </div>
        </div>
      </a>
    </div>
  );
};

Story.propTypes = propTypes;
Story.defaultProps = defaultProps;

export default Story;
