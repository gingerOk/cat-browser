import React, { useEffect, useState } from 'react';
import ImageGallery from 'react-image-gallery';

const ImagesCarousel = ({ images, breed }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const newImages = images?.map(i => ({ original: i, thumbnail: i }));
    if (newImages) setData(newImages);
  }, [images]);

  return (
    <section className="carousel-wrapper">
      {data.length ? <ImageGallery items={data} lazyLoad={true} showPlayButton={false} /> : null}
    </section>
  );
};

export default ImagesCarousel;
