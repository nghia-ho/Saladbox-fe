import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
} from "@mui/material";

import moment from "moment";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const Sales = ({ sx, totalSale, totalSaleCustom }) => {
  const theme = useTheme();

  const past7Days = [...Array(7).keys()].map((index) => {
    const date = new Date();
    date.setDate(date.getDate() - index);
    return moment(date).format("l");
  });
  const data = {
    datasets: [
      {
        backgroundColor: "#456141",
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: totalSale,
        label: "Normal Order",
        maxBarThickness: 10,
      },
      {
        backgroundColor: "#EEe4EE",
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: totalSaleCustom,
        label: "Weekly Order",
        maxBarThickness: 10,
      },
    ],
    labels: past7Days,
  };

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    xAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary,
        },
        gridLines: {
          display: false,
          drawBorder: false,
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary,
          beginAtZero: true,
          min: 0,
        },
        gridLines: {
          borderDash: [2],
          borderDashOffset: [2],
          color: theme.palette.divider,
          drawBorder: false,
          zeroLineBorderDash: [2],
          zeroLineBorderDashOffset: [2],
          zeroLineColor: theme.palette.divider,
        },
      },
    ],
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: "index",
      titleFontColor: theme.palette.text.primary,
    },
  };

  return (
    <Card {...sx}>
      <CardHeader title="Latest Sales" />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 400,
            position: "relative",
          }}
        >
          <Bar data={data} options={options} />
        </Box>
      </CardContent>
      <Divider />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 2,
        }}
      ></Box>
    </Card>
  );
};
