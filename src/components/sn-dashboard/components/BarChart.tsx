import React, { memo } from "react";
import { Box, Stack } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
  elements,
} from "chart.js";
import { Bar, ChartProps } from "react-chartjs-2";
import { formatNumber } from "utils/index";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

const labels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const BarChart = () => {
  return (
    <Box position="relative" sx={{ minHeight: 350, flex: 1 }}>
      <Box position="absolute" sx={{ width: "100%", height: "100%" }}>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <Bar options={options as any} data={data} />
      </Box>
    </Box>
  );
};

export default memo(BarChart);

const data: ChartData<"bar", number[], string> = {
  labels,
  datasets: [
    {
      data: [10, 20, 30, 25, 40, 32, 20, 60, 50, 70, 50, 50],
      backgroundColor: "#F2EFFF",
      hoverBackgroundColor: "#3699FF",
      borderRadius: 16,
      borderSkipped: false,
    },
  ],
};

const options: ChartProps["options"] = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: "Monthly Earning",
      position: "top",
      align: "start",
      padding: {
        top: 10,
        bottom: 30,
      },
      color: "#BABCC6",
      font: {
        size: 14,
        lineHeight: 1.57,
      },
    },
    tooltip: {
      backgroundColor: "#212121",
      usePointStyle: true,
      yAlign: "bottom",
      bodyFont: {
        size: 12,
        weight: "600",
      },
      callbacks: {
        title: () => "",
        label: (ctx) => ` ${formatNumber(ctx.parsed.y)}%`,
        labelTextColor: () => "#FFFFFF",
        labelPointStyle: () => {
          const image = new Image(14, 7);
          image.src = "/images/ic-trend.svg";
          return {
            pointStyle: image,
            rotation: 0,
          };
        },
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
        drawTicks: false,
      },
      border: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
        drawTicks: false,
      },
      border: {
        display: false,
      },
      ticks: {
        display: false,
        color: ["red", "blue"],
      },
    },
  },
};
