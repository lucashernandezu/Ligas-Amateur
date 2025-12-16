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

  static async create({ nombre, email, password, rol = 'admin' }) {
    const result = await pool.query(
      `INSERT INTO usuarios (nombre, email, password, rol)
       VALUES ($1, $2, $3, $4)
       RETURNING id, nombre, email, rol, estado, created_at`,
      [nombre, email, password, rol]
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
    if (data.email !== undefined) {
      campos.push(`email = $${contador++}`);
      valores.push(data.email);
    }
    if (data.rol !== undefined) {
      campos.push(`rol = $${contador++}`);
      valores.push(data.rol);
    }
    if (data.estado !== undefined) {
      campos.push(`estado = $${contador++}`);
      valores.push(data.estado);
    }

    if (campos.length === 0) {
      throw new Error('No hay campos para actualizar');
    }

    valores.push(id);

    const result = await pool.query(
      `UPDATE usuarios SET ${campos.join(', ')} 
     WHERE id = $${contador}
     RETURNING id, nombre, email, rol, estado, created_at`,
      valores
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
