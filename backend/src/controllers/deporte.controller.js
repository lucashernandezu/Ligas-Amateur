import { DeporteService } from '../services/deporte.service.js';

export class DeporteController {

  static async getAll(req, res) {
    try {
      const deportes = await DeporteService.getAll();
      res.status(200).json(deportes);
    } catch (error) {
      console.error('Error al obtener los deportes:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  static async create(req, res) {
    try {
      const deporteCreado = await DeporteService.create(req.body);
      res.status(201).json({
        message: 'Deporte creado correctamente',
        data: deporteCreado
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      const deporteEliminado = await DeporteService.delete(id);
      res.status(200).json({
        message: 'Deporte eliminado correctamente',
        data: deporteEliminado
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const { nombre } = req.body;

      const deporteActualizado = await DeporteService.update(id, nombre);

      res.status(200).json({
        message: 'Deporte actualizado correctamente',
        data: deporteActualizado
      });

    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }


}
