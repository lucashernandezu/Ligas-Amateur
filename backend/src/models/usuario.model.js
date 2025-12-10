import { pool } from "../config/db.js";

export class UsuarioModel {
  
  static async getAll() {
    const result = await pool.query(
      'SELECT id, nombre, email, rol, estado, created_at FROM usuarios ORDER BY id'
    );
    return result.rows;
  }

  static async getById(id) {
    const result = await pool.query(
      'SELECT id, nombre, email, rol, estado, created_at FROM usuarios WHERE id = $1',
      [id]
    );
    return result.rows[0];
  }

  static async getByEmail(email) {
    const result = await pool.query(
      'SELECT * FROM usuarios WHERE LOWER(email) = LOWER($1)',
      [email]
    );
    return result.rows[0];
  }

  static async create({ nombre, email, password, rol = 'organizador' }) {
    const result = await pool.query(
      `INSERT INTO usuarios (nombre, email, password, rol)
       VALUES ($1, $2, $3, $4)
       RETURNING id, nombre, email, rol, estado, created_at`,
      [nombre, email, password, rol]
    );
    return result.rows[0];
  }

  static async update(id, { nombre, email, rol, estado }) {
    const result = await pool.query(
      `UPDATE usuarios SET 
        nombre = $1,
        email = $2,
        rol = $3,
        estado = $4
       WHERE id = $5
       RETURNING id, nombre, email, rol, estado, created_at`,
      [nombre, email, rol, estado, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await pool.query(
      'DELETE FROM usuarios WHERE id = $1 RETURNING id, nombre, email',
      [id]
    );
    return result.rows[0];
  }
}
