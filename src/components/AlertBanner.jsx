import React from "react";

export function AlertBanner() {
  return (
    <div className="alert alert-danger alert-dismissible show" role="alert">
      <h3 className="alert-heading">Oooops!</h3>
      <p>
        {" "}
        Apologies but we could not load new cats for you at this time! Miau!{" "}
      </p>
    </div>
  );
}

export default AlertBanner;
