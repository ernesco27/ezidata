import React from "react";
import ReactApexChart from "react-apexcharts";

function Chart({ orderCount }) {
  // Data for the bar chart

  const series = [
    {
      name: "Sales",
      data: orderCount,
    },
  ];

  // Options for the bar chart
  const options = {
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    xaxis: {
      categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    },
    fill: {
      colors: ["#5e72e4"],
    },
    dataLabels: {
      enabled: false,
    },
    title: {
      text: "Weekly Sales Report",
      align: "center",
    },
  };
  return (
    <div>
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={350}
      />
    </div>
  );
}

export { Chart };
