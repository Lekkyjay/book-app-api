import { CorsOptions } from 'cors'
import { allowedOrigins } from './allowedOrigins'

export const corsOptions: CorsOptions = {
  origin: (origin: string | undefined, callback: any) => {
    //!origin: allow requests with no origin eg: postman, thunderclient, etc
    //when request comes in from postman or thunderClient, req.headers.origin = undefined
    if (allowedOrigins.indexOf(origin as string) !== -1 || !origin) { 
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  optionsSuccessStatus: 200  //the default is 204 but some devices have problem with that so we go with 200
}
