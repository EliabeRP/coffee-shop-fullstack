import { Router } from 'express';

const router = new Router();

router.get('/', (req, res) => {
  res.send('Tudo funcionando até aqui');
})

export default router;