import React from 'react';

const WarningMessage = (props) =>
    <div>
        <p className="alert alert-danger">{props.message}. <a className="btn btn-link" href="https://ziggeo.com"> Visit Ziggeo link for more </a> </p>
    </div>;

export default WarningMessage;