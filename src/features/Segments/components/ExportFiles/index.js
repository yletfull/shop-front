import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import IconDownload from '@/icons/Download';
import { platforms } from './constants';
import FormModal from './FormModal';
import { downloadSegment } from './service';
import styles from './styles.module.scss';

const propTypes = {
  className: PropTypes.string,
  segmentId: PropTypes.number,
  conditions: PropTypes.arrayOf(PropTypes.array),
  defaultFileName: PropTypes.string,
  hideIcons: PropTypes.bool,
  statistics: PropTypes.arrayOf(
    PropTypes.shape({
      entityType: PropTypes.oneOf(['EMAIL', 'PHONE']),
      total: PropTypes.number,
    }),
  ),
};
const defaultProps = {
  className: '',
  segmentId: null,
  conditions: [],
  defaultFileName: '',
  hideIcons: false,
  statistics: [],
};

const ExportFiles = function SegmentsExportFiles({
  className,
  segmentId,
  conditions,
  defaultFileName,
  hideIcons,
  statistics,
}) {
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const handlePlatformSelect = (id) => () => setSelectedPlatform(id);
  const handleModalClose = () => setSelectedPlatform(null);

  const isDisabled = !segmentId
    && (!Array.isArray(conditions) || !conditions.length);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleFormSubmit = async (values) => {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await downloadSegment({
        ...values,
        segmentId,
        conditions,
        adsPlatform: selectedPlatform,
      });

      setIsSubmitting(false);
    } catch (err) {
      setIsSubmitting(false);
      setError(err);
    }
  };

  return (
    <Fragment>
      <div className={cx(styles.wrapper, className)}>
        {platforms.map((platform) => (
          <button
            key={platform.id}
            type="button"
            className={styles.button}
            disabled={isDisabled}
            onClick={handlePlatformSelect(platform.id)}
          >
            {!hideIcons && (
              <span className={styles.buttonIcon}>
                <IconDownload />
              </span>
            )}
            {platform.shortName}
          </button>
        ))}
      </div>
      {Boolean(selectedPlatform) && (
        <FormModal
          isSubmitting={isSubmitting}
          error={error}
          platformId={selectedPlatform}
          defaultFileName={defaultFileName}
          statistics={statistics}
          onClose={handleModalClose}
          onSubmit={handleFormSubmit}
        />
      )}
    </Fragment>
  );
};

ExportFiles.propTypes = propTypes;
ExportFiles.defaultProps = defaultProps;

export default ExportFiles;
