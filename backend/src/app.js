import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import patientRoutes from "./routes/patientRoutes.js";
import notFound from "./middlewares/notFound.js";
import errorHandler from "./middlewares/errorMiddleware.js";

const app = express(); //Initialize express server

app.use(cors()); //Enable CORS
app.use(express.json()); //Parse JSON request bodies

// Main routes
app.use('/auth', authRoutes);
app.use('/patients', patientRoutes);

// 404 Not Found middleware
app.use(notFound);

// Error handling middleware
app.use(errorHandler);

app.get('/', (req, res) => {
    res.send('Healthcare Management System API is running');
});

export default app;

