import express from 'express';
import cors from 'cors';
console.clear();

// ROUTES
import patient_router from './patients/router';
import diagnosis_router from './diagnosis/router';

// CONFIG
const config = {
    api_port: 3001,
};

// API DECLARATIONS
const app = express();
app.use(express.json());
app.use(cors());

// API ENDPOINTS
app.use('/api/patients', patient_router);
app.use('/api/diagnosis', diagnosis_router);

// PINGING
app.get('/api/ping', (_req, res) => {
    res.send('pong');
});

// START SERVER
app.listen(config.api_port, () => {
    console.log(`API RUNNING ON: ${ config.api_port }`);
});