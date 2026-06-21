export const ItemList = (data) => {
  const itemCards = data?.items?.itemCards;
  return itemCards.map((items, index) => {
    const price =
      items.card.info.price / 100 || items.card.info.defaultPrice / 100;
    return (
      <div key={index} className='menu-item'>
        <div className='item-header'>
          <h3 className='item-name'>{items.card.info.name}</h3>
          <span className='item-price'>₹{price}</span>
        </div>
        <p className='item-description'>{items.card.info.description}</p>
      </div>
    );
  });
};
