import React from 'react';
import { useSelector } from 'react-redux';
import Tags from '../Tags/Tags';
import About from './About/About';
import Carousel from './Carousel/Carousel';
import './SingleAnimalContent.scss';

const SingleAnimalContent = () => {
  const { singleAnimal } = useSelector(state => state.singleAnimal);
  const tags = singleAnimal
    ? Object.keys(singleAnimal.breed).filter(key => singleAnimal.breed[key] === 1 && key !== 'id')
    : null;
  return (
    <article className="single-animal-wrapper with-padding">
      <h1>{singleAnimal?.breed?.name}</h1>
      <Carousel images={singleAnimal?.images} breed={singleAnimal?.breed?.name} />
      <Tags tags={tags} />
      <About animal={singleAnimal?.breed} />
    </article>
  );
};

export default SingleAnimalContent;
