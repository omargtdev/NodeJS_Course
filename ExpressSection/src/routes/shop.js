import { join } from 'path';

import { Router } from "express";

import app from '../app';

const router = Router();

router.get('/about', (req, res, next) => {
  res.send("<h1>About page</h1>")
}); //  About 

router.get('/contact', (req, res, next) => {
  res.send("<h1>Contact page</h1>")
}); // Contact

router.get('/', (req, res, next) => {
  res.sendFile(join(app.get('viewsPath'), 'shop.html'));
}); // Home 

export default router;
