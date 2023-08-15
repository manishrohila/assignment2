const app = require('./app');

const dotenv = require('dotenv');
const connectDatabase = require('./config/db');
dotenv.config({path:"backend/config/.env"})

// connect to db
connectDatabase();

app.listen(process.env.PORT,()=>{
    console.log(`server is working on http://localhost:${process.env.PORT}`);
})