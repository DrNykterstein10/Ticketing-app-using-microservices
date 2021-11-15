import express from 'express';
import { body } from 'express-validator';

const router = express.Router();

router.post('/api/users/signin', (req, res) => {
    res.send('Hi there!');
});

export { router as signInRouter };