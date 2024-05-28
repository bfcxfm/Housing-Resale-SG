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
    let contrastWithBlack = 0;
    // let contrastWithWhite = 0;
    let attempts = 0;

    // Helper function to calculate luminance
    const getLuminance = (r, g, b) =>
      (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

    // Helper function to calculate contrast ratio
    const getContrastRatio = (lum1, lum2) =>
      (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05);

    while (contrastWithBlack < 4.5 && attempts < 100) {
      r = Math.floor(Math.random() * 255);
      g = Math.floor(Math.random() * 255);
      b = Math.floor(Math.random() * 255);

      const newLuminance = getLuminance(r, g, b);
      const blackLuminance = getLuminance(26, 32, 44);
      // const whiteLuminance = getLuminance(255, 255, 255);

      contrastWithBlack = getContrastRatio(newLuminance, blackLuminance);
      // contrastWithWhite = getContrastRatio(newLuminance, whiteLuminance);

      // Ensure the new color also has a minimum contrast with existing generated colors
      const contrastWithGeneratedColors = generatedColors.reduce(
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

      // Ensure contrast with generated colors is also sufficient
      if (contrastWithGeneratedColors >= 1.5) {
        attempts++;
      } else {
        contrastWithBlack = 0;
        // contrastWithWhite = 0;
      }
    }

    generatedColors.push([r, g, b]);
    return `rgba(${r}, ${g}, ${b}, 0.5)`;
  }

  // function getRandomColor() {
  //   let h, s, l;
  //   let contrastWithBlack = 0;
  //   let contrastWithWhite = 0;
  //   let attempts = 0;

  //   // Helper function to calculate luminance directly from HSL
  //   const getLuminanceFromHSL = (h, s, l) => {
  //     s /= 100;
  //     l /= 100;
  //     const a = s * Math.min(l, 1 - l);
  //     const f = (n) =>
  //       l -
  //       a *
  //         Math.max(
  //           Math.min(((n + h / 30) % 12) - 3, 9 - ((n + h / 30) % 12), 1),
  //           -1
  //         );
  //     return 0.2126 * f(0) + 0.7152 * f(8) + 0.0722 * f(4);
  //   };

  //   // Pre-calculate black and white luminance
  //   const blackLuminance = getLuminanceFromHSL(0, 0, 11); // Approx. RGB(26, 32, 44)
  //   const whiteLuminance = getLuminanceFromHSL(0, 0, 100); // RGB(255, 255, 255)

  //   // Helper function to calculate contrast ratio
  //   const getContrastRatio = (lum1, lum2) =>
  //     (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05);

  //   while (
  //     (contrastWithBlack < 4.5 || contrastWithWhite < 4.5) &&
  //     attempts < 100
  //   ) {
  //     h = Math.floor(Math.random() * 360);
  //     s = Math.floor(Math.random() * 61) + 40; // Saturation between 40-100 for vibrancy
  //     l = Math.floor(Math.random() * 41) + 30; // Lightness between 30-70 for vibrancy

  //     const newLuminance = getLuminanceFromHSL(h, s, l);

  //     contrastWithBlack = getContrastRatio(newLuminance, blackLuminance);
  //     contrastWithWhite = getContrastRatio(newLuminance, whiteLuminance);

  //     // Ensure the new color also has a minimum contrast with existing generated colors
  //     const contrastWithGeneratedColors = generatedColors.reduce(
  //       (minContrast, [existingH, existingS, existingL]) => {
  //         const existingLuminance = getLuminanceFromHSL(
  //           existingH,
  //           existingS,
  //           existingL
  //         );
  //         const currentContrast = getContrastRatio(
  //           newLuminance,
  //           existingLuminance
  //         );
  //         return Math.min(minContrast, currentContrast);
  //       },
  //       Infinity
  //     );

  //     // Ensure contrast with generated colors is also sufficient
  //     if (contrastWithGeneratedColors >= 4.5) {
  //       attempts++;
  //     } else {
  //       contrastWithBlack = 0;
  //       contrastWithWhite = 0;
  //     }
  //   }

  //   generatedColors.push([h, s, l]);
  //   return `hsla(${h}, ${s}%, ${l}%, 0.6)`;
  // }

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
        storey: item["storey_range"],
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
      y: {
        ticks: {
          // Include a callback function to format the y-axis labels
          callback: function (value, index, values) {
            // Convert the value to thousands (1000k)
            return value / 1000 + "K";
          },
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
              context.parsed.y / 1000 + "K"
            }, ${context.raw.storey} STOREY, ${
              context.raw.area
            } M², PSF $${parseFloat(context.raw.r * 100).toFixed(0)}`;
          },
        },
      },
    },
  };

  // console.log(data);

  return <Bubble data={data} options={options} />;
}
