import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";

import Button from "../../ui/Button";
import EmptyCart from "../cart/EmptyCart";

import { createOrder } from "../../services/apiRestaurant";
import { formatCurrency } from "../../utils/helpers";

import { getUser } from "../user/userSlice";
import { fetchAddress } from "../user/userSlice";
import { clearItem, getCart, getTotalCartPrice } from "../cart/cartSlice";
import store from "../../store";

// Phone Number Validation
// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  // Controlled element checkbox
  const [withPriority, setWithPriority] = useState(false);

  // Get data from the action
  const formError = useActionData();

  // Selector to get user
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector(getUser);
  const isLoadingAddress = addressStatus === "loading";

  // Get all data on the page about page navigation
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting"; // State

  const dispatch = useDispatch();

  // Selector to get cart
  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  // Revalidate cart
  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Lets go!</h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            className="input flex-grow"
            type="text"
            name="customer"
            defaultValue={username}
            required
          />
        </div>
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="flex-grow">
            <input className="input w-full" type="tel" name="phone" required />
            {
              // Display data to ui
              formError?.phone && (
                <p className="mt-2 px-2 text-xs text-red-600">
                  {formError.phone}
                </p>
              )
            }
          </div>
        </div>
        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="flex-grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              required
              disabled={isLoadingAddress}
              defaultValue={address}
            />
            {isLoadingAddress === "error" && (
              <p className="mt-2 px-2 text-xs text-red-600">{errorAddress}</p>
            )}
          </div>
          <span className="absolute right-1.5 top-1.5 z-20 md:right-[5px] md:top-[5px]">
            {!position.latitude && !position.longitude && (
              <Button
                type="small"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                Get Position
              </Button>
            )}
          </span>
        </div>
        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-medium" htmlFor="priority">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          {/* // Hidden input technique - Getting some data into action without being
        a form field */}
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.latitude && position.longitude
                ? `${position.latitude},${position.longitude}`
                : ""
            }
          />
          <Button type="primary" disabled={isSubmitting}>
            {isSubmitting && isLoadingAddress
              ? "Placing Order...."
              : `Order now ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

// Action function
export async function action({ request }) {
  // Get data from Form Komponen
  const formData = await request.formData();

  // Convert to object
  const data = Object.fromEntries(formData);

  // Create new order object
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  // Error handling in Form Action
  const error = {};
  if (!isValidPhone(order.phone)) {
    error.phone =
      "Please give us your correct phone number. We might need it to contact you. ";
  }
  if (Object.keys(error).length > 0) return error;

  // If everything is okay, Post order data to API and Get new data
  const newOrder = await createOrder(order);

  store.dispatch(clearItem());

  // Redirect to url (in function we use redirect function not useNavigate)
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
