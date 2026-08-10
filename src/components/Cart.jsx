import { useSelector } from 'react-redux';
import { ItemList } from './ItemList';

const Cart = () => {
  // I want cart items here, so we need to subscribe to the store

  const cartItems = useSelector((store) => store.cart.items);
  console.log(cartItems);

  return (
    <div>
      <h1>Cart</h1>
      <ItemList items={cartItems} />
    </div>
  );
};

export default Cart;
