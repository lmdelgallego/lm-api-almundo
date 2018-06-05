import {Router} from 'express'
import hotel from './hotel'

const router = new Router()

router.use('/hotels', hotel)

export default router