import { join } from 'path';

import { Router } from 'express';
import app from '../app';

const router = Router();

// admin/add-product
router.get('/add-product', (req, res, next) => {
  res.sendFile(join(app.get('viewsPath'), 'add-product.html'));
}); // Add product 

// admin/product
router.post('/product', (req, res, next) => {
  let { product } = req.body
  product = product.trim();

  if(!product){
    return res.redirect('/admin/add-product')
  }

  console.log(`${product} added`)
  return res.redirect('/')

}); // New product (POST) 

export default router;
