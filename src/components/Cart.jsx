import { useDispatch, useSelector } from 'react-redux';
import { ItemList } from './ItemList';
import { clearItems } from '../utilities/cartSlice';

const Cart = () => {
  // I want cart items here, so we need to subscribe to the store

  const cartItems = useSelector((store) => store.cart.items);
  console.log(cartItems);

  const dispatch = useDispatch();

  const handleClearCart = () => {
    // on button click dispatch an action
    dispatch(clearItems());
  };

  return (
    <div>
      <h1>Cart</h1>
      <button type='button' onClick={() => handleClearCart()}>
        Clear Cart
      </button>
      <ItemList items={cartItems} />
      {cartItems.length === 0 && (
        <h1>Cart is Empty,  Add items to your cart </h1>
      )}
    </div>
  );
};

export default Cart;
