import { ItemList } from './ItemList';

export const RestaurantCategory = ({ data }) => {
  return (
    <div className='category-section'>
      {/* Header */}
      <div className='category-header'>
        <span className='category-title'>
          {data.title}{' '}
          <span className='item-count'>({data.itemCards.length})</span>
        </span>
        <span className='dropdown-icon'>🔽</span>
      </div>
      {/* Content */}
      <div className='category-items'>
        <ItemList items={data} />
      </div>
    </div>
  );
};
