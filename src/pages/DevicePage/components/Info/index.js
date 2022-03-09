import React from 'react';
import PropTypes from 'prop-types';
import { Box,
  Typography,
  Rating,
  Button,
} from '@mui/material';
import {
  precision,
  defaultRating,
} from '@/constants/rating';
import CreditCardIcon from '@mui/icons-material/CreditCard';

const propTypes = {
  device: PropTypes.objectOf(PropTypes.any),
};

const defaultProps = {
  device: {},
};

const InfoComponent = ({
  device,
}) => (
  <Box sx={{ ml: 3 }}>
    <Typography
      variant="h3"
      sx={{ fontWeight: 'bold' }}
    >
      {device.name}
    </Typography>

    <Box sx={{ display: 'flex' }}>
      <Typography>
          Категория:
      </Typography>

        &nbsp;

      <Typography sx={{ fontWeight: 600 }}>
        {device?.type?.name}
      </Typography>
    </Box>

    <Box
      sx={{
        width: 200,
        display: 'flex',
        alignItems: 'flex-end',
      }}
    >
      <Rating
        name="read-only"
        size="large"
        value={device?.avgRate || defaultRating}
        precision={precision}
        sx={{ mt: 1 }}
        readOnly
      />

      <Box sx={{ ml: 2 }}>
          ({device?.votes || 0})
      </Box>
    </Box>

    <Typography
      variant="h5"
      sx={{
        fontWeight: 600,
        mt: 3,
      }}
    >
      {`${device?.price?.toFixed(2)} ₽` || '-'}
    </Typography>

    <Box sx={{ display: 'flex', alignItems: 'center', mt: 5 }}>
      <Button
        size="medium"
        variant="contained"
        disabled={!device?.count}
      >
        <CreditCardIcon sx={{ mr: 0.5 }} />

        В корзину
      </Button>

      <Typography sx={{ ml: 1 }}>
          В наличии:
      </Typography>

          &nbsp;

      <Typography sx={{ fontWeight: 600 }}>
        {device?.count || 'нет'}
      </Typography>
    </Box>
  </Box>
);

InfoComponent.propTypes = propTypes;
InfoComponent.defaultProps = defaultProps;

export default InfoComponent;
