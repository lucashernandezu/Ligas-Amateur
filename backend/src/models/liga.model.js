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
    if (data.deporte_id !== undefined) {
      campos.push(`deporte_id = $${contador++}`);
      valores.push(data.deporte_id);
    }
    if (data.categoria_id !== undefined) {
      campos.push(`categoria_id = $${contador++}`);
      valores.push(data.categoria_id);
    }

    if (campos.length === 0) {
      throw new Error('No hay campos para actualizar');
    }

    valores.push(id);

    const result = await pool.query(
      `UPDATE ligas SET ${campos.join(', ')} 
         WHERE id = $${contador}
         RETURNING *`,
      valores
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
