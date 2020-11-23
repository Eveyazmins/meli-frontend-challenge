import React from 'react';
import PropTypes from 'prop-types';
import './Breadcrumb.scss';

const Breadcrumb = props => {
    
  const renderCategory = i => {
    return (
      <React.Fragment key={i}>
        <span className={i === props.categories.length - 1 ? 'active' : ''}>
          {props.categories[i]}
        </span>
        {i === props.categories.length - 1 ? null : (
          <span key={i}>&nbsp;>&nbsp;</span>
        )}
      </React.Fragment>
    );
  };

  const rendering = [];

  props.categories.forEach((cat, i) => rendering.push(renderCategory(i)));

  return <div className="breadcrumb">{rendering}</div>;
};

Breadcrumb.propTypes = {
  categories: PropTypes.array
};

export default Breadcrumb;
