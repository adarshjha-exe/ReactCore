const RestaurantCard = (props) => {
  const { restaurantData } = props;
  const { cloudinaryImageId, name, cuisines, avgRating, eta } =
    restaurantData.card.card.info;
  return (
    <div className='res-main-div'>
      <img
        id='res-img'
        src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_600/${cloudinaryImageId}`}
        alt='res-img'
      />
      <h3>{name}</h3>
      <h4>{cuisines}</h4>
      <h4>{avgRating} stars</h4>
      <h4>{eta} minutes</h4>
    </div>
  );
};

export default RestaurantCard;
