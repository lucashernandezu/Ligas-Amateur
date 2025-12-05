import { pool } from "../config/db.js"

export class DeporteModel {
    static async getAll() {
        const result = await pool.query('SELECT * FROM DEPORTES');
        return result.rows;
    }

    static async getById(id) {
        const result = await pool.query('SELECT * FROM DEPORTES WHERE id = $1', [id]);
        return result.rows[0];
    }

    static async create(nombre) {
        const result = await pool.query(
            'INSERT INTO deportes (nombre) VALUES ($1) RETURNING *',
            [nombre]
        );
        return result.rows[0];
    }

    static async delete(id) {
        const result = await pool.query('DELETE FROM deportes WHERE id = $1 RETURNING *', [id]);
        return result.rows[0];
    }

    static async getByNombre(nombre) {
        const result = await pool.query('SELECT * FROM DEPORTES WHERE LOWER(nombre) = LOWER($1)', [nombre]);
        return result.rows[0];
    }

    static async update(id, nombre) {
        const result = await pool.query(
            'UPDATE deportes SET nombre = $1 WHERE id = $2 RETURNING *',
            [nombre, id]
        );
        return result.rows[0];
    }



}
