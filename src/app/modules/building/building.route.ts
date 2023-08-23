import express from 'express';
import { BuildingController } from './building.controller';

const router = express.Router();

router.post('/create-building', BuildingController.insertIntoDB);
router.get('/', BuildingController.getAllFromDb);

export const BuildingRoutes = router;
