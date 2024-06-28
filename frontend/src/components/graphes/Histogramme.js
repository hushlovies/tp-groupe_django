// src/Histogramme.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { fetchPublications, fetchProjets, fetchChercheurs } from '../../services/api';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Histogramme = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const chercheursResponse = await fetchChercheurs();
        const projetsResponse = await fetchProjets();

        const chercheurs = chercheursResponse;
        const projets = projetsResponse;

        const chercheurProjetCount = chercheurs.map(chercheur => {
          const projetsCount = projets.filter(projet => projet.chercheurs.includes(chercheur.id)).length;
          return {
            nom: chercheur.nom,
            projetsCount: projetsCount,
          };
        });

        setChartData({
          labels: chercheurProjetCount.map(c => c.nom),
          datasets: [
            {
              label: 'Nombre de projets par chercheur',
              
              data: chercheurProjetCount.map(c => c.projetsCount),
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
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
        text: 'Nombre de projets par chercheur',
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default Histogramme;
