import { useContext } from 'react';
import { RES_CARD_IMG } from '../utilities/mockData';
import UserContext from '../utilities/userContext.js';

const RestaurantCard = (props) => {
  const { restaurantData } = props;
  const { cloudinaryImageId, name, cuisines, avgRating } = restaurantData?.info;
  const eta = restaurantData?.info?.sla?.deliveryTime;

  const { loggedInUser } = useContext(UserContext);

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
      <h5>{loggedInUser}</h5>
    </div>
  );
};

export default RestaurantCard;

// Higher order component
export const withPromotedLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div className='promoted-card-wrapper'>
        <label className='promoted-badge'>open</label>
        <RestaurantCard {...props} />
      </div>
    );
  };
};
