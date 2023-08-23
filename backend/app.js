const express = require('express');
const bodyParser = require('body-parser');
const { swaggerUi, swaggerSpec } = require('./swagger');
const useragent = require('express-useragent');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(useragent.express());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(bodyParser.json());

app.use('/api/get-visitor-all', require('./api-routes/get-visitor-all'));
app.use('/api/post-visitor-log', require('./api-routes/post-visitor-log'));

const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
