import { CategoriaModel } from "../models/categoria.model.js";

export class CategoriaService {

    static validateNombre(nombre) {
        if (!nombre || nombre.length < 3) {
            throw new Error("El nombre debe tener al menos 3 caracteres.");
        }
    }

    static async checkDuplicate(nombre) {
        const exists = await CategoriaModel.getByNombre(nombre);
        if (exists) {
            throw new Error("La categoría ya existe.");
        }
    }

    static async getAll() {
        return await CategoriaModel.getAll();
    }

    static async create({ nombre, descripcion }) {
        this.validateNombre(nombre);
        await this.checkDuplicate(nombre);

        return await CategoriaModel.create(nombre, descripcion);
    }

    static async getById(id) {
        if (!id) throw new Error("El id es obligatorio");

        const categoria = await CategoriaModel.getById(id);
        if (!categoria) throw new Error("La categoría no existe.");

        return categoria;
    }

    static async update(id, { nombre, descripcion }) {
        if (!id) throw new Error("El id es obligatorio");

        if (!nombre && descripcion === undefined) {
            throw new Error("Debes proporcionar al menos nombre o descripción");
        }

        if (nombre) {
            this.validateNombre(nombre);
        }

        const existe = await CategoriaModel.getById(id);
        if (!existe) throw new Error("La categoría no existe.");

        if (nombre && nombre.toLowerCase() !== existe.nombre.toLowerCase()) {
            await this.checkDuplicate(nombre);
        }

        const nombreFinal = nombre || existe.nombre;
        const descripcionFinal = descripcion !== undefined ? descripcion : existe.descripcion;

        return await CategoriaModel.update(id, nombreFinal, descripcionFinal);
    }



    static async delete(id) {
        if (!id) throw new Error("El id es obligatorio");

        const existe = await CategoriaModel.getById(id);
        if (!existe) throw new Error("La categoría no existe.");

        return await CategoriaModel.delete(id);
    }

}
