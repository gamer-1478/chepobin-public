const express = require('express');
const rateLimit = require("express-rate-limit");
const path = require('path');
const admin = require('./firebase');
const apiRouter = require("./routes/apiRoute");

const app = express();
const port = process.env.PORT || 5002;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//enable rate limiting for API calls
const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minutes
    max: 60, // limit each IP to 60 requests per 1 minutes
    message: "Too many requests from this IP, max 60req per 60sec"

});

//  applies to all requests. For individual requests, add 'limiter' as a middleware to specific routes
app.use('/', limiter);
app.set('trust proxy', 1);

app.use("/api", apiRouter);

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port} on localhost`)
});
