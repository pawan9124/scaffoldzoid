import React from "react";
import { Route, Redirect } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import Header from "../Components/Header";
import NotFound from "../Components/Reusable/NotFound";

const prohibtedUrls = {
  seller: ["/sellers"],
  customer: ["/chart/:id"],
};

const PrivateRoute = ({ comp: Component, auth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth.isAuthenticated === true) {
          const currentRole = auth?.user?.isSeller ? "seller" : "customer";
          const currentPath = rest?.path;
          if (prohibtedUrls[currentRole].indexOf(currentPath) === -1) {
            return (
              <div>
                <Header />
                <Component {...props} />
              </div>
            );
          } else {
            return <NotFound />;
          }
        } else {
          return <Redirect to={{ pathname: "/" }} />;
        }
      }}
    />
  );
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
