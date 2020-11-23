import React from 'react'

const NotFoundSearch = () => {
    return (
        <div className="offset-1 col-10">
            <div className="page-content">
                <h3>No hay publicaciones que coincidan con tu búsqueda.</h3>
                <ul>
                    <li>Revisá la ortografía de la palabra.</li>
                    <li>Utilizá palabras más genéricas o menos palabras.</li>
                    <li>Navega por las categorías para encontrar un producto similar.</li>
                </ul>
            </div>      
        </div>
    );
};

export default NotFoundSearch;