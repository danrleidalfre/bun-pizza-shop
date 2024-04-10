import Elysia from "elysia";
import {sendAuthLink} from './routes/send-auth-link'
import {registerRestaurant} from "./routes/register-restaurant.ts";
import {authenticateFromLink} from "./routes/authenticate-from-link.ts";
import {signOut} from "./routes/sign-out.ts";
import {getProfile} from "./routes/get-profile.ts";

const app = new Elysia()
  .use(registerRestaurant)
  .use(sendAuthLink)
  .use(authenticateFromLink)
  .use(signOut)
  .use(getProfile)

app.listen(3333, () => {
  console.log('HTTP Server Running...')
})