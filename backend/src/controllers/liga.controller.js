import { LigaService } from "../services/liga.service.js";

export class LigaController {
  
  static async getAll(req, res) {
    try {
      const ligas = await LigaService.getAll();
      res.status(200).json(ligas);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async create(req, res) {
    try {
      const liga = await LigaService.create(req.body);
      res.status(201).json({
        message: "Liga creada correctamente",
        data: liga
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const liga = await LigaService.delete(req.params.id);
      res.status(200).json({
        message: "Liga eliminada correctamente",
        data: liga
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async update(req, res) {
    try {
      const liga = await LigaService.update(req.params.id, req.body);
      res.status(200).json({
        message: "Liga actualizada correctamente",
        data: liga
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}
