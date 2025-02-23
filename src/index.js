const express = require('express');
const testRoute = require('./modules/test/routes/test.route');
require('dotenv').config();


const app = express();
app.use(express.json());


app.use('/', testRoute);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);      
});


