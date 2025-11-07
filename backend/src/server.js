// Connect Server

import dotenv from 'dotenv';
import app from './app.js';
import { sequelize } from './models/index.js';


dotenv.config();

const PORT = process.env.PORT || 3000; // Default to port 3000 if not specified

const start =  async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully.');
        await sequelize.sync({alter:true}); // Sync models with the database
        console.log('Database synchronized successfully.');
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('Unable to connect to the database:', err);
        process.exit(1); // Exit process with failure
    }
};

start();


