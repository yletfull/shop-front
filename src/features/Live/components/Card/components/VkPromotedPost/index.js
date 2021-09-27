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

const PromotedPost = function PromotedPost({
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
      <a
        className={styles.header}
        href={href}
        target="_blank"
        rel="noreferrer"
      >
        <img
          className={styles.headerIcon}
          src={icon}
          alt={title}
        />

        <div className={styles.headerInfo}>
          <div
            className={styles.headerInfoTitle}
          >
            {title}
          </div>

          <span className={styles.headerInfoTypeDescripiton}>
            Рекламная запись
          </span>
        </div>
      </a>

      <div className={styles.content}>
        <span>
          {content}
        </span>
      </div>
    </div>
  );
};

PromotedPost.propTypes = propTypes;
PromotedPost.defaultProps = defaultProps;

export default PromotedPost;
