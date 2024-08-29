import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";

function UpdateOrder({ order }) {
  const fetcher = useFetcher();

  return (
    // fetcher.Form does not navigate, but only submits the form and revalidates the page.
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">Make priority</Button>
    </fetcher.Form>
  );
}

export default UpdateOrder;

export async function action({ request, params }) {
  // data to be changed
  const data = { priority: true };

  // calls the function that will update the data
  await updateOrder(params.orderID, data);

  // does not return anything
  return null;
}
