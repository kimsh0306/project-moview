import React from "react";
import { Carousel } from "react-bootstrap";

const CustomCarousel = ({ items, ItemComponent }) => {
  return (
    <Carousel>
      {items.map((item, idx) => {
        return (
          <Carousel.Item key={item.id}>
            <ItemComponent item={item} idx={idx} />
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};

export default CustomCarousel;
