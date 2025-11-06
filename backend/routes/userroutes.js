import express from "express"
import {loginUser,registerUser,adminUser} from '../controllers/usercontroller.js'
const router=express.Router()

router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/admin',adminUser);

export default router