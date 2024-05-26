const Theme = require('../models/Theme');

/**
 * @swagger
 * /api/theme:
 *   get:
 *     summary: Get theme preferences for the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Theme preferences retrieved successfully.
 *       401:
 *         description: Unauthorized. User not logged in.
 *       403:
 *         description: Forbidden. Invalid token.
 */
const getTheme = async (req, res) => {
  try {
    const theme = await Theme.findOne({ userId: req.user._id });
    if (!theme) {
      return res.status(404).json({ message: 'Theme not found' });
    }
    res.json(theme);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /api/theme:
 *   post:
 *     summary: Save theme preferences for the authenticated user.
 *     security:
 *       - bearerAuth: []
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
const saveTheme = async (req, res) => {
  try {
    const { primaryColor } = req.body;
    const theme = await Theme.findOneAndUpdate(
      { userId: req.user._id },
      { primaryColor },
      { new: true, upsert: true }
    );
    res.json(theme);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTheme,
  saveTheme,
};

