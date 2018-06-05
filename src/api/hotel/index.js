import { Router } from 'express'
import { index, query,show, update, destroy, create } from './controller'

const router = new Router()

router.get('/', query, index)
router.get('/:id', show)
router.post('/',create)
router.put('/:id',update)
router.delete('/:id',destroy)

export Hotel from './model';
export default router
