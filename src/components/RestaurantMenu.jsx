import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useRestaurantMenu from '../utilities/useRestaurantMenu';
import { RestaurantCategory } from './RestaurantCategory';

const RestaurantMenu = () => {
  const { id } = useParams();
  const resMenu = useRestaurantMenu(id);

  if (resMenu.length === 0) {
    return <p>Loading.....</p>;
  }

  const name = resMenu?.data?.cards[2]?.card?.card?.info?.name;
  const cards =
    resMenu?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards;
  const menus = cards.filter((menu) => {
    return (
      menu?.card?.card?.['@type'] ===
      'type.googleapis.com/swiggy.presentation.food.v2.ItemCategory'
    );
  });

  return (
    <div className='restaurant-menu-container'>
      <h1 className='menu-title'>{name + ' Menu'}</h1>
      <div className='menu-categories'>
        {menus.map((menu) => {
          return (
            <RestaurantCategory
              key={menu?.card?.card?.title}
              data={menu?.card?.card}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RestaurantMenu;
