import React from 'react';
import PropTypes from 'prop-types';
import VkIcon from '@/icons/Vk';
import GlobeAmericasIcon from '@/icons/GlobeAmericas';
import EllipsisHIcon from '@/icons/EllipsisH';
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

        <div className={styles.headerInfoGroup}>
          <img
            className={styles.headerIcon}
            src={icon}
            alt={title}
          />

          <div className={styles.headerInfo}>
            <div className={styles.headerInfoTitle}>
              {title}
            </div>

            <span className={styles.headerInfoTypeDescripiton}>
              <span className={styles.headerInfoTypeText}>
                Реклама
              </span>

              <GlobeAmericasIcon />
            </span>
          </div>
        </div>

        <EllipsisHIcon />
      </a>

      <div className={styles.content}>
        <span>
          {content}
        </span>
      </div>

      <div className={styles.source}>
        <img
          className={styles.sourceIcon}
          src={icon}
          alt={title}
        />
        <div className={styles.sourceBottom}>
          <div className={styles.sourceBottomTextContent}>
            <span className={styles.sourceBottomTitle}>
              Описание сайта
            </span>
            <span className={styles.sourceBottomDescription}>
              Site.ru
            </span>
          </div>

          <button
            type="button"
            className={styles.sourceBottomButton}
          >
            Кнопка
          </button>
        </div>
      </div>

    </div>
  );
};

PromotedPost.propTypes = propTypes;
PromotedPost.defaultProps = defaultProps;

export default PromotedPost;
