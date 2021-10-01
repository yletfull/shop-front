import React from 'react';
import PropTypes from 'prop-types';
import VkIcon from '@/icons/Vk';
import EllipsisHIcon from '@/icons/EllipsisH';
import ChevronUp from '@/icons/ChevronUp';
import TimesLight from '@/icons/TimesLight';
import styles from './styles.module.scss';

const propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
  sizes: PropTypes.objectOf(PropTypes.any).isRequired,
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
  sizes,
  ...props
}) {
  return (
    <div
      className={styles.wrapper}
      style={{ ...sizes }}
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

          <div className={styles.headerOptionsButton}>
            <EllipsisHIcon />
            <TimesLight />
          </div>
        </div>
      </a>

      <div className={styles.bottom}>
        <ChevronUp />

        <button
          className={styles.bottomButton}
          type="button"
        >
          Кнопка
        </button>
      </div>
    </div>
  );
};

Story.propTypes = propTypes;
Story.defaultProps = defaultProps;

export default Story;
