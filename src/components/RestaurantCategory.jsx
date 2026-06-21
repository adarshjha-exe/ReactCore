import { useState } from 'react';
import { ItemList } from './ItemList';

export const RestaurantCategory = ({ data }) => {
  const [showItems, setShowItems] = useState(false);

  const handleClick = () => {
    setShowItems(!showItems);
  };

  return (
    <div className='category-section'>
      {/* Header */}
      <div className='category-header' onClick={handleClick}>
        <span className='category-title'>
          {data.title}{' '}
          <span className='item-count'>({data.itemCards.length})</span>
        </span>
        <span className='dropdown-icon'>🔽</span>
      </div>
      {/* Content - on click then Items should hide or show */}
      <div className='category-items'>
        {showItems && <ItemList items={data} />}
      </div>
    </div>
  );
};
