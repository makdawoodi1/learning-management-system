import React from "react";
import { Card, CardBody } from "reactstrap";
import { BiStoreAlt } from 'react-icons/bi'

const CurrentMonth = () => {
  return (
    <Card>
      <CardBody>
        <div className="d-flex">
          <div className="flex-1 overflow-hidden">
            <p className="text-truncate font-size-14 mb-2">Current Month</p>
            <h4 className="mb-0">1452</h4>
          </div>
          <div className="text-primary">
            <BiStoreAlt size={24} />
          </div>
        </div>
      </CardBody>

      <CardBody className="border-top py-3">
        <div className="text-truncate">
          <span className="badge badge-soft-success font-size-11 text-primary me-1">
            + 2.4 %
          </span>
          <span className="text-muted ms-2">From Previous Period</span>
        </div>
      </CardBody>
    </Card>
  );
};

export default CurrentMonth;
