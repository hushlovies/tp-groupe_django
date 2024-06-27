
import Histogramme from './graphes/Histogramme';
import TimeGraphe from './graphes/TimeGraphe';
import ChercheurGraph from './graphes/ChercheurGraph';
import React from 'react';
import Card from 'react-bootstrap/Card'; // Importer le composant de carte depuis Bootstrap

const Dashboard = () => {
    return (
        <div className="d">
            {/* Première carte */}
            <Card className="mb-3">
                <Card.Body>
                    <div className="row">
                        <div className="col-7">
                            <TimeGraphe />
                        </div>
                        <div className="col-5">
                            <ChercheurGraph />
                        </div>
                    </div>
                </Card.Body>
            </Card>

            {/* Deuxième carte */}
            <Card className="mb-3">
                <Card.Body>
                    <div className="row justify-content-center ">
                        <div className="col-md-7">
                            <Histogramme />
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Dashboard;
