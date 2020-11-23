import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { fetchItemDescription } from '../../../actions';
import * as actions from '../../../actions'
import ItemsSearch from '../../search/ItemsSearch';
import Spinner from '../../ui/Spinner';
import Breadcrumb from '../breadcrumb/Breadcrumb';
import NotFoundSearch from '../../ui/NotFoundSearch';
import './Description.scss';

const Description = props => {
   
    const params = props.match.params.id;
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch( fetchItemDescription(params));
        
    }, [ dispatch ]);

   
    const updateView = search => {
        props.fetchItems(search);
    };
    
    const renderItemDescription = item =>{
        
        const condition = item.condition === 'new' ? 'Nuevo' : 'Usado';
        const soldText = item.sold_quantity < 2 ? 'vendido' : 'vendidos';
        const status = `${condition} - ${item.sold_quantity} ${soldText}`;
        
        return(
            <div className="detail">
                <div className="content">
                    <img className="picture" src={ item.picture } alt="Imagen de Descripción" />
                    <div className="description">
                        <span className="title">Descripción del producto</span>
                        <p className="picture">{ item.description }</p>
                    </div>
                </div>
                <div className="sidebar">
                    <div className="sidebar-content">
                        <span className="status">{ status }</span>
                        <span className="title">{ item.title }</span>
                        <span className="price"> { 
                            `${ item.price.currency } 
                             ${ Math.round( item.price.amount )
                             .toString()
                             .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}` }
                        </span>
                        <span className="buy-btn">Comprar</span>
                    </div>
                </div>
            </div>
        );
    }


    return (
        <div className="item-description">
            <ItemsSearch onSubmit={ updateView } />
            { props.loading ? (
              <Spinner className="spinner-ui" />
            ) : (
            props.description &&
            ( props.description.item ? (
                <div className="offset-1 col-10">
                    <Breadcrumb categories={ props.description.item.categories } />
                    <div className="page-content">
                        { renderItemDescription(props.description.item) }
                    </div>
                </div>
            ) : (
                <NotFoundSearch />
                ))
            )}
        </div>
    )
}


const mapStateToProps = ({ description, loading }) => {
    return { description, loading };
  };
  
  export default connect(
    mapStateToProps,
    actions
  )(Description);
  