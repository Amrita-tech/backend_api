const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const Preference = require('../models/Preference');

/**
 * @swagger
 * tags:
 *   name: Preferences
 *   description: User preferences endpoints
 */

/**
 * @swagger
 * /api/preference:
 *   get:
 *     summary: Get user preferences
 *     tags: [Preferences]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 themeColor:
 *                   type: string
 *       401:
 *         description: Unauthorized
 */
router.get('/', authMiddleware, async (req, res) => {
    try {
        const preference = await Preference.findOne({ user: req.user.id });
        if (!preference) {
            return res.status(404).json({ message: 'Preferences not found' });
        }
        res.json(preference);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

/**
 * @swagger
 * /api/preference:
 *   post:
 *     summary: Set user preferences
 *     tags: [Preferences]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               themeColor:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 themeColor:
 *                   type: string
 *       401:
 *         description: Unauthorized
 */
router.post('/', authMiddleware, async (req, res) => {
    const { themeColor } = req.body;

    try {
        let preference = await Preference.findOne({ user: req.user.id });
        if (!preference) {
            preference = new Preference({ user: req.user.id, themeColor });
            await preference.save();
        } else {
            preference.themeColor = themeColor;
            await preference.save();
        }
        res.json(preference);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
