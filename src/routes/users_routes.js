import express from 'express';
import basicAuth from '../helpers/basic_auth.js';
import users_controller from '../controllers/user/users_controller.js';

const router = express.Router();

router.get('/', basicAuth, users_controller.getUsers)
router.post('/', basicAuth, users_controller.registerUser)
router.put('/')
router.delete('/:userId', basicAuth, users_controller.deleteUser)
router.delete('/', basicAuth, users_controller.deleteUsers)

export default router;