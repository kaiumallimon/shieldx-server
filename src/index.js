const express = require('express');
const testRoute = require('./modules/test/routes/test.route');
const authRoute = require('./modules/auth/routes/auth.route');  
const userProfileRoute = require('./modules/user/routes/user.routes');
require('dotenv').config();


const app = express();
app.use(express.json());


app.use('/', testRoute);
app.use('/api/auth',authRoute);
app.use('/api/profile',userProfileRoute);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);      
});


