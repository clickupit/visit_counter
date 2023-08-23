const express = require('express');
const router = express.Router();
const { visitorLogsRef } = require('../firebase');

/**
 * @swagger
 * /api/post-visitor-log:
 *   post:
 *     summary: Add a new visitor log
 *     tags: [Visitors Data]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clientIP:
 *                 type: string
 *                 example: "192.168.1.100"
 *               requestURL:
 *                 type: string
 *                 example: "https://example.com/page1"
 *               clientDevice:
 *                 type: string
 *                 example: "Desktop"
 *               clientBrowser:
 *                 type: string
 *                 example: "Chrome"
 *               timeStamp:
 *                 type: string
 *                 example: "2023-08-20T12:00:00Z"
 *             required:
 *               - requestURL
 *     responses:
 *       201:
 *         description: Successfully created.
 *       400:
 *         description: Bad request.
 */

router.post('/', (req, res) => {
  const newVisitorLog = {
    clientIP: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    clientDevice: req.useragent.os,
    clientBrowser: req.useragent.browser,
    requestURL: req.body.requestURL || req.headers.referer,
    timeStamp: new Date().toLocaleString('en-US', { timeZone: 'Asia/Bangkok' }),
  };

  const logRef = visitorLogsRef.push();
  logRef.set(newVisitorLog)
    .then(() => {
      res.status(201).json({ message: 'Visitor log added successfully' });
    })
    .catch((error) => {
      console.error('Error adding visitor log:', error);
      res.status(500).json({ error: 'Server error' });
    });
});

module.exports = router;
