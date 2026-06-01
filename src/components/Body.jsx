import { restaurantData } from '../utilities/mockData.js';
import { useState } from 'react';
import RestaurantCard from '../components/RestaurantCard';

const Body = () => {
  // use state variable
  const [resData, setResData] = useState(restaurantData);

  return (
    <div id='main-body'>
      <div id='body-search-bar'>
        <input id='input-txt' type='text'></input>
        <button type='submit'>Search</button>
        <button
          id='top-rated-res-btn'
          type='submit'
          onClick={() => {
            let filteredResData = resData.filter((resData) => {
              return resData.card.card.info.avgRating >= 4.5;
            });
            setResData(filteredResData);
          }}
        >
          Top Rated Restaurants
        </button>
      </div>
      <div id='body-res-container'>
        {resData.map((restaurant, index) => (
          <RestaurantCard key={index} restaurantData={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Body;
