import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Legend, Title, Tooltip } from 'chart.js';

ChartJS.register(ArcElement, Legend, Title, Tooltip);

const ChercheurGraph = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: [],
    }],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupérer les données des publications
        const publicationsResponse = await axios.get('http://localhost:8000/api/publications/');
        const publications = publicationsResponse.data;

        // Récupérer les données des projets
        const projetsResponse = await axios.get('http://localhost:8000/api/projets/');
        const projets = projetsResponse.data;

        // Compter les publications par projet
        const publicationsByProject = {};
        publications.forEach(publication => {
          const projetId = publication.projet_associe;
          if (publicationsByProject[projetId]) {
            publicationsByProject[projetId]++;
          } else {
            publicationsByProject[projetId] = 1;
          }
        });

        // Préparer les données pour le graphique en secteurs
        const labels = [];
        const data = [];
        const backgroundColors = [];

        projets.forEach(projet => {
          labels.push(projet.titre);
          data.push(publicationsByProject[projet.id] || 0);
          // Générer une couleur aléatoire pour chaque projet (optionnel)
          const randomColor = `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.6)`;
          backgroundColors.push(randomColor);
        });

        setChartData({
          labels: labels,
          datasets: [{
            data: data,
            backgroundColor: backgroundColors,
          }],
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
        position: 'right', // Position the legend on the right side
        align: 'center', // Align legend items in the center
        labels: {
          boxWidth: 20, // Width of each legend box
          padding: 10, // Padding between legend items
          fontSize: 14, // Increase font size of legend items
        },
      },
      title: {
        display: true,
        text: 'Répartition des publications par projet',
      },
    },
  };

  return (
    <div className="doughnut-chart-container">
      <div className="chart-container" style={{ position: 'relative', height: '40vh', width: '80vw' }}>
        <Doughnut data={chartData} options={options} />
      </div>
    </div>
  );
};

export default ChercheurGraph;
