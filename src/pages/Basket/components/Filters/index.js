
import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Multiselect from '@/components/Multiselect';
import Select from '@/components/Select';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Input from '@/components/Input';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';
import { getOptions } from './utils';

const propTypes = {
  types: PropTypes.arrayOf(PropTypes.any),
  brands: PropTypes.arrayOf(PropTypes.any),
  ratings: PropTypes.arrayOf(PropTypes.any),
  selectedBrands: PropTypes.arrayOf(PropTypes.any),
  selectedPrice: PropTypes.objectOf(PropTypes.any),
  selectedType: PropTypes.string,
  selectedRating: PropTypes.string,
  handleTypesChange: PropTypes.func,
  handleBrandsChange: PropTypes.func,
  handleRatingChange: PropTypes.func,
  handleFiltersAccept: PropTypes.func,
  handlePriceChange: PropTypes.func,
};

const defaultProps = {
  types: [],
  brands: [],
  ratings: [],
  selectedPrice: {},
  selectedType: null,
  selectedRating: null,
  selectedBrands: [],
  handleTypesChange: () => {},
  handleBrandsChange: () => {},
  handleRatingChange: () => {},
  handleFiltersAccept: () => {},
  handlePriceChange: () => {},
};

const FiltersBar = ({
  types,
  brands,
  ratings,
  selectedType,
  selectedPrice,
  selectedRating,
  selectedBrands,
  handleTypesChange,
  handleBrandsChange,
  handleRatingChange,
  handleFiltersAccept,
  handlePriceChange,
}) => (
  <Accordion disableGutters className={styles.menuAccordion}>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
    >
      <Typography>
          Фильтры
      </Typography>
    </AccordionSummary>

    <AccordionDetails>
      <Select
        label={'Категория'}
        options={getOptions(types)}
        value={selectedType}
        className={styles.menuAccordionSelect}
        onChange={(values) => handleTypesChange(values)}
      />

      <Multiselect
        label={'Брэнд'}
        options={getOptions(brands)}
        value={selectedBrands}
        className={styles.menuAccordionSelect}
        onChange={(values) => handleBrandsChange(values)}
      />

      <Select
        label={'Рейтинг'}
        options={getOptions(ratings)}
        value={selectedRating}
        className={styles.menuAccordionSelect}
        onChange={(values) => handleRatingChange(values)}
      />


      <div className={styles.menuAccordionSelectWrapper}>
        <Input
          units="₽"
          id="price-from"
          type="number"
          label="от"
          value={selectedPrice.from}
          onChange={(event) => handlePriceChange({
            event,
            option: 'from',
          })}
        />

          -

        <Input
          units="₽"
          id="price-to"
          type="number"
          label="до"
          value={selectedPrice.to}
          onChange={(event) => handlePriceChange({
            event,
            option: 'to',
          })}
        />
      </div>

      <Button
        variant="text"
        className={styles.menuAccordionAcceptButton}
        onClick={handleFiltersAccept}
      >
          Применить фильтры
      </Button>

    </AccordionDetails>
  </Accordion>
);

FiltersBar.propTypes = propTypes;
FiltersBar.defaultProps = defaultProps;

export default FiltersBar;
