import { Line } from "react-chartjs-2";
import { Col, Row, Typography } from "antd";

import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinChartData = coinHistory?.data?.history?.map((value) => ({
    x: value.timestamp,
    y: value.price,
  }));

  const data = {
    labels: coinChartData?.map((value) =>
      new Date(value.x * 1000).toLocaleString()
    ),
    datasets: [
      {
        label: "Price In USD",
        data: coinChartData,
        fill: true,
        backgroundColor: "rgba(14,230,190,0.1)",
        borderColor: "#0EE6BE",
      },
    ],
  };

  const options = {
    responsive: true,
  };

  return (
    <>
      <Row className="chart-header">
        <Typography.Title level={3} className="chart-title">
          {coinName} Price Chart{" "}
        </Typography.Title>
        <Col className="price-container">
          <Typography.Title level={5} className="price-change">
            Change: {coinHistory?.data?.change}%
          </Typography.Title>
          <Typography.Title level={5} className="current-price">
            Current {coinName} Price: ${currentPrice}
          </Typography.Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;
