import { Link } from "react-router-dom";
import "../css/Navbar.css";
const Navbar = () => {
  return (
    <>
      <div className="Navbar">
        <Link
          to={"/signup"}
          style={{ color: "white", padding: "20px", marginTop: "20px" }}
        >
          Sign Up
        </Link>
        <Link
          to={"/login"}
          style={{ color: "white", padding: "20px", marginTop: "20px" }}
        >
          Log in
        </Link>
        <Link
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
      <div style={{ height: "20px" }}></div>
    </>
  );
};

export default Navbar;
