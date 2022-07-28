import express from 'express';
import service from './service';

// CREATE ROUTER
const router = express.Router();

router.get('/', (_req, res) => {
    const data = service.getEntries();
    res.send(data);
});

router.get('/:code', (req, res) => {
    const entry = service.findById(req.params.code);
  
    if (entry) {
        res.send(entry);
    } else {
        res.sendStatus(404);
    }
});

export default router;