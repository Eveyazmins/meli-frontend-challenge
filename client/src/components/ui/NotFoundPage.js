import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col-md-auto">
          <h4>Parece que esta página no existe</h4>
          <Link to="/">Ir a la página principal</Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
