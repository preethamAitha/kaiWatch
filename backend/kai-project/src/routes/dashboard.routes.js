import express, { response } from 'express';
import pool from '../config/db.js';

const router = express.Router();

router.get('/metrics/summary', async(req, res)=>{
    try{
        const result = await pool.query(`SELECT 
            COUNT(*) FILTER (WHERE status = 'affected') AS affected_vuls,
            COUNT(DISTINCT cve) AS unique_cve_count,
            COUNT(*) as total_vuls,
            COUNT(*) FILTER (where severity = 'critical') as critical_vuls,
            COUNT(*) FILTER (where severity = 'high') as high_vuls,
            COUNT(*) FILTER (where severity = 'medium') as medium_vuls,
            COUNT(*) FILTER (where severity = 'low') as low_vuls
            from vulnerability`
        )
        res.json(result.rows);
    }catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
})

router.get('/charts/_series/:year', async (req, res) => {
  const {year} = req.params;
  try{
        const result = await pool.query(
            `WITH month_series AS (
                SELECT generate_series(1, 12) AS month_number
            ),
            monthly_vulnerability_data AS (
                SELECT
                    EXTRACT(MONTH FROM i.createTime) AS month_number,
                    SUM(im.totalVulns) AS total_vuls,
                    SUM(im.criticalVulns) AS critical_vuls, -- Corrected alias
                    SUM(im.highVulns) AS high_vuls,         -- Corrected alias
                    SUM(im.mediumVulns) AS medium_vuls,     -- Corrected alias
                    SUM(im.lowVulns) AS low_vuls            -- Corrected alias
                FROM
                    image i
                JOIN
                    image_metadata im ON i.id = im.imageId
                WHERE
                    EXTRACT(YEAR FROM i.createTime) = $1 -- Replace '2024' with your desired year
                GROUP BY
                    month_number
            )
            SELECT
                ms.month_number AS month,
                COALESCE(mvd.total_vuls, 0) AS total_vuls,
                COALESCE(mvd.critical_vuls, 0) AS critical_vuls,
                COALESCE(mvd.high_vuls, 0) AS high_vuls,
                COALESCE(mvd.medium_vuls, 0) AS medium_vuls,
                COALESCE(mvd.low_vuls, 0) AS low_vuls
            FROM
                month_series ms
            LEFT JOIN
                monthly_vulnerability_data mvd ON ms.month_number = mvd.month_number
            ORDER BY
                ms.month_number;`,
            [year]
        )
        res.json(result.rows)
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server error')
    }
})

router.get('/charts/risk_factors/:d1/:d2', async (req, res) => {
    const { d1, d2 } = req.params;
    try{
        const d1n = new Date(d1);
        const d2n = new Date(d2);

        if (isNaN(d1n) || isNaN(d2n)) {
          return res.status(400).json({ error: 'Invalid date format. Use ISO 8601 or a valid timestamp.' });
        }
        const result = await pool.query(
            `SELECT 
                rf.factorName,
                COUNT(*) AS frequency
            FROM 
                risk_factor rf
            JOIN 
                vulnerability v 
                ON rf.vulnerabilityId = v.id
            WHERE 
                v.layerTime BETWEEN $1 AND $2
            GROUP BY 
                rf.factorName
            ORDER BY 
                frequency DESC;`,
            [d1n.toISOString(), d2n.toISOString()]
        )
        res.json(result.rows)
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server error')
    }
})



router.get('/charts/trend_analysis/:d1/:d2', async (req, res) => {
  const { d1, d2 } = req.params;

  try {
    const d1n = new Date(d1);
    const d2n = new Date(d2);

    if (isNaN(d1n) || isNaN(d2n)) {
      return res.status(400).json({ error: 'Invalid date format. Use ISO 8601 or a valid timestamp.' });
    }

    const result = await pool.query(
      `SELECT COUNT(*) AS vulns,
       COUNT(*) FILTER (where severity = 'critical') as critical_vuls,
        COUNT(*) FILTER (where severity = 'high') as high_vuls,
        COUNT(*) FILTER (where severity = 'medium') as medium_vuls,
        COUNT(*) FILTER (where severity = 'low') as low_vuls
       FROM vulnerability
       WHERE published BETWEEN $1 AND $2;`,
      [d1n.toISOString(), d2n.toISOString()]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


export default router