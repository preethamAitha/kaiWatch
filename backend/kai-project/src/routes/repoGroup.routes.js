import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

router.get('/', async (req, res)=>{
    const { limit } = req.query;
    try {
        const result = await pool.query(`SELECT * FROM repo_group LIMIT ${limit}`);
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
    res.send(`repo groups: ${limit}`)
})



export default router