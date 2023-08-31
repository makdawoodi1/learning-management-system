import React, { useState } from "react";
import { Card, CardBody, Row, Col } from "reactstrap";
import { MdIncompleteCircle } from 'react-icons/md'

//Import Charts
import ReactApexChart from "react-apexcharts";
import "/assets/dashboard-assets/scss/_dashboard.scss";

const TopCourses = () => {
  const [state, setState] = useState({
    series: [42, 26, 15],
    options: {
      labels: ["Product A", "Product B", "Product C"],
      plotOptions: {
        pie: {
          donut: {
            size: "75%",
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      colors: ["#5664d2", "#1cbb8c", "#eeb902"],
    },
  });

  return (
    <Card>
      <CardBody>
        <div className="float-end">
          <select className="form-select form-select-sm">
            <option defaultValue>Apr</option>
            <option value="1">Mar</option>
            <option value="2">Feb</option>
            <option value="3">Jan</option>
          </select>
        </div>
        <h4 className="card-title mb-4">Sales Analytics</h4>

        <div id="donut-chart" className="apex-charts">
          <ReactApexChart
            options={state.options}
            series={state.series}
            type="donut"
            height="250"
          />
        </div>

        <Row>
          <Col xs={4}>
            <div className="text-center mt-4">
              <p className="mb-2 text-truncate">
                <MdIncompleteCircle className="text-primary font-size-10 me-1" />
                Product A
              </p>
              <h5>42 %</h5>
            </div>
          </Col>
          <Col xs={4}>
          <div className="text-center mt-4">
              <p className="mb-2 text-truncate">
                <MdIncompleteCircle className="text-primary font-size-10 me-1" />
                Product A
              </p>
              <h5>26 %</h5>
            </div>
          </Col>
          <Col xs={4}>
          <div className="text-center mt-4">
              <p className="mb-2 text-truncate">
                <MdIncompleteCircle className="text-primary font-size-10 me-1" />
                Product A
              </p>
              <h5>42 %</h5>
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default TopCourses;
