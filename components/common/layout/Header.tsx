import { clsx } from "clsx";

function Header() {
  return (
    <div
      className={clsx(
        "flex flex-row py-6 px-10 bg-dark justify-between items-center",
        ""
      )}
    ></div>
  );
}

export default Header;
