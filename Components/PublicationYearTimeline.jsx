import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PublicationYearTimeline = ({ books }) => {
  const labels = ['2000-2010', '2011-2019', '2020+'];

  const [chartData, setChartData] = useState({
    labels: labels,
    datasets: [{
      label: 'Books Published',
      data: [0, 0, 0],
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
    }]
  });

  useEffect(() => {
    const yearCounts = [0, 0, 0]; // Corresponds to the three ranges

    books.forEach(book => {
      const year = new Date(book.volumeInfo.publishedDate).getFullYear();
      if (!isNaN(year)) {
        if (year >= 2000 && year <= 2010) yearCounts[0]++;
        else if (year >= 2011 && year <= 2019) yearCounts[1]++;
        else if (year > 2019) yearCounts[2]++;
      }
    });

    setChartData(prevData => ({
      ...prevData,
      datasets: [{
        ...prevData.datasets[0],
        data: yearCounts,
      }]
    }));
  }, [books]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Publication Year Timeline',
      },
    },
    scales: {
      x: {
        type: 'category',
        labels: labels,
      }
    }
  };

  return (
    <div className='pub-chart'>
        <Bar data={chartData} options={options} />
    </div>
  )
};

export default PublicationYearTimeline;