import { useState } from "react";

export const SliderClothingItem = ({ images, close }) => {
  const [slide, setSlide] = useState(0);

  const prev = () => {
    setSlide((prev) => {
      return prev === 0 ? images.length - 1 : prev - 1;
    });
  };

  const next = () => {
    setSlide((prev) => {
      return prev === images.length - 1 ? 0 : prev + 1;
    });
  };

  return (
    <div className="slider-clothing">
      <div className="slider-clothing__img slide-img">
        <img src={`${process.env.BASE_URL}clothing/${images[slide]}`} />
      </div>
      <div className="slider-clothing__close" onClick={close}>
        &times;
      </div>

      <div className="slider-clothing__prev arrow" onClick={next}>
        &#10095;
      </div>
      <div className="slider-clothing__next arrow" onClick={prev}>
        &#10094;
      </div>

      <div className="slider-clothing__preview preview-slider">
        {images.map((image, index) => (
          <div
            className="preview-slider__image"
            key={index}
            onClick={() => setSlide(index)}
          >
            <img src={`/clothing/${image}`} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
};
