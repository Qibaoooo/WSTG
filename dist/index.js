"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const port = process.env.PORT || 3333;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Array of example users for testing purposes
const users = [
    {
        id: 1,
        name: 'Maria Doe',
        email: 'maria@example.com',
        password: 'maria123'
    },
    {
        id: 2,
        name: 'Juan Doe',
        email: 'juan@example.com',
        password: 'juan123'
    }
];
// This code makes sure that any request that does not matches a static file
// in the build folder, will just serve index.html. Client side routing is
// going to make sure that the correct content will be loaded.
app.use((req, res, next) => {
    if (/(.ico|.js|.css|.jpg|.png|.map)$/i.test(req.path)) {
        next();
    }
    else {
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
        res.sendFile(path_1.default.join(__dirname, '../client/build', 'index.html'));
    }
});
app.use(express_1.default.static(path_1.default.join(__dirname, '../client/build')));
// app.use(express.static(path.join(__dirname, '../client/build')));
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(user => {
        return user.email === email && user.password === password;
    });
    if (!user) {
        return res.status(404).send('User Not Found!');
    }
    return res.status(200).json(user);
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
