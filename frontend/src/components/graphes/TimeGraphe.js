// src/TimeGraphe.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale } from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale);

const TimeGraphe = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const publicationsResponse = await axios.get('http://localhost:8000/api/publications/');
        const publications = publicationsResponse.data;

        const publicationsByDate = publications.reduce((acc, publication) => {
          const date = new Date(publication.date_publication).toISOString().split('T')[0]; // Extract date in YYYY-MM-DD format
          if (!acc[date]) {
            acc[date] = 0;
          }
          acc[date] += 1;
          return acc;
        }, {});

        const sortedDates = Object.keys(publicationsByDate).sort();

        setChartData({
          labels: sortedDates,
          datasets: [
            {
              label: 'Nombre de publications',
              data: sortedDates.map(date => publicationsByDate[date]),
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              fill: false,
              tension: 0.1,
            },
          ],
        });
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Nombre de publications au fil du temps',
        size: 18,
      },
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
          tooltipFormat: 'yyyy-MM-dd', // Utilisez un format compatible avec date-fns
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default TimeGraphe;
