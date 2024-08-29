import { useDispatch, useSelector } from "react-redux";

import LinkButton from "../../ui/LinkButton";
import EmptyCart from "./EmptyCart";
import Button from "../../ui/Button";
import CartItem from "./CartItem";

import { clearItem, getCart } from "./cartSlice";
import { getUser } from "../user/userSlice";

function Cart() {
  const dispatch = useDispatch();

  // Read data from redux store
  const cart = useSelector(getCart);
  const { username } = useSelector(getUser);

  // if cart empty return emptycart komponen
  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>

      <ul className="mt-3 divide-y divide-stone-200 border-b">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>

      <div className="mt-8 space-x-2">
        <Button type="primary" to="/order/new">
          Order pizzas
        </Button>
        <Button type="secondary" onClick={() => dispatch(clearItem())}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
