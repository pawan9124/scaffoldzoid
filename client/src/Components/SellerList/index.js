import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Reusable/Cards";
import { fetchAllProfiles } from "../../actions/profileActions";
import "./style.css";

const SellerList = (props) => {
  const userDetails = useSelector((state) => state?.auth?.user);
  const allSellerProfiles = useSelector((state) => state?.profile?.allProfiles);
  const dispatchProps = useDispatch();
  /* Fetchig all profiles from the backend */
  useEffect(() => {
    dispatchProps(fetchAllProfiles());
  }, []);
  return (
    <div className="seller_section" data-test="SellerListComponent">
      <h5>Hello, {userDetails.username}</h5>
      <p className="sellers_list_desc">
        Please browser through the list of the orange sellers and click on image
        or name to view their profile to see list of types of oranges and their
        rates.{" "}
      </p>
      <div className="seller_list">
        {allSellerProfiles.map((profile, index) => (
          <Card key={profile._id} {...profile} />
        ))}
      </div>
    </div>
  );
};

export default SellerList;
