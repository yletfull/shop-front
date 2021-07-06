import React from 'react';
import PropTypes from 'prop-types';
import Button from '@/components/Button';
import IconDownload from '@/icons/Download';
import styles from './styles.module.scss';

const propTypes = {
  platforms: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  })),
  onSelect: PropTypes.func,
};

const defaultProps = {
  platforms: [],
  onSelect: () => {},
};

const SelectFilePlatform = function SelectFilePlatform({
  platforms,
  onSelect,
}) {
  const handleClickPlatformButton = (e) => {
    const { value } = e?.target || {};

    if (!value) {
      return;
    }

    onSelect(value);
  };

  return (
    <div className={styles.selectFilePlatform}>
      {platforms.map(({ label, value }) => (
        <Button
          appearance="control"
          key={value}
          value={value}
          className={styles.selectFilePlatformButton}
          onClick={handleClickPlatformButton}
        >
          <span className={styles.selectFilePlatformIcon}>
            <IconDownload />
          </span>
          {label}
        </Button>
      ))}
    </div>
  );
};

SelectFilePlatform.propTypes = propTypes;
SelectFilePlatform.defaultProps = defaultProps;

export default SelectFilePlatform;
