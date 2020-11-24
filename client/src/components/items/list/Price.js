import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shippingSrc from '../../ui/res/envio.png';

const Price = props => {
  const { currency, amount } = props.item.price;

  return (
    <div className="price" key={ props.item.id }>
      <div className="price-info">
        <span>{`${ currency } ${Math.round(amount)
          .toString()
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`}</span>
        {props.item.free_shipping && (
          <img className="shipping" src={ shippingSrc } alt="Envío gratis" />
        )}
        <Link to={`/items/${ props.item.id }`}>
          <span className="title">{ props.item.title }</span>
        </Link>
      </div>
    </div>
  );
};

Price.propTypes = {
  item: PropTypes.object
};

export default Price;
