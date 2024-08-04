const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

router.use('/people', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;

// next traffic cop