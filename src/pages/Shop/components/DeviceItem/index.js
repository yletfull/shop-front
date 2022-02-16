import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Rating,
} from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router-dom';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { DEVICE_ROUTE } from '@/router/constants';


// eslint-disable-next-line react/prop-types
const DeviceItem = ({ device }) => {
  const history = useHistory();
  const handleCardDetailsClick = () => history.push(DEVICE_ROUTE);

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
        image={process.env.REACT_APP_API_URL + device.img}
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
          {device.name || 'Какой-то товар'}
        </Typography>

        <Rating
          name="read-only"
          value={device.rating}
          sx={{ mt: 1 }}
          readOnly
        />
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

export default DeviceItem;
