import { useSelector } from "react-redux";

function Username() {
  // Get data from store redux
  const username = useSelector((store) => store.user.username);

  if (!username) return null;

  return (
    <div className="hidden text-sm font-semibold md:block">{username}</div>
  );
}

export default Username;
