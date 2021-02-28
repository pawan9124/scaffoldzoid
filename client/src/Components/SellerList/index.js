import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Reusable/Cards";
import { fetchAllProfiles } from "../../actions/profileActions";
import "./style.css";

const SellerList = () => {
  const userDetails = useSelector((state) => state?.auth?.user);
  const allSellerProfiles = useSelector((state) => state?.profile?.allProfiles);
  const dispatchProps = useDispatch();
  /* Fetchig all profiles from the backend */
  useEffect(() => {
    dispatchProps(fetchAllProfiles());
  }, []);
  return (
    <div className="seller_section">
      <h5>Hello, {userDetails.username}</h5>
      <div className="seller_list">
        {allSellerProfiles.map((profile, index) => (
          <Card key={profile._id} {...profile} />
        ))}
      </div>
    </div>
  );
};

export default SellerList;
