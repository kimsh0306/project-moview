import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./MultiCarousel.css";

const MultiCarousel = ({ items, responsive, ItemComponent }) => {
  return (
    <div className="multi-carousel-wrapper">
      <Carousel
        draggable={true}
        centerMode={false}
        responsive={responsive}
        itemClass="p-1"
        infinite={false} // true일 때, 불필요한 렌더링 문제 발생
      >
        {items.map((item) => (
          <ItemComponent item={item} key={item.id} />
        ))}
      </Carousel>
    </div>
  );
};

export default MultiCarousel;
