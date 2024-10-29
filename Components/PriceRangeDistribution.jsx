import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PriceRangeDistribution = ({ books }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: 'Number of Books',
      data: [],
      backgroundColor: 'rgba(153, 102, 255, 0.6)',
    }]
  });

  useEffect(() => {
    const priceRanges = {
      '0-10': 0,
      '10-12': 0,
      '12-13': 0,
      '13-14': 0,
      '15+': 0
    };

    books.forEach(book => {
      const price = book.saleInfo?.listPrice?.amount;
      if (price !== undefined) {
        if (price <= 10) priceRanges['0-10']++;
        else if (price <= 12) priceRanges['10-12']++;
        else if (price <= 13) priceRanges['12-13']++;
        else if (price <= 14) priceRanges['13-14']++;
        else priceRanges['15+']++;
      }
    });

    setChartData({
      labels: Object.keys(priceRanges),
      datasets: [{
        label: 'Number of Books',
        data: Object.values(priceRanges),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      }]
    });
  }, [books]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Price Range Distribution',
      },
    },
  };

  return (
    <div className='price-chart'>
        <Bar data={chartData} options={options} />
    </div>
  )
};

export default PriceRangeDistribution;