import React, { useState } from "react";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import DataGrid from "react-data-grid";
import ManageOrange from "../MangeOrange";
import { deleteRate } from "../../actions/rateChartActions";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";

const RateGrid = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState({});

  const dispatchProps = useDispatch();
  const userDetails = useSelector((state) => state.auth.user);

  /* Format the cell with the icon */
  const actionCellFormatter = ({ value, row }) => {
    return (
      <div className="chart_action_buttons">
        <EditIcon titleAccess="Edit" onClick={(e) => editRow(e, value, row)} />
        <DeleteIcon
          titleAccess="Delete"
          onClick={(e) => deleteRow(e, value, row)}
        />
      </div>
    );
  };

  const columns = [
    { key: "type", name: "Orange Type", width: "50%" },
    {
      key: "rate",
      name: "Orange Rate (Rs/Kg)",
      width:
        userDetails?.isSeller && props.match.path.indexOf("profile") === -1
          ? "30%"
          : "50%",
    },
  ];

  if (userDetails?.isSeller && props.match.path.indexOf("profile") === -1) {
    columns.push({
      key: "action",
      name: "Action",
      formatter: actionCellFormatter,
      width: "20%",
    });
  }

  const editRow = (e, i, data) => {
    setIsOpen(true);
    setEditData(data);
  };
  const deleteRow = (e, i, data) => {
    dispatchProps(deleteRate(data._id, userDetails.id));
  };
  return (
    <div data-test="RateGridComponent">
      <DataGrid
        columns={columns}
        rows={props.rows}
        rowsCount={3}
        enableRowSelect={false}
      />
      {isOpen && (
        <ManageOrange
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          eventType={"edit"}
          editData={editData}
        />
      )}
    </div>
  );
};

export default withRouter(RateGrid);
