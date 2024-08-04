const router = require('express').Router();
const peopleRoutes = require('./peopleRoutes');
const thoughtRoutes = require('./thoughtRoutes');

router.use('/people', peopleRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;

// next traffic cop