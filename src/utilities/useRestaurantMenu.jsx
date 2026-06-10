import { useState, useEffect } from 'react';
import { RES_MENU_URL } from './mockData';

const useRestaurantMenu = (resId) => {
  const [resMenu, setResMenu] = useState([]);
  useEffect(() => {
    fetchResMenu(resId);
  }, []);

  const fetchResMenu = async (resId) => {
    const data = await fetch(`${RES_MENU_URL + resId}`);
    const json = await data.json();
    setResMenu(json);
  };

  return resMenu;
};

export default useRestaurantMenu;
