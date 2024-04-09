import Elysia from "elysia";
import {sendAuthLink} from './routes/send-auth-link'
import {registerRestaurant} from "./routes/register-restaurant.ts";

const app = new Elysia().use(registerRestaurant).use(sendAuthLink)

app.listen(3333, () => {
  console.log('HTTP Server Running...')
})