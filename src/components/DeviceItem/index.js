import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const DeviceItem = ({ device }) => {
  // eslint-disable-next-line no-unused-vars
  const history = useHistory();
  return (
    <Card sx={{ width: 345, margin: 2 }}>
      <CardMedia
        component="img"
        alt="green iguana"
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
        <Button size="small">Купить</Button>
        <Button size="small">В корзину</Button>
      </CardActions>
    </Card>
  );
};

export default DeviceItem;
