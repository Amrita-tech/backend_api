
const NodeCache = require('node-cache');
const cache = new NodeCache();

const cacheMiddleware = (req, res, next) => {
  const key = req.originalUrl || req.url;
  const cachedData = cache.get(key);
  if (cachedData) {
    console.log('Cache hit!');
    res.json(cachedData);
  } else {
    console.log('Cache miss!');
    // Call next middleware if data is not cached
    next();
  }
};

module.exports = cacheMiddleware;
