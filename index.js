import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import UserRoute from "./routes/UserRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import PetaniRoute from './routes/PetaniRoute.js'


dotenv.config();
const app = express();
app.use('/profile', express.static('uploads/img/profile'));




const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db: db
});


// (async () => {
//     try {
//         await db.sync();
//         console.log("All models were synchronized successfully.");
//     } catch (error) {
//         console.error('Error syncing database:', error);
//     }
// })();

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}));

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use(UserRoute);
app.use(ProductRoute);
app.use(AuthRoute);
app.use(PetaniRoute);

// store.sync();

app.listen(process.env.APP_PORT, () => {
    console.log(`Server up and running... at http://localhost:${process.env.APP_PORT}`);
});
