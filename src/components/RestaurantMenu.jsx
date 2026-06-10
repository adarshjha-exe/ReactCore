import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useRestaurantMenu from '../utilities/useRestaurantMenu';

const RestaurantMenu = () => {
  const { id } = useParams();
  const resMenu = useRestaurantMenu(id);

  if (resMenu.length === 0) {
    return <p>Loading.....</p>;
  }

  const name = resMenu?.data?.cards[2]?.card?.card?.info?.name;
  const resMenuCards =
    resMenu?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR.cards[2]?.card
      .card.itemCards;
  console.log(resMenuCards);

  return (
    <div>
      <h1>{name + ' Menu'}</h1>
      {resMenuCards &&
        resMenuCards.map((resCard) => {
          return (
            <li key={resCard.card.info.id}>
              {resCard.card.info.name} - ₹{resCard.card.info.defaultPrice / 100}
            </li>
          );
        })}
    </div>
  );
};

export default RestaurantMenu;
