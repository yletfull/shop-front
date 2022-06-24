import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Paper,
  Typography,
} from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ClearIcon from '@mui/icons-material/Clear';
import { DEVICE_ROUTE } from '@/router/constants';
import PropTypes from 'prop-types';
import CardStore from '@/store/Card';
import { addCardItems, fetchUserCard } from '@/pages/Card/service';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  boxShadow: 'unset',
  border: 'thin solid #e0e0e0',
}));

const propTypes = {
  device: PropTypes.objectOf(PropTypes.any).isRequired,
  count: PropTypes.number,
};

const DeviceItem = ({
  device,
  count,
}) => {
  const history = useHistory();
  const handleCardDetailsClick = () => history.push(`${DEVICE_ROUTE}/${device.id}`);
  const handleCardAddItem = async () => {
    await addCardItems([device.id]);
    CardStore.setCard(await fetchUserCard());
  };

  return (
    <Item>
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'row',
          height: '10rem',
          width: '100%',
          justifyContent: 'space-between',
          minWidth: '10rem',
        }}
        elevation="0"
      >
        <Box sx={{ display: 'flex' }}>
          <Paper sx={{ p: 2, m: 1, display: 'flex' }} elevation="0" variant="outlined">
            <CardMedia
              component="img"
              alt="Нет изображения"
              sx={{ cursor: 'pointer', width: '7rem' }}
              image={process.env.REACT_APP_API_URL + device.preview}
              onClick={handleCardDetailsClick}
            />
          </Paper>
          <Paper
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'start',
              alignItems: 'start',
            }}
            elevation="0"
          >
            <CardContent>
              <Typography
                variant="h4"
                color="text.secondary"
              >
                {device.name || 'Без названия'}
              </Typography>
            </CardContent>
            <Button
              size="medium"
              variant="text"
              onClick={handleCardDetailsClick}
              sx={{ color: '#bdbdbd' }}
            >
              <VisibilityIcon sx={{ mr: 0.5 }} />
              Страница товара
            </Button>
            <Box>
              <Typography
                color="text.secondary"
                variant="h6"
              >
                { count } шт.
              </Typography>
            </Box>
          </Paper>
        </Box>
        <CardActions sx={{ ml: 1, mb: 2 }}>
          <Button
            size="medium"
            variant="outlined"
            color="error"
            onClick={handleCardAddItem}
          >
            <ClearIcon sx={{ mr: 0.5 }} />
            Удалить товар
          </Button>
        </CardActions>
      </Card>
    </Item>
  );
};

DeviceItem.propTypes = propTypes;

export default DeviceItem;
