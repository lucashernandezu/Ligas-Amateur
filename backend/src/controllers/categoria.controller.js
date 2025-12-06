import { CategoriaService } from "../services/categoria.service.js";

export class CategoriaController {

    static async getAll(req, res) {
        try {
            const categorias = await CategoriaService.getAll();
            res.status(200).json({
                message: "Categorías obtenidas",
                data: categorias
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }


    static async getById(req, res) {
        try {
            const { id } = req.params;
            const categoria = await CategoriaService.getById(id);
            res.status(200).json(categoria);
        } catch (error) {
            if (error.message.includes("no existe")) {
                return res.status(404).json({ message: error.message });
            }
            res.status(500).json({ message: error.message });
        }
    }


    static async create(req, res) {
        try {
            const categoria = await CategoriaService.create(req.body);
            res.status(201).json({
                message: "Categoría creada",
                data: categoria
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params;
            const categoria = await CategoriaService.update(id, req.body);
            res.status(200).json({
                message: "Categoría actualizada",
                data: categoria
            });
        } catch (error) {
            if (error.message.includes("no existe")) {
                return res.status(404).json({ message: error.message });
            }
            if (error.message.includes("ya existe") || error.message.includes("debe tener")) {
                return res.status(400).json({ message: error.message });
            }
            res.status(500).json({ message: error.message });
        }
    }


    static async delete(req, res) {
        try {
            const { id } = req.params;
            const categoria = await CategoriaService.delete(id);
            res.status(200).json({
                message: "Categoría eliminada",
                data: categoria
            });
        } catch (error) {
            if (error.message.includes("no existe")) {
                return res.status(404).json({ message: error.message });
            }
            res.status(500).json({ message: error.message });
        }
    }

}
