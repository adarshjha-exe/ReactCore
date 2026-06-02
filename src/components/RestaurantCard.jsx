import { RES_CARD_IMG } from '../utilities/mockData';

const RestaurantCard = (props) => {
  const { restaurantData } = props;
  const { cloudinaryImageId, name, cuisines, avgRating } = restaurantData?.info;
  const eta = restaurantData?.info?.sla?.deliveryTime;
  return (
    <div className='res-main-div'>
      <img
        id='res-img'
        src={`${RES_CARD_IMG}/${cloudinaryImageId}`}
        alt='res-img'
      />
      <h3>{name}</h3>
      <h4>{cuisines?.join(', ')}</h4>
      <h4>{avgRating} stars</h4>
      <h4>{eta} minutes</h4>
    </div>
  );
};

export default RestaurantCard;
