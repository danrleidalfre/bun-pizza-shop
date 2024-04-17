import Elysia from "elysia";
import { cors } from "@elysiajs/cors";

import {sendAuthLink} from './routes/send-auth-link'
import {registerRestaurant} from "./routes/register-restaurant.ts";
import {authenticateFromLink} from "./routes/authenticate-from-link.ts";
import {signOut} from "./routes/sign-out.ts";
import {getProfile} from "./routes/get-profile.ts";
import {getManagedRestaurant} from "./routes/get-managed-restaurant.ts";
import {getOrderDetails} from "./routes/get-order-details.ts";
import {approveOrder} from "./routes/approve-order.ts";
import {dispatchOrder} from "./routes/dispatch-order.ts";
import {deliverOrder} from "./routes/deliver-order.ts";
import {cancelOrder} from "./routes/cancel-order.ts";
import {getOrders} from "./routes/get-orders.ts";
import {getMonthReceipt} from "./routes/get-month.receipt.ts";
import {getDayOrdersAmount} from "./routes/get-day-orders-amount.ts";
import {getMonthOrdersAmount} from "./routes/get-month-orders-amount.ts";
import {getMonthCanceledOrdersAmount} from "./routes/get-month-canceled-orders-amount.ts";
import {getDailyReceiptInPeriod} from "./routes/get-daily-receipt-in-period.ts";

const app = new Elysia()
  .use(
    cors({
      credentials: true,
      allowedHeaders: ['content-type'],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
      origin: (request): boolean => {
        const origin = request.headers.get('origin')

        if (!origin) {
          return false
        }

        return true
      },
    }),
  )
  .use(registerRestaurant)
  .use(sendAuthLink)
  .use(authenticateFromLink)
  .use(signOut)
  .use(getProfile)
  .use(getManagedRestaurant)
  .use(getOrderDetails)
  .use(approveOrder)
  .use(cancelOrder)
  .use(deliverOrder)
  .use(dispatchOrder)
  .use(getOrders)
  .use(getMonthReceipt)
  .use(getDayOrdersAmount)
  .use(getMonthOrdersAmount)
  .use(getMonthCanceledOrdersAmount)
  .use(getDailyReceiptInPeriod)
  .onError(({code, error, set}) => {
    switch (code) {
      case 'VALIDATION': {
        set.status = error.status

        return error.toResponse()
      }
      case 'NOT_FOUND': {
        return new Response(null, {status: 404})
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