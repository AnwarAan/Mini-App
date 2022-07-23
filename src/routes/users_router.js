import express from 'express';
import basicAuth from '../helpers/basic_auth.js';
import users_controller from '../controllers/users/users_controller.js';
import jwtVerify from '../helpers/jwt_auth.js';

const router = express.Router();

router.get('/', jwtVerify, users_controller.getUsers)
router.get('/:userId', jwtVerify, users_controller.getUsers)
router.post('/register', basicAuth, users_controller.registerUser)
router.post('/login', basicAuth, users_controller.loginUser)
router.patch('/:userId', basicAuth, users_controller.updateUser)
router.delete('/:userId', basicAuth, users_controller.deleteUser)
router.delete('/', basicAuth, users_controller.deleteUsers)

export default router;