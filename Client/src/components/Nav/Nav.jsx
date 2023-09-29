import styles from "./Nav.module.css";
import { CiUser } from "react-icons/ci";
import { GrCart } from "react-icons/gr";
import { GrSearch } from "react-icons/gr";
import LoginButton from "../Auth0/LoginButton";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../Auth0/LogoutButton";
import { AiFillShop } from "react-icons/ai";
import { BsBook } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import leaf from "../../assets/leaf.png";
import { useState } from "react";
import { getProductByName } from "../../Redux/actions/product/action";
import { useDispatch } from "react-redux";

const Nav = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated } = useAuth0();
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleSearchMouseEnter = () => {
    if(searchValue){
      dispatch(getProductByName(searchValue))
      .then((response) => {
        console.log(response);
        if(response){
          console.log("hola :D")
          navigate("/shop");
          setSearchValue("");
        }
      })
      .catch((error) => {
        console.log(error);
        window.alert("No se encontró el producto");
      });
    }else{
      setSearchVisible(!isSearchVisible);
    }
    };

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <nav className={styles.nav}>
      <a href="/" className={styles.nav__brand}>
        GreenCorner <img src={leaf} className={styles.logo} />{" "}
      </a>

      <ul className={styles.nav__menu}>
        <li className={styles.nav__item}>
          <a href="/" className={styles.nav__link}>
            <div className={styles.home}>Home</div>
          </a>
        </li>
        <li className={styles.nav__item}>
          <Link to="/shop" className={styles.nav__link}>
            Products
          </Link>
        </li>
        <li className={styles.nav__item}>
          <Link to="/guide" className={styles.nav__link}>
            Guide
          </Link>
        </li>
        <li className={styles.nav__item}>
          <Link
            to="/about-us"
            className={`${styles.nav__link} ${styles.aboutUs}`}
          >
            About Us
          </Link>
        </li>
        <li className={styles.nav__item}>
          <Link to="contact-us" className={styles.nav__link}>
            Contact Us
          </Link>
        </li>
      </ul>
      <div className={styles.nav__toggler}>
        <a href="/shop" className={styles.shop}>
          <AiFillShop style={{ fontSize: "24px" }} /> <p>Products</p>
        </a>
        <a href="#" className={styles.guide}>
          <BsBook style={{ fontSize: "24px" }} /> <p>Guide</p>
        </a>
        <div className={styles.search}>
        <input
          type="text"
          placeholder="Search here..."
          className={`${styles.searchInput} ${
            isSearchVisible ? styles.searchInputVisible : ""
          }`}
          value={searchValue}
          onChange={handleInputChange}
        />
        <a href="#" className={styles.search}>
          <GrSearch onClick={handleSearchMouseEnter}  style={{ fontSize: "24px" }} /> <p>Search</p>
        </a>
        </div>
        <a href="#" className={styles.anotherClass}>
          <GrCart style={{ fontSize: "24px" }} /> <p>Cart</p>
        </a>
        {isAuthenticated ? <LogoutButton /> : <LoginButton />}
      </div>
    </nav>
  );
};

export default Nav;
