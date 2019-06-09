import React, { useContext } from "react";
import AlertContext from "../../Context/alert/AlertContext";

const Alert = () => {
  const alertContext = useContext(AlertContext);

  const { alert } = alertContext;

  return (
    alertContext.alert !== null && (
      <div className={`alert alert-${alert.type}`}>
        <i className="fas fa-info-circle"> {alert.message}</i>
      </div>
    )
  );
};

export default Alert;
