import React, { useEffect, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import "./style.css";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "../../axios";
import { withRouter } from "react-router-dom";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { logoutUser } from "../../actions/authActions";

function Header(props) {
  const history = useHistory();
  const userDetails = useSelector((state) => state.auth.user);
  const dispatchProps = useDispatch();
  const [autoComplete, setAutoComplete] = useState([]);

  //provide event listener to open and close the suggestion modal
  useEffect(() => {
    document.addEventListener("click", function () {
      if (document.getElementById("autocomplete") !== null) {
        document.getElementById("autocomplete").style.display = "none";
      }
    });
    return () => {
      if (document.getElementById("autocomplete") !== null) {
        document.removeEventListener("click", function () {
          document.getElementById("autocomplete").style.display = "none";
        });
      }
    };
  }, []);

  const handleAuthentication = (e) => {
    e.preventDefault();
    dispatchProps(logoutUser());
  };

  //Handling the seraching of the product and listing in the list style
  const handleSearchProduct = async (e) => {
    //Calling the search for the getting the list of items suggestion
    const response = await axios.get("/api/products/search", {
      params: { text: e.target.value },
    });
    console.log(
      "HEADER &&&$$$$ IS THE RESPONSE------------------------------------------->",
      response
    );
    if (response.data.length > 0) {
      document.getElementById("autocomplete").style.display = "block";
      setAutoComplete(response.data);
    }
  };
  //Handling the auto complete
  const handleAutoComplete = (e) => {
    const currentId = e.target.id;
    props.history.push(`/profile/${currentId}`);
  };
  return (
    <div className="header">
      <Link to="/">
        <img
          className="header__logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt="logo"
        />
      </Link>

      <div className="header__search">
        <input
          type="text"
          className="header__searchInput"
          onChange={handleSearchProduct}
        />
        <ul id="autocomplete">
          {autoComplete.length > 0 &&
            autoComplete.map((sug) => (
              <li key={sug._id} id={sug._id} onClick={handleAutoComplete}>
                {sug.keywords}
              </li>
            ))}
        </ul>
        <SearchIcon className="header__searchIcon" />
      </div>
      <div className="header__nav">
        <Link to={"/"}>
          <div onClick={handleAuthentication} className="header__option">
            <span className="header__optionLineOne">
              Hello, {userDetails?.username}
            </span>
            <span className="header__optionLineTwo">
              <ExitToAppIcon />
              &nbsp;Sign Out
            </span>
          </div>
        </Link>
        {userDetails.isSeller && (
          <div className="header__option">
            <span className="header__optionLineOne">As Seller</span>
            <Link to={`/chart/${userDetails.id}`}>
              <span className=" header__optionLineTwo header_option_link">
                <MonetizationOnIcon /> &nbsp;Modify Rate
              </span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default withRouter(Header);
