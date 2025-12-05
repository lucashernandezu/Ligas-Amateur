import { pool } from "../config/db.js";

export class CategoriaModel {
    static async getAll() {
        const result = await pool.query('SELECT * FROM categorias ORDER BY id');
        return result.rows;
    }

    static async getById(id) {
        const result = await pool.query(
            'SELECT * FROM categorias WHERE id = $1',
            [id]
        );
        return result.rows[0];
    }

    static async getByNombre(nombre) {
        const result = await pool.query(
            'SELECT * FROM categorias WHERE LOWER(nombre) = LOWER($1)',
            [nombre]
        );
        return result.rows[0];
    }

    static async create(nombre, descripcion) {
        const result = await pool.query(
            `INSERT INTO categorias (nombre, descripcion)
             VALUES ($1, $2) RETURNING *`,
            [nombre, descripcion]
        );
        return result.rows[0];
    }

    static async update(id, nombre, descripcion) {
        const result = await pool.query(
            `UPDATE categorias
             SET nombre = $1, descripcion = $2
             WHERE id = $3
             RETURNING *`,
            [nombre, descripcion, id]
        );
        return result.rows[0];
    }

    static async delete(id) {
        const result = await pool.query(
            'DELETE FROM categorias WHERE id = $1 RETURNING *',
            [id]
        );
        return result.rows[0];
    }
}
