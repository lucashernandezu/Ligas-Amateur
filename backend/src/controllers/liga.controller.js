import { LigaService } from "../services/liga.service.js";

export class LigaController {
  
  static async getAll(req, res) {
    try {
      const ligas = await LigaService.getAll();
      res.status(200).json({
        message: "Ligas obtenidas",
        data: ligas
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getAllWithDetails(req, res) {
    try {
      const ligas = await LigaService.getAllWithDetails();
      res.status(200).json({
        message: "Ligas obtenidas con detalles",
        data: ligas
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const liga = await LigaService.getById(id);
      res.status(200).json(liga);
    } catch (error) {
      if (error.message.includes("no existe")) {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  }

  static async getByIdWithDetails(req, res) {
    try {
      const { id } = req.params;
      const liga = await LigaService.getByIdWithDetails(id);
      res.status(200).json(liga);
    } catch (error) {
      if (error.message.includes("no existe")) {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  }

  static async getByUsuario(req, res) {
    try {
      const { usuario_id } = req.params;
      const ligas = await LigaService.getByUsuario(usuario_id);
      res.status(200).json({
        message: "Ligas del usuario obtenidas",
        data: ligas
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async create(req, res) {
    try {
      const usuario_id = req.user.userId;
      
      const ligaData = {
        ...req.body,
        usuario_id
      };
      
      const liga = await LigaService.create(ligaData);
      res.status(201).json({
        message: "Liga creada correctamente",
        data: liga
      });
    } catch (error) {
      if (error.message.includes("ya existe") || 
          error.message.includes("debe tener") ||
          error.message.includes("obligatorio") ||
          error.message.includes("no existe")) {
        return res.status(400).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const usuario_id = req.user.userId;
      
      const liga = await LigaService.getById(id);
      
      if (liga.usuario_id !== usuario_id) {
        return res.status(403).json({ 
          message: 'No tienes permiso para editar esta liga' 
        });
      }
      
      const ligaActualizada = await LigaService.update(id, req.body);
      res.status(200).json({
        message: "Liga actualizada correctamente",
        data: ligaActualizada
      });
    } catch (error) {
      if (error.message.includes("no existe") && error.message.includes("liga")) {
        return res.status(404).json({ message: error.message });
      }
      if (error.message.includes("ya existe") || 
          error.message.includes("debe tener") ||
          error.message.includes("obligatorio") ||
          error.message.includes("no existe")) {
        return res.status(400).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      const usuario_id = req.user.userId;
      
      const liga = await LigaService.getById(id);
      
      if (liga.usuario_id !== usuario_id) {
        return res.status(403).json({ 
          message: 'No tienes permiso para eliminar esta liga' 
        });
      }
      
      await LigaService.delete(id);
      res.status(200).json({
        message: "Liga eliminada correctamente",
        data: liga
      });
    } catch (error) {
      if (error.message.includes("no existe")) {
        return res.status(404).json({ message: error.message });
      }
      
      if (error.code === '23503') {
        return res.status(409).json({ 
          message: 'No se puede eliminar la liga porque tiene equipos o partidos asociados' 
        });
      }
      
      res.status(500).json({ message: error.message });
    }
  }
}
