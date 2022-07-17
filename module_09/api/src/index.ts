import express from 'express';
console.clear();

// ROUTES
import diary_routes from './routes/diary';

// CONFIG
const config = {
    api_port: 3001
};

// API DECLARATIONS
const app = express();
app.use(express.json());

// ENDPOINTS
app.use('/api/diaries', diary_routes);

// PINGING
app.get('/api/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
});

// START SERVER
app.listen(config.api_port, () => {
    console.log(`API RUNNING ON ${ config.api_port }`);
});