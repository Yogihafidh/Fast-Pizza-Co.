import { Link } from "react-router-dom";

function Button({ children, disabled, to, type }) {
  const base =
    "focus:colors rounded-full bg-yellow-400 text-sm font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 active:bg-yellow-700 disabled:bg-yellow-700 ";

  const styles = {
    primary: base + " px-4 py-3 md:px-6 md:py-4 ",
    small: base + " px-4 py-2 md:px-5 md:py-2.5 text-xs",
    secondary:
      "focus:colors rounded-full border-2 border-stone-400 text-sm px-4 py-3 md:px-6 md:py-4 font-semibold uppercase tracking-wide text-stone-800 transition-colors hover:text-stone-800 duration-300 hover:bg-stone-300 focus:bg-stone-300 focus:outline-none focus:ring focus:ring-stone-300 focus:ring-offset-2 active:bg-yellow-700 disabled:bg-yellow-700",
  };

  // Return Link jika to terdapat nilai
  if (to)
    return (
      <Link className={styles[type]} to={to}>
        {children}
      </Link>
    );

  // Return button jika tidak terdapat to
  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
