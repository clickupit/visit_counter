const express = require('express');
const router = express.Router();
const { visitorLogsRef } = require('../firebase');

/**
 * @swagger
 * /api/get-visitor-all:
 *   get:
 *     summary: Get all visitor logs
 *     tags: [Visitors Data]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Visitor'
 *             example:
 *               - clientIP: "string"
 *                 requestURL: "string"
 *                 clientDevice: "string"
 *                 clientBrowser: "string"
 *                 timeStamp: "string"
 *       500:
 *         description: Server error
 */


router.get('/', (req, res) => {
  visitorLogsRef.once('value', (snapshot) => {
    const visitorLogs = snapshot.val();
    if (visitorLogs) {
      const logsArray = Object.values(visitorLogs);
      res.status(200).json(logsArray);
    } else {
      res.status(200).json([]);
    }
  });
});

module.exports = router;
