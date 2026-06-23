import { restaurantData } from '../utilities/mockData.js';
import { useState, useEffect, useContext } from 'react';
import RestaurantCard, {
  withPromotedLabel,
} from '../components/RestaurantCard';
import Shimmer from '../components/Shimmer.jsx';
import { Link } from 'react-router-dom';
import useOnlineStatus from '../utilities/useOnlineStatus.jsx';
import UserContext from '../utilities/UserContext.js';

const Body = () => {
  const [resData, setResData] = useState([]);
  const [filteredRes, setFilteredRes] = useState([]);
  const [searchText, setSearchText] = useState('');
  const onlineStatus = useOnlineStatus();

  // HOC
  const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);

  // 2. using the context
  const { loggedInUser, setUserName } = useContext(UserContext);

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
        setFilteredRes(fetchedData);
      }
    } catch (error) {
      console.error('Error fetching restaurant data:', error);
    }
  }
  if (!onlineStatus) return <h1>Ooops ! Looks like you are offline</h1>;
  if (resData.length === 0) {
    return <Shimmer />;
  }
  return (
    <div id='main-body'>
      <div id='body-search-bar'>
        <input
          id='input-txt'
          type='text'
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        ></input>
        <button
          type='submit'
          onClick={() => {
            const filteredRestaurants = resData.filter((res) => {
              return res.info.name
                .toLowerCase()
                .includes(searchText.toLowerCase());
            });
            setFilteredRes(filteredRestaurants);
          }}
        >
          Search
        </button>
        <button
          id='top-rated-res-btn'
          type='submit'
          onClick={() => {
            let filteredResData = resData.filter((restaurant) => {
              return restaurant?.info?.avgRating >= 4.5;
            });
            setFilteredRes(filteredResData);
          }}
        >
          Top Rated Restaurants
        </button>
        {/* 3. In entire app input text will be there  */}
        <input
          type='text'
          value={loggedInUser}
          onChange={(e) => {
            console.log(e.target.value);
            setUserName(e.target.value);
          }}
        />
      </div>
      <div id='body-res-container'>
        {filteredRes.map((restaurant, index) => {
          return (
            <Link
              to={'/restaurant/' + restaurant?.info?.id}
              key={restaurant?.info?.id}
            >
              {restaurant?.info?.isOpen ? (
                <RestaurantCardPromoted restaurantData={restaurant} />
              ) : (
                <RestaurantCard restaurantData={restaurant} />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Body;
