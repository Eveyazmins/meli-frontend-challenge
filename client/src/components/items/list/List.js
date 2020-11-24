import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchItems } from '../../../actions';
import * as actions from '../../../actions';
import ItemsSearch from '../../search/ItemsSearch';
import Spinner from '../../ui/Spinner';
import Breadcrumb from '../breadcrumb/Breadcrumb';
import NotFoundSearch from '../../ui/NotFoundSearch';
import Price from './Price';
import './List.scss';

const List = props  => {

  //Obtengo el texto de busqueda desde el location y lo guardo en query

    const query = new URLSearchParams(props.location.search).get(
        'search'
        );
    
    const dispatch = useDispatch();

    //Ante cualquier cambio en la query se dispara el fetchItems
    useEffect(() => {
       query ? dispatch( fetchItems(query)) : props.history.push('/');
    }, [ dispatch ])
    

    /*Con cada busqueda en el buscador, desde el componente List, actualizo la vista del search. Al componente search le mando
    un onSubmit. Si paso un search, hace la busqueda. Sino redirecciona a / */

    const updateView = search => {
       props.fetchItems(search);
    };
  
    //Por cada item, traigo imagen, descripcion, precio
  
    const renderItem = item => {
        return (
          <div key={ item.id } className="item">
            <div className="item-container">
              <Link to={`/items/${ item.id }`}>
                <img className="picture" src={ item.picture } alt="Imagen de Lista" />
              </Link>
              <div className="list-item-description">
                <Price item={ item } />
              </div>
            </div>
          </div>
        );
      };
    
      //Recorro el array de items y los guardo en un nuevo array 
      const renderItems = () => {
        const rendering = [];
        
        props.items.items.forEach((item, i) => {
            rendering.push(renderItem(item));
      
            if (i !== props.items.items.length - 1)
              rendering.push(<div key={i} className="separator" />);
          });
        
        return rendering;
      };
      
    

    return (
        <div className= "items-list">
          <ItemsSearch onSubmit={updateView}/>
          { props.loading ? (
            <Spinner className="spinner-ui"/>
          ): (
            props.items && props.items.items.length ? (
              <div className="offset-1 col-10">
                <Breadcrumb categories={props.items.categories} />
                <div className="page-content">
                  <div className="list"> {renderItems()}</div>
                </div>
              </div>
            ) : (
              <NotFoundSearch/>
            )
          )}
        </div>
    );
}

/** El connect le hace un append de los estados elegidos del store global al componente que se le pasa como segundo (), en este caso mi componente List. 
 * En este caso, items y loading. Los mismos en el componente List los voy a recuperar como props.
*/


const mapStateToProps = ( { items, loading } ) => {
  return { items, loading };
}

export default connect(
  mapStateToProps,
  actions
)(List);