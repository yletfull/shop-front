import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  Rating,
  DialogActions,
  Button,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';

const propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
};

const defaultProps = {
  isOpen: false,
  onClose: () => {},
  onSubmit: () => {},
};

const AddFeedback = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const formik = useFormik({
    initialValues: {
      title: '',
      value: '',
      rating: 3,
    },
    onSubmit: async (data) => {
      await onSubmit(data);
      onClose();
    },
  });

  const handleTitleChange = (e) => {
    formik.setFieldValue('title', e.currentTarget.value);
  };

  const handleValueChange = (e) => {
    formik.setFieldValue('value', e.currentTarget.value);
  };

  const handleRatingChange = (rating) => {
    formik.setFieldValue('rating', rating);
  };

  return (
    <Dialog
      onClose={onClose}
      open={isOpen}
    >
      <DialogTitle>
        Оставить отзыв
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Оценка
        </DialogContentText>
        <Rating
          name="simple-controlled"
          value={formik.values.rating}
          onChange={(event, newValue) => handleRatingChange(newValue)}
        />
      </DialogContent>
      <DialogContent>
        <DialogContentText>
          Заголовок отзыва
        </DialogContentText>
        <TextField
          margin="dense"
          id="name"
          type="text"
          variant="standard"
          value={formik.values.title}
          onChange={handleTitleChange}
          fullWidth
          autoFocus
        />
      </DialogContent>
      <DialogContent>
        <DialogContentText>
          Текст отзыва
        </DialogContentText>
        <TextField
          margin="dense"
          id="name"
          type="text"
          variant="standard"
          value={formik.values.value}
          onChange={handleValueChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          Отменить
        </Button>
        <Button onClick={formik.handleSubmit}>
          Отправить отзыв
        </Button>
      </DialogActions>
    </Dialog>
  );
};

AddFeedback.propTypes = propTypes;
AddFeedback.defaultProps = defaultProps;

export default AddFeedback;
