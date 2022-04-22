/* eslint-disable react/jsx-indent */
import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Rating,
  Button,
} from '@mui/material';
import PropTypes from 'prop-types';
import {
  defaultRating,
  precision,
} from '@/constants/rating';
import dayjs from 'dayjs';
import { timeFormat } from '@/constants/formats';
import AddFeedbackModal from '../AddFeedbackModal';

const propTypes = {
  feedback: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      value: PropTypes.string,
    })
  ),
  onAddFeedbackModalSubmit: PropTypes.func,
};

const defaultProps = {
  feedback: [],
  onAddFeedbackModalSubmit: () => {},
};

const FeedbackView = ({
  feedback,
  onAddFeedbackModalSubmit,
}) => {
  const [addFeedbackModalIsOpen, setAddFeedbackModalIsOpen] = useState(false);
  const handleAddFeedbackModalOpen = () => setAddFeedbackModalIsOpen(true);
  const handleAddFeedbackModalClose = () => setAddFeedbackModalIsOpen(false);

  return (
    <Box>
      {feedback.length
        ? feedback.map((item) => (
          <Card
            sx={{
              width: '100%',
              boxShadow: 0,
              '&:not(:first-of-type)': {
                mt: 3,
              },
            }}
          >
            <CardActionArea>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderBottom: 1,
                  borderColor: '#eeeeee',
                }}
              >
                <Avatar sx={{ m: 2 }}>
                  {item?.user?.login?.substr(0, 1) || 'u'}
                </Avatar>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                  }}
                >
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ margin: 0 }}
                  >
                    {item?.user?.login || 'Без имени'}
                  </Typography>
                  <Rating
                    value={item?.rating?.rate ?? defaultRating}
                    readOnly
                    precision={precision}
                    size="small"
                  />
                </Box>
                <Box
                  sx={{ position: 'absolute',
                    right: 15,
                    color: 'gray',
                    fontStyle: 'italic',
                    fontSize: '.8em',
                  }}
                >
                  {item?.createdAt
                    ? dayjs(item.createdAt).format(timeFormat)
                    : 'Дата не определена'}
                </Box>
              </Box>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  {item?.title || 'Отзыв'}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  {item?.value || 'Нет текста'}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        )) : (
          <Typography>
          Нет отзывов
          </Typography>
        )}

      <Button
        onClick={handleAddFeedbackModalOpen}
        sx={{ mt: 1 }}
      >
      + Добавить отзыв
      </Button>

      <AddFeedbackModal
        isOpen={addFeedbackModalIsOpen}
        onClose={handleAddFeedbackModalClose}
        onSubmit={onAddFeedbackModalSubmit}
      />
    </Box>
  );
};

FeedbackView.propTypes = propTypes;
FeedbackView.defaultProps = defaultProps;

export default FeedbackView;
