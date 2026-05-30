// import { resData } from '../utilities/mockData.js';
import { useState } from 'react';
import RestaurantCard from '../components/RestaurantCard';

const Body = () => {
  // use state variable
  let [resData] = useState([
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

  // Normal JS variable
  // let resData =[...]
  return (
    <div id='main-body'>
      <div id='body-search-bar'>
        <input id='input-txt' type='text'></input>
        <button type='submit'>Search</button>
        <button
          id='top-rated-res-btn'
          type='submit'
          onClick={() => {
            console.log('clicked');
            resData = resData.filter((resData) => {
              return resData.card.card.info.avgRating > 4;
            });
            console.log(resData);
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
