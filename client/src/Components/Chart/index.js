import { useEffect, useState } from "react";
import Button from "../Reusable/Button";
import { withRouter } from "react-router-dom";
import "./style.css";
import MangeOrange from "../MangeOrange";
import { useSelector, useDispatch } from "react-redux";
import { fetchRateChart } from "../../actions/rateChartActions";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RateGrid from "../RateGrid";

/* Handling to open the modal */
function Chart(props) {
  /* Set value of the state of modal open/close */
  const [isOpen, setIsOpen] = useState(false);

  /* Get the charts details from the store of redux */
  const dispatchProps = useDispatch();

  const allChartRate = useSelector((state) => state.rates.allRates);
  const userDetails = useSelector((state) => state.auth.user);

  /* Get the details of the chart from the backend */
  useEffect(() => {
    dispatchProps(fetchRateChart(props.match.params.id));
  }, [props.match.params.id]);

  return (
    <div className="chart_section">
      <div className="chart__section_heading">
        {props.match.path.indexOf("profile") === -1 && (
          <div>
            <h3>Hello, {userDetails?.username}! </h3>
            <p>
              Manage your charts by adding, editing the existing ones and remove
              the types of oranges that are listed for the customers{" "}
            </p>
          </div>
        )}
        {!userDetails.isSeller && (
          <p>
            List of every type of best quality oranges available from this
            seller, order your favorite one.
          </p>
        )}
      </div>
      {props.match.path.indexOf("profile") === -1 && (
        <div className="chart_button">
          <Button
            type="submit"
            onClick={(e) => setIsOpen(true)}
            buttonClass="default__button profile_button btn-adjust"
            buttonLabel="Add Type"
            icon={<AddCircleIcon />}
          />
        </div>
      )}
      <div className="chat_grid">
        <RateGrid rows={allChartRate} />
      </div>
      {isOpen && (
        <MangeOrange isOpen={isOpen} setIsOpen={setIsOpen} eventType={"add"} />
      )}
    </div>
  );
}
export default withRouter(Chart);
