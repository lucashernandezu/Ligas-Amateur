import { DeporteModel } from '../models/deporte.model.js';

export class DeporteService {

  static validateNombre(nombre) {
    if (!nombre || nombre.length < 3) {
      throw new Error('El nombre del deporte debe tener al menos 3 caracteres.');
    }
  }

  static async checkDuplicate(nombre) {
    const deporte = await DeporteModel.getByNombre(nombre);
    if (deporte) {
      throw new Error('El deporte ya existe.');
    }
  }

  static async create({ nombre }) {
    this.validateNombre(nombre);
    await this.checkDuplicate(nombre);
    const deporteCreado = await DeporteModel.create(nombre);
    return deporteCreado;
  }

  static async delete(id) {
    if (!id) {
      throw new Error('El id del deporte es obligatorio');
    }

    const deporte = await DeporteModel.getById(id);
    if (!deporte) {
      throw new Error('El deporte no existe.');
    }

    const deporteEliminado = await DeporteModel.delete(id);
    return deporteEliminado;
  }

  static async getAll() {
    const deportes = await DeporteModel.getAll();
    return deportes;
  }

  static async update(id, nombre) {
    if (!id) {
        throw new Error('El id es obligatorio.');
    }

    this.validateNombre(nombre);

    const deporte = await DeporteModel.getById(id);
    if (!deporte) {
        throw new Error('El deporte no existe.');
    }

    const deporteConMismoNombre = await DeporteModel.getByNombre(nombre);

    if (deporteConMismoNombre && deporteConMismoNombre.id !== Number(id)) {
        throw new Error('Ya existe un deporte con ese nombre.');
    }

    const deporteActualizado = await DeporteModel.update(id, nombre);
    return deporteActualizado;
}

}
