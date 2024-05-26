import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  BubbleController,
  LinearScale,
  PointElement,
  TimeScale,
} from "chart.js";
import { Bubble } from "react-chartjs-2";
import "chartjs-adapter-moment"; // Import the moment adapter

ChartJS.register(
  Tooltip,
  Legend,
  BubbleController,
  LinearScale,
  PointElement,
  TimeScale
);

export default function ResaleChart({ resales }) {
  let generatedColors = [];

  function getRandomColor() {
    let r, g, b;
    let contrast = 0;
    let attempts = 0;

    // Helper function to calculate luminance
    const getLuminance = (r, g, b) =>
      (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

    // Helper function to calculate contrast ratio
    const getContrastRatio = (lum1, lum2) =>
      (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05);

    while (contrast < 4.5 && attempts < 100) {
      r = Math.floor(Math.random() * 255);
      g = Math.floor(Math.random() * 255);
      b = Math.floor(Math.random() * 255);

      const newLuminance = getLuminance(r, g, b);
      contrast = generatedColors.reduce(
        (minContrast, [existingR, existingG, existingB]) => {
          const existingLuminance = getLuminance(
            existingR,
            existingG,
            existingB
          );
          const currentContrast = getContrastRatio(
            newLuminance,
            existingLuminance
          );
          return Math.min(minContrast, currentContrast);
        },
        Infinity
      );

      attempts++;
    }

    generatedColors.push([r, g, b]);
    return `rgb(${r}, ${g}, ${b}, 0.6)`;
  }

  const bubbleData = Object.values(
    resales.reduce((acc, item) => {
      const { flat_type } = item;
      if (!acc[flat_type]) {
        acc[flat_type] = {
          label: flat_type,
          backgroundColor: getRandomColor(),
          data: [],
        };
      }
      acc[flat_type].data.push({
        x: new Date(item["month"]),
        y: parseFloat(item["resale_price"]),
        r: parseFloat(
          parseFloat(item["resale_price"]) /
            parseFloat(item["floor_area_sqm"]) /
            10.764 /
            100
        ).toFixed(4),
        area: item["floor_area_sqm"],
      });
      return acc;
    }, {})
  );

  //   console.log(bubbleData);

  const data = {
    datasets: Object.values(bubbleData).map((item) => ({
      label: item.label,
      data: item.data,
      backgroundColor: item.backgroundColor,
    })),
  };

  const options = {
    scales: {
      x: {
        type: "time",
        time: {
          unit: "month",
          displayFormats: { month: "YYYY-MM" },
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const date = new Date(context.parsed.x);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            return `${context.dataset.label}: ${year}-${month}, $${
              context.parsed.y
            }, ${context.raw.area}sqm, psf$${parseFloat(
              context.raw.r * 100
            ).toFixed(0)}`;
          },
        },
      },
    },
  };

  // console.log(data);

  return <Bubble data={data} options={options} />;
}
