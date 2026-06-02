import { restaurantData } from '../utilities/mockData.js';
import { useState, useEffect } from 'react';
import RestaurantCard from '../components/RestaurantCard';
import Shimmer from '../components/Shimmer.jsx';

const Body = () => {
  // use state variable
  const [resData, setResData] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      restaurantDataFetch();
    }, 1000);
  }, []);

  async function restaurantDataFetch() {
    try {
      const result = await fetch(
        'https://corsproxy.io/?url=' +
          encodeURIComponent(
            'https://www.swiggy.com/dapi/restaurants/list/v5?lat=20.27060&lng=85.83340&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING',
          ),
      );
      const data = await result.json();
      const fetchedData =
        data?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants;
      if (fetchedData && fetchedData.length > 0) {
        setResData(fetchedData);
      }
    } catch (error) {
      console.error('Error fetching restaurant data:', error);
    }
  }
  if (resData.length === 0) {
    return <Shimmer />;
  }
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
              return resData?.info?.avgRating >= 4.5;
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
