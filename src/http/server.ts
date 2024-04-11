import Elysia from "elysia";
import {sendAuthLink} from './routes/send-auth-link'
import {registerRestaurant} from "./routes/register-restaurant.ts";
import {authenticateFromLink} from "./routes/authenticate-from-link.ts";
import {signOut} from "./routes/sign-out.ts";
import {getProfile} from "./routes/get-profile.ts";
import {getManagedRestaurant} from "./routes/get-managed-restaurant.ts";

const app = new Elysia()
  .use(registerRestaurant)
  .use(sendAuthLink)
  .use(authenticateFromLink)
  .use(signOut)
  .use(getProfile)
  .use(getManagedRestaurant)
  .onError(({code, error, set}) => {
    switch (code) {
      case 'VALIDATION': {
        set.status = error.status

        return error.toResponse()
      }
      default: {
        console.error(error)

        return new Response(null, {status: 500})
      }
    }
  })

app.listen(3333, () => {
  console.log('HTTP Server Running...')
})