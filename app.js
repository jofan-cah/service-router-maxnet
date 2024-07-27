const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;

app.use(express.json());

const oltSiteRoutes = require('./routes/oltSite');
const odcSiteRoutes = require('./routes/odcSite');
const odpSiteRoutes = require('./routes/odpSite');

app.use('/oltsites', oltSiteRoutes);
app.use('/odcsites', odcSiteRoutes);
app.use('/odpsites', odpSiteRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
