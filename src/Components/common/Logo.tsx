import { Link } from "react-router-dom";
import logo from "../../assets/laborly-logo.png";

const Logo = () => {
  return (
    <Link to="/">
      <img
        src={logo}
        alt="Laborly-logo"
        className="w-[5rem] md:w-[7rem] max-w-24"
      />
    </Link>
  );
};

export default Logo;
