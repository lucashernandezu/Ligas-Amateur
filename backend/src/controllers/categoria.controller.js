import { CategoriaService } from "../services/categoria.service.js";

export class CategoriaController {

    static async getAll(req, res) {
        try {
            const categorias = await CategoriaService.getAll();
            res.status(200).json(categorias);
        } catch (error) {
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
            res.status(400).json({ message: error.message });
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
            res.status(400).json({ message: error.message });
        }
    }
}
