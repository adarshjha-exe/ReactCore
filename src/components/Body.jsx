// import { resData } from '../utilities/mockData.js';
import { useState } from 'react';
import RestaurantCard from '../components/RestaurantCard';

const Body = () => {
  // use state variable
  let [resData, setResData] = useState([
    {
      card: {
        card: {
          info: {
            id: '305807',
            name: 'Barbeque Nation',
            cloudinaryImageId: 'pocpd4knzgptsuguulhv',
            cuisines: [
              'North Indian',
              'Barbecue',
              'Kebabs',
              'Biryani',
              'Street Food',
              'Snacks',
            ],
            avgRating: 4.2,
            eta: 43,
          },
        },
      },
    },
    {
      card: {
        card: {
          info: {
            id: '305808',
            name: 'Taj Restaurant',
            cloudinaryImageId: 'pocpd4knzgptsuguulhv',
            cuisines: ['North Indian', 'Mughlai', 'Biryani'],
            avgRating: 4.5,
            eta: 35,
          },
        },
      },
    },
    {
      card: {
        card: {
          info: {
            id: '305808',
            name: 'Taj Restaurant',
            cloudinaryImageId: 'pocpd4knzgptsuguulhv',
            cuisines: ['North Indian', 'Mughlai', 'Biryani'],
            avgRating: 3.6,
            eta: 35,
          },
        },
      },
    },
  ]);

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
              return resData.card.card.info.avgRating > 4;
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
