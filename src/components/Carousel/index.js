/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'react-bootstrap';

const propTypes = {
  images: PropTypes.arrayOf(PropTypes.any),
};

const defaultProps = {
  images: [],
};

const CarouselComponent = ({
  images,
  ...props
}) => (
  <Carousel
    pause="hover"
    interval={null}
  >
    {images.length && images.map((image) => (
      <Carousel.Item>
        <img
          className="d-block w-100"
          alt="Изображение товара"
          src={process.env.REACT_APP_API_URL + image}
        />
      </Carousel.Item>
    ))}
  </Carousel>
);

CarouselComponent.propTypes = propTypes;
CarouselComponent.defaultProps = defaultProps;

export default CarouselComponent;
