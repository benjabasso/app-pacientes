// Connect Server

import dotenv from 'dotenv';
import app from './app.js';
import connectDB from './config/db.js';


dotenv.config();

const PORT = process.env.PORT || 3000; // Default to port 3000 if not specified

connectDB(); // Connect to MongoDB

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

