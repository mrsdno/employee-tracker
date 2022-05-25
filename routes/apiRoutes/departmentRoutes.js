const express = require('express');
const { append } = require('express/lib/response');
const router = express.Router();
const db = require('../../db/connection');

// get all departments
router.get('/departments', (req, res) => {
    const sql = `SELECT * from department`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

module.exports = router; 