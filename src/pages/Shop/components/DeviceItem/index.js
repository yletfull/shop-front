import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Rating,
  Box,
} from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { precision } from '@/constants/rating';
import { getAverageRatingValue } from '@/utils/rating';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { DEVICE_ROUTE } from '@/router/constants';
import PropTypes from 'prop-types';

const propTypes = {
  device: PropTypes.objectOf(PropTypes.any).isRequired,
};

const DeviceItem = ({
  device,
}) => {
  const history = useHistory();
  const handleCardDetailsClick = () => history.push(`${DEVICE_ROUTE}/${device.id}`);

  return (
    <Card
      sx={{ width: 345, margin: 2 }}
      variant="outlined"
    >
      <CardMedia
        component="img"
        alt="device"
        height="300"
        sx={{ cursor: 'pointer' }}
        image={process.env.REACT_APP_API_URL + device.preview}
        onClick={handleCardDetailsClick}
      />

      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
        >
          {`${device.price} ₽` || 'Нет в наличии'}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
        >
          {device.name || 'Без названия'}
        </Typography>

        <Box
          sx={{
            width: 200,
            display: 'flex',
            alignItems: 'flex-end',
          }}
        >
          <Rating
            name="read-only"
            value={getAverageRatingValue(device.ratings)}
            precision={precision}
            sx={{ mt: 1 }}
            readOnly
          />

          <Box sx={{ ml: 2 }}>
            ({device?.ratings?.length || 0})
          </Box>
        </Box>

      </CardContent>

      <CardActions sx={{ ml: 1, mb: 2 }}>
        <Button
          size="medium"
          variant="outlined"
        >
          Страница товара
        </Button>

        <Button
          size="medium"
          variant="outlined"
          color="success"
        >
          <CreditCardIcon sx={{ mr: 0.5 }} />

          В корзину
        </Button>
      </CardActions>
    </Card>
  );
};

DeviceItem.propTypes = propTypes;

export default DeviceItem;
