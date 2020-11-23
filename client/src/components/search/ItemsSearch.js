import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './ItemsSearch.scss';
import logo from '../ui/res/logo.png';
import lupa from '../ui/res/lupa.png';

const ItemsSearch = props => {
    
    //Con location me traigo el path de busqueda (?search=${search})
    const query =
    props.location.pathname === '/items' &&
    new URLSearchParams(props.location.search).get('search');

    /*Obtengo el valor actualizado de search / actualizo el valor de search con cada cambio en el input */

    const [search, setSearch] = useState(query ? query : '');
    

  const handleSubmit = e => {
    e.preventDefault();

    if (search) {
      
      props.history.push(`/items?search=${ search }`);
      props.onSubmit && props.onSubmit(search);
    }
  };

  const renderIcon = () => {
    return (
      <div className="input-group-prepend">
        <Link to="/">
          <img className="logo" src={ logo } alt="Mercado Libre" />
        </Link>
      </div>
    );
  };

  const renderInput = () => {
    return (
      <input
        id="searchInput"
        className="form-control"
        type="text"
        name="search"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Nunca dejes de buscar"
      />
    );
  };

  const renderButton = () => {
    return (
      <div className="input-group-prepend">
        <span className="search-btn" onClick={ handleSubmit }>
          <img src={lupa} alt="Búsqueda" />
        </span>
      </div>
    );
  };

  return (
    <div className="search">
      <div className="wide-background" />
      <form name="search" onSubmit={ handleSubmit }>
        <div className="row">
          <div className="offset-1 col-10 form-group">
            <div className="search-container">
              {renderIcon()}
              {renderInput()}
              {renderButton()}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

ItemsSearch.propTypes = {
  onSubmit: PropTypes.func
};

//exporta el componente con router 
export default withRouter(ItemsSearch);
