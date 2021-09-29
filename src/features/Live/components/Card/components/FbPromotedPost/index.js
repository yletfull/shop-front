import React from 'react';
import PropTypes from 'prop-types';
import VkIcon from '@/icons/Vk';
import GlobeAmericasIcon from '@/icons/GlobeAmericas';
import EllipsisHIcon from '@/icons/EllipsisH';
import angry from '@/images/facebook/angry.svg';
import haha from '@/images/facebook/haha.svg';
import like from '@/images/facebook/like.svg';
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

      <div className={styles.feedback}>
        <div className={styles.feedbackReactions}>
          <button
            type="button"
            className={styles.feedbackReactionButton}
          >
            <img
              src={angry}
              alt="angry"
            />
          </button>
          <button
            type="button"
            className={styles.feedbackReactionButton}
          >
            <img
              src={haha}
              alt="haha"
            />
          </button>
          <button
            type="button"
            className={styles.feedbackReactionButton}
          >
            <img
              src={like}
              alt="like"
            />
          </button>
          <span className={styles.feedbackReactionsCount}>
            15
          </span>
        </div>

        <div className={styles.feedbackActions}>
          <button
            type="button"
            className={styles.feedbackActionsButton}
          >
            <span>
              Комментарии:
            </span>
            &nbsp;
            <span>
              5
            </span>
          </button>

          <button
            type="button"
            className={styles.feedbackActionsButton}
          >
            <span>
              Поделились:
            </span>
            &nbsp;
            <span>
              1
            </span>
          </button>
        </div>
      </div>

    </div>
  );
};

PromotedPost.propTypes = propTypes;
PromotedPost.defaultProps = defaultProps;

export default PromotedPost;
