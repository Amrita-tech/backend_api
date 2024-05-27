// controllers/themeController.js
const Theme = require('../models/Theme');
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 3600 });

exports.getThemes = async (req, res) => {
   
  const userId = req.user._id;
  console.log(req.user._id);
  try {
    if (!userId) {
      return res.status(400).json({ error: 'User ID is missing' });
    }

    const cachedTheme = cache.get(req.user._id);
    if (cachedTheme) {
      console.log('Cache hit!');
      return res.json(cachedTheme);
    }

    console.log('Cache miss!');
    const theme = await Theme.findOne({ userId: req.user._id });
    if (theme) {
      cache.set(req.user._id, theme); // Cache for 1 hour
      return res.json(theme);
    } else {
      return res.status(404).json({ message: 'Theme not found' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.saveTheme = async (req, res) => {
   
  const userId  = req.user._id;
  const { primaryColor } = req.body;
  try {
    if (!userId) {
      return res.status(400).json({ error: 'User ID is missing' });
    }

    const theme = await Theme.findOneAndUpdate(
        { userId: req.user._id },
      { primaryColor },
      { new: true, upsert: true }
    );
   
    cache.set(userId, theme); // Cache for 1 hour
    return res.json(theme);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

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


