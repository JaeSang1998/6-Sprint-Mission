import React from 'react';
import './style.css';
import Heart from '../../assets/icons/Heart.svg';
import { formatNumberToWon } from '../../utils/formatNumber';

const ProductItem = ({ item }) => {
  console.log(item);
  return (
    <div className='item-container'>
      <img src={item.images[0]} alt={item.name} className='item-image' />
      <div className='item-info'>
        <span className='item-description'>{item.description}</span>
        <span className='item-price'>{formatNumberToWon(item.price)}</span>
        <div className='favorite-container'>
          <img src={Heart} alt='하트아이콘' />
          <span className='item-favoriteCount'>{item.favoriteCount}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
