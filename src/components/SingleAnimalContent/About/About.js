import React from 'react';
import Rating from 'react-rating';
import './About.scss';

const About = ({ animal }) => {
  return (
    <section className="wrapper-about">
      {animal?.description && (
        <div className="content-row">
          <div className="content-title">Description</div>
          <div className="content-text">{animal?.description}</div>
        </div>
      )}

      {animal?.temperament && (
        <div className="content-row">
          <div className="content-title">Temperament</div>
          <div className="content-text">{animal?.temperament}</div>
        </div>
      )}

      {animal?.height && (
        <div className="content-row">
          <div className="content-title">Height</div>
          <div className="content-text">{animal?.height?.imperial}</div>
        </div>
      )}

      {animal?.weight && (
        <div className="content-row">
          <div className="content-title">Weight</div>
          <div className="content-text">{animal?.weight?.imperial} lbs</div>
        </div>
      )}

      {animal?.life_span && (
        <div className="content-row">
          <div className="content-title">Life span</div>
          <div className="content-text">{`${animal?.life_span} ${
            !animal?.life_span.includes('years') && 'years'
          }`}</div>
        </div>
      )}

      {animal?.bred_for && (
        <div className="content-row">
          <div className="content-title">Bred for</div>
          <div className="content-text">{animal?.bred_for}</div>
        </div>
      )}

      {animal?.child_friendly && (
        <div className="content-row">
          <div className="content-title">Child Friendly</div>
          <div className="content-text">
            <Rating initialRating={animal?.child_friendly} readonly />
          </div>
        </div>
      )}

      {animal?.stranger_friendly && (
        <div className="content-row">
          <div className="content-title">Stranger Friendly</div>
          <div className="content-text">
            <Rating initialRating={animal?.stranger_friendly} readonly />
          </div>
        </div>
      )}

      {animal?.health_issues && (
        <div className="content-row">
          <div className="content-title">Health Issues</div>
          <div className="content-text">
            <Rating initialRating={animal?.health_issues} readonly />
          </div>
        </div>
      )}

      {animal?.social_needs && (
        <div className="content-row">
          <div className="content-title">Social Needs</div>
          <div className="content-text">
            <Rating initialRating={animal?.social_needs} readonly />
          </div>
        </div>
      )}
    </section>
  );
};

export default About;
