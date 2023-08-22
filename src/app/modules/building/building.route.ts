import express from 'express';
import { BuildingController } from './building.controller';

const router = express.Router();

router.post('/create-building', BuildingController.insertIntoDB);

export const Building = router;
