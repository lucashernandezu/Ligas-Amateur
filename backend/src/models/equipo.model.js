import { pool } from "../config/db.js"

export class EquipoModel {

    static async getAll() {
        const result = await pool.query(
            'SELECT * FROM equipos ORDER BY created_at DESC'
        );
        return result.rows;
    }

    static async getById(id) {
        const result = await pool.query(
            'SELECT * FROM equipos WHERE id = $1',
            [id]
        );

        return result.rows[0]
    }

    static async getByNombreEnLiga(nombre, liga_id) {
        const result = await pool.query(
            'SELECT * FROM equipos WHERE LOWER(nombre) = LOWER($1) AND liga_id = $2',
            [nombre, liga_id]
        );

        return result.rows[0];
    }

    static async getByLiga(liga_id) {
        const result = await pool.query(
            'SELECT * FROM equipos WHERE liga_id = $1 ORDER BY ASC',
            [liga_id]
        );
        return result.rows;
    }

    static async create({ nombre, descripcion, liga_id, logo_url }) {
        const result = await pool.query(
            `INSERT INTO equipos (nombre, descripcion, liga_id, logo_url)
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
            [nombre, descripcion, liga_id, logo_url]
        );
        return result.rows[0];
    }

    static async getAllWithDetails() {
        const result = await pool.query(
            `SELECT 
            e.*,
            l.nombre as liga_nombre
         FROM equipos e
         INNER JOIN ligas l ON e.liga_id = l.id
         ORDER BY e.created_at DESC`
        );
        return result.rows;
    }

    static async getByIdWithDetails(id) {
        const result = await pool.query(
            `SELECT 
            e.*,
            l.nombre as liga_nombre
         FROM equipos e
         INNER JOIN ligas l ON e.liga_id = l.id
         WHERE e.id = $1`,
            [id]
        );
        return result.rows[0];
    }

    static async update(id, data) {
        const campos = [];
        const valores = [];
        let contador = 1;

        if (data.nombre !== undefined) {
            campos.push(`nombre = $${contador++}`);
            valores.push(data.nombre);
        }

        if (data.descripcion !== undefined) {
            campos.push(`descripcion = $${contador++}`);
            valores.push(data.descripcion);
        }

        if (data.liga_id !== undefined) {
            campos.push(`liga_id = $${contador++}`);
            valores.push(data.liga_id);
        }

        if (data.logo_url !== undefined) {
            campos.push(`logo_url = $${contador++}`);
            valores.push(data.logo_url);
        }

        if (campos.length === 0) {
            throw new Error('No hay campos para actualizar');
        }

        valores.push(id);

        const result = await pool.query(
            `UPDATE equipos SET ${campos.join(', ')} 
         WHERE id = $${contador}
         RETURNING *`,
            valores
        );

        return result.rows[0];
    }

    static async delete(id) {
        const result = await pool.query(
            'DELETE FROM equipos WHERE id = $1 RETURNING *',
            [id]
        );
        return result.rows[0];
    }
}