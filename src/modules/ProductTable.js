import React from 'react';
import '../styles/ProductTable.css';

const ProductTable = ({ storeData }) => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Unidades</th>
          </tr>
        </thead>
        <tbody>
          {storeData.data.map((product, index) => (
            <tr key={index}>
              <td>{product.Producto}</td>
              <td>{product.Unidades}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;
