import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router-dom';
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
        image={process.env.REACT_APP_API_URL + device.img}
      />

      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
        >
          {device.name || 'Без имени'}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
        >
          Описание в разработке
        </Typography>
      </CardContent>

      <CardActions>
        <Button
          size="small"
          onClick={handleCardDetailsClick}
        >
          Подробнее
        </Button>

        <Button
          size="small"
        >
          В корзину
        </Button>
      </CardActions>
    </Card>
  );
};

export default DeviceItem;
