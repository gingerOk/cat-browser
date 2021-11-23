import React, { useState, useEffect } from 'react';
import './Tags.scss';

const Tags = ({ tags }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {

    if (tags?.length) {
        const formatedItems = function() {
            return tags.map(item => {
              const str = item.replace('_', ' ');
              return str[0].toUpperCase() + str.slice(1, str.length);
            });
          };
        setItems(formatedItems);
    }
  }, [tags]);
  return (
    <section className="tags-wrapper">
      {items?.map((item, key) => (
        <div key={key} className="tag">
          {item}
        </div>
      ))}
    </section>
  );
};

export default Tags;
