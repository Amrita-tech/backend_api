const express = require('express');
const router = express.Router();
const { getTheme, saveTheme } = require('../controllers/themeController');
const { authenticateToken } = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Theme
 *   description: Theme management APIs
 */

/**
 * @swagger
 * /api/theme:
 *   get:
 *     summary: Get theme preferences for the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     tags: [Theme]
 *     responses:
 *       200:
 *         description: Theme preferences retrieved successfully.
 *       401:
 *         description: Unauthorized. User not logged in.
 *       403:
 *         description: Forbidden. Invalid token.
 */
router.get('/', authenticateToken, getTheme);

/**
 * @swagger
 * /api/theme:
 *   post:
 *     summary: Save theme preferences for the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     tags: [Theme]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               primaryColor:
 *                 type: string
 *             example:
 *               primaryColor: "#1976d2"
 *     responses:
 *       200:
 *         description: Theme preferences saved successfully.
 *       401:
 *         description: Unauthorized. User not logged in.
 *       403:
 *         description: Forbidden. Invalid token.
 *       500:
 *         description: Internal server error.
 */
router.post('/', authenticateToken, saveTheme);

module.exports = router;

