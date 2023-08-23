import express from 'express';
import { RoomController } from './room.controller';

const router = express.Router();

router.post('/room-created', RoomController.insertIntoDb);

export const RoomRouters = router;
