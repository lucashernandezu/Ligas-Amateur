import { LigaModel } from "../models/liga.model.js";
import { CategoriaModel } from "../models/categoria.model.js";
import { DeporteModel } from "../models/deporte.model.js";
import { UsuarioModel } from "../models/usuario.model.js";

export class LigaService {

  static validateData({ nombre, usuario_id, deporte_id, categoria_id }) {
    if (!nombre || nombre.length < 3)
      throw new Error("El nombre debe tener al menos 3 caracteres.");

    if (!usuario_id) throw new Error("usuario_id es obligatorio.");
    if (!deporte_id) throw new Error("deporte_id es obligatorio.");
    if (!categoria_id) throw new Error("categoria_id es obligatorio.");
  }

  static async checkForeignKeys({ usuario_id, deporte_id, categoria_id }) {
    const usuario = await UsuarioModel.getById(usuario_id);
    if (!usuario) throw new Error("El usuario no existe.");

    const deporte = await DeporteModel.getById(deporte_id);
    if (!deporte) throw new Error("El deporte no existe.");

    const categoria = await CategoriaModel.getById(categoria_id);
    if (!categoria) throw new Error("La categoría no existe.");
  }

  static async checkDuplicate(nombre) {
    const liga = await LigaModel.getByNombre(nombre);
    if (liga) throw new Error("La liga ya existe.");
  }

  static async getAll() {
    return await LigaModel.getAll();
  }

  static async getAllWithDetails() {
    return await LigaModel.getAllWithDetails();
  }

  static async getById(id) {
    if (!id) throw new Error("El id es obligatorio");

    const liga = await LigaModel.getById(id);
    if (!liga) throw new Error("La liga no existe.");

    return liga;
  }

  static async getByIdWithDetails(id) {
    if (!id) throw new Error("El id es obligatorio");

    const liga = await LigaModel.getByIdWithDetails(id);
    if (!liga) throw new Error("La liga no existe.");

    return liga;
  }

  static async getByUsuario(usuario_id) {
    if (!usuario_id) throw new Error("El usuario_id es obligatorio");
    return await LigaModel.getByUsuario(usuario_id);
  }

  static async create(data) {
    this.validateData(data);
    await this.checkDuplicate(data.nombre);
    await this.checkForeignKeys(data);

    return await LigaModel.create(data);
  }

  static async update(id, data) {
    if (!id) throw new Error("El id es obligatorio");

    const liga = await LigaModel.getById(id);
    if (!liga) throw new Error("La liga no existe.");

    const { nombre, descripcion, deporte_id, categoria_id } = data;

    this.validateData({
      nombre,
      usuario_id: liga.usuario_id,
      deporte_id,
      categoria_id
    });

    if (nombre.toLowerCase() !== liga.nombre.toLowerCase()) {
      await this.checkDuplicate(nombre);
    }

    await this.checkForeignKeys({
      usuario_id: liga.usuario_id,
      deporte_id,
      categoria_id
    });

    return await LigaModel.update(id, { nombre, descripcion, deporte_id, categoria_id });
  }

  static async delete(id) {
    if (!id) throw new Error("El id es obligatorio");

    const liga = await LigaModel.getById(id);
    if (!liga) throw new Error("La liga no existe.");

    return await LigaModel.delete(id);
  }
}
