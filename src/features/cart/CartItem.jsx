import { useSelector } from "react-redux";

import { formatCurrency } from "../../utils/helpers";
import { getCurrentQuantityById } from "./cartSlice";

import DeleteItem from "./DeleteItem";
import UpdateItemQuantity from "./UpdateItemQuantity";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  // Read data from redux store base on ID pizza
  const currentQuantity = useSelector(getCurrentQuantityById(pizzaId));

  return (
    <li className="sm:item-center py-3 sm:flex sm:justify-between">
      <p>
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <UpdateItemQuantity
          pizzaId={pizzaId}
          currentQuantity={currentQuantity}
        />
        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
