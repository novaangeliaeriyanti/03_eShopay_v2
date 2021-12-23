import "dotenv/config";
import express from "express";
import cors from "cors";
import compress from 'compression';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import models,{sequelize} from "./models/init-models";
import routes from './routes/IndexRoute'
import middleware from "./middleware/middleware";

const port = process.env.PORT || 3005;

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(helmet())

app.use(compress())

app.use(cors());


app.use(async (req,res,next) =>{
    req.context = {models};
    next();
})

app.use(process.env.URL_API+"/category",routes.cateRoute)
app.use(process.env.URL_API+"/user",routes.userRoute)
app.use(process.env.URL_API+"/product",routes.productRoute)
app.use(process.env.URL_API+"/image",routes.imageRoute)
app.use(process.env.URL_API+"/cart",routes.cartRoute)
app.use(process.env.URL_API+"/order",routes.orderRoute)
app.use(process.env.URL_API+"/line",routes.lineItemsRoute)
app.use(process.env.URL_API+"/auth",routes.authRoute)
app.use(middleware.handleError)
app.use(middleware.notFound)

const dropDatabaseSync = false;

sequelize.sync({force:dropDatabaseSync}).then(async()=>{
    if(dropDatabaseSync){
        console.log("Database do note drop");
    }

    app.listen(port,()=>{
        console.log(`Server is listening on port ${port}`);})
})

export default app