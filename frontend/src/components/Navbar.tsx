import { Link } from "react-router-dom";
import "../css/Navbar.css";
const Navbar = () => {
  return (
    <>
      <div className="Navbar">
        <Link
          className="hover:underline"
          to={"/signup"}
          style={{ color: "white", padding: "20px", marginTop: "20px" }}
        >
          Sign Up
        </Link>
        <Link
          className="hover:underline"
          to={"/login"}
          style={{ color: "white", padding: "20px", marginTop: "20px" }}
        >
          Log in
        </Link>
        <Link
          className="hover:underline"
          to={"/rpg"}
          style={{
            color: "white",
            padding: "20px",
            marginTop: "20px",
            paddingTop: "30px",
          }}
        >
          RPG
        </Link>
      </div>
      <div style={{ height: "60px" }}></div>
    </>
  );
};

export default Navbar;
