import { pool } from "../config/db.js";

export class LigaModel {
  
  static async getAll() {
    const result = await pool.query('SELECT * FROM ligas ORDER BY created_at DESC');
    return result.rows;
  }

  static async getAllWithDetails() {
    const result = await pool.query(
        `SELECT 
            l.*,
            d.nombre as deporte_nombre,
            c.nombre as categoria_nombre,
            u.nombre as creador_nombre
         FROM ligas l
         INNER JOIN deportes d ON l.deporte_id = d.id
         LEFT JOIN categorias c ON l.categoria_id = c.id
         INNER JOIN usuarios u ON l.usuario_id = u.id
         ORDER BY l.created_at DESC`
    );
    return result.rows;
  }

  static async getById(id) {
    const result = await pool.query(
      'SELECT * FROM ligas WHERE id = $1',
      [id]
    );
    return result.rows[0];
  }

  static async getByIdWithDetails(id) {
    const result = await pool.query(
        `SELECT 
            l.*,
            d.nombre as deporte_nombre,
            c.nombre as categoria_nombre,
            u.nombre as creador_nombre
         FROM ligas l
         INNER JOIN deportes d ON l.deporte_id = d.id
         LEFT JOIN categorias c ON l.categoria_id = c.id
         INNER JOIN usuarios u ON l.usuario_id = u.id
         WHERE l.id = $1`,
        [id]
    );
    return result.rows[0];
  }

  static async getByUsuario(usuario_id) {
    const result = await pool.query(
        'SELECT * FROM ligas WHERE usuario_id = $1 ORDER BY created_at DESC',
        [usuario_id]
    );
    return result.rows;
  }

  static async getByNombre(nombre) {
    const result = await pool.query(
      'SELECT * FROM ligas WHERE LOWER(nombre) = LOWER($1)',
      [nombre]
    );
    return result.rows[0];
  }

  static async create({ nombre, descripcion, usuario_id, deporte_id, categoria_id }) {
    const result = await pool.query(
      `INSERT INTO ligas (nombre, descripcion, usuario_id, deporte_id, categoria_id)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [nombre, descripcion, usuario_id, deporte_id, categoria_id]
    );
    return result.rows[0];
  }

  static async update(id, { nombre, descripcion, deporte_id, categoria_id }) {
    const result = await pool.query(
      `UPDATE ligas SET 
        nombre = $1,
        descripcion = $2,
        deporte_id = $3,
        categoria_id = $4
       WHERE id = $5
       RETURNING *`,
      [nombre, descripcion, deporte_id, categoria_id, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await pool.query(
      'DELETE FROM ligas WHERE id = $1 RETURNING *',
      [id]
    );
    return result.rows[0];
  }
}
