import { UsuarioService } from "../services/usuario.service.js";

export class UsuarioController {


  static async register(req, res) {
    try {
      const { usuario, token } = await UsuarioService.register(req.body);

      res.status(201).json({
        message: "Usuario registrado exitosamente",
        data: {
          usuario,
          token
        }
      });
    } catch (error) {
      if (error.message.includes("ya está registrado") ||
        error.message.includes("debe tener") ||
        error.message.includes("inválido")) {
        return res.status(400).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  }


  static async login(req, res) {
    try {
      const { usuario, token } = await UsuarioService.login(req.body);

      res.status(200).json({
        message: "Login exitoso",
        data: {
          usuario,
          token
        }
      });
    } catch (error) {
      if (error.message.includes("Credenciales inválidas") ||
        error.message.includes("desactivado") ||
        error.message.includes("obligatorios")) {
        return res.status(401).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  }


  static async getAll(req, res) {
    try {
      const usuarios = await UsuarioService.getAll();
      res.status(200).json({
        message: "Usuarios obtenidos",
        data: usuarios
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const usuario = await UsuarioService.getById(id);
      res.status(200).json(usuario);
    } catch (error) {
      if (error.message.includes("no existe")) {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const usuario = await UsuarioService.update(id, req.body);
      res.status(200).json({
        message: "Usuario actualizado correctamente",
        data: usuario
      });
    } catch (error) {
      if (error.message.includes("no existe")) {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      const usuario = await UsuarioService.delete(id);
      res.status(200).json({
        message: "Usuario eliminado correctamente",
        data: usuario
      });
    } catch (error) {
      if (error.message.includes("no existe")) {
        return res.status(404).json({ message: error.message });
      }

      if (error.code === '23503') {
        return res.status(409).json({
          message: 'No se puede eliminar el usuario porque tiene ligas asociadas'
        });
      }

      res.status(500).json({ message: error.message });
    }
  }

}
