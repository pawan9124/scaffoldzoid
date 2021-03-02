import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import PropTypes from "prop-types";
import "./style.css";

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Cards(props) {
  const classes = useStyles();

  return (
    <Card className={`${classes.root} card_style`} data-test="cardComponent">
      <CardContent>
        <div className="card_section">
          <div className="card_image_section">
            <Link to={`/profile/${props?.user?._id}`}>
              <Avatar alt="C" src={props?.avatar} className="card_image" />
            </Link>
          </div>
          <div className="card_details">
            <Link to={`/profile/${props?.user?._id}`}>
              <div className="card_username">{props?.user?.username}</div>
            </Link>
            <div className="card_description">
              <p>{props?.description.slice(0, 75) + "..."}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
