import express from 'express';
import basicAuth from '../helpers/basic_auth.js';
import users_controller from '../controllers/users/users_controller.js';

const router = express.Router();

router.get('/', basicAuth, users_controller.getUsers)
router.get('/:userId', basicAuth, users_controller.getUsers)
router.post('/register', basicAuth, users_controller.registerUser)
router.patch('/:userId', basicAuth, users_controller.updateUser)
router.delete('/:userId', basicAuth, users_controller.deleteUser)
router.delete('/', basicAuth, users_controller.deleteUsers)

export default router;