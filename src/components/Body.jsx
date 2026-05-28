import { resData } from '../utilities/mockData.js';
import RestaurantCard from '../components/RestaurantCard';

const Body = () => (
  <div id='main-body'>
    <div id='body-search-bar'>
      <input id='input-txt' type='text'></input>
      <button type='submit'>Search</button>
    </div>
    <div id='body-res-container'>
      {resData.map((restaurant, index) => (
        <RestaurantCard key={index} restaurantData={restaurant} />
      ))}
    </div>
  </div>
);

export default Body;
