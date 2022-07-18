import express from 'express';
import service from './service';

// CREATE ROUTER
const router = express.Router();

router.get('/', (_req, res) => {
    // const data = service.getEntries();
    const data = service.getScrubbed();
    return res.send(data);
});

router.get('/:id', (req, res) => {
    const entry = service.findById(req.params.id);
  
    if (entry) {
        return res.send(entry);
    } else {
        return res.sendStatus(404);
    }
});

router.post('/', (req, res) => {
    try {
        /* eslint-disable @typescript-eslint/no-unsafe-assignment */
        const { name, dateOfBirth, ssn, gender, occupation } = req.body;
        const entry = service.addPatient({ name, dateOfBirth, ssn, gender, occupation });
        return res.json(entry);
        
    } catch (error: unknown) {
        if (error instanceof Error) {
            return res.json({
                error: error.message
            });
        }
        
        return res.json({
            error: 'Something went wrong, try again.'
        });
    }
});

export default router;