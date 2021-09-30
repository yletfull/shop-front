import React from 'react';
import PropTypes from 'prop-types';
import VkIcon from '@/icons/Vk';
import EllipsisHIcon from '@/icons/EllipsisH';
import IconHeart from '@/icons/Heart';
import IconShare from '@/icons/Share';
import CommentAltIcon from '@/icons/CommentAlt';
import EyeIcon from '@/icons/Eye';
import styles from './styles.module.scss';

const propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
  device: PropTypes.string.isRequired,
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
  device,
  ...props
}) {
  return (
    <div
      className={styles.wrapper}
      data-device={device}
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
              Рекламная запись
            </span>
          </div>
        </div>

        <EllipsisHIcon />
      </a>

      <div className={styles.content}>
        {content}
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

            <a
              href={href}
              className={styles.sourceBottomDescription}
            >
              Site.ru
            </a>
          </div>

          <button
            type="button"
            className={styles.sourceBottomButton}
          >
            Кнопка
          </button>
        </div>
      </div>

      <div className={styles.feedback}>
        <div className={styles.feedbackReactions}>
          <button
            type="button"
            className={styles.feedbackReactionButton}
          >
            <IconHeart />
            &nbsp;
            12
          </button>

          <button
            type="button"
            className={styles.feedbackReactionButton}
          >
            <CommentAltIcon />
            &nbsp;
            3
          </button>

          <button
            type="button"
            className={styles.feedbackReactionButton}
          >
            <IconShare />
            &nbsp;
            1
          </button>
        </div>

        <span className={styles.feedbackViews}>
          <EyeIcon />
          &nbsp;
          <span className={styles.feedbackViewsCount}>
            126
          </span>
        </span>
      </div>

    </div>
  );
};

PromotedPost.propTypes = propTypes;
PromotedPost.defaultProps = defaultProps;

export default PromotedPost;
