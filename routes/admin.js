 // routes/admin.js
 import express from 'express';
  import { Router } from 'express';
 const router = Router();
 import adminController from '../controllers/adminController.js'

 router.get('/users', adminController.getAllUsers);

 export default router;