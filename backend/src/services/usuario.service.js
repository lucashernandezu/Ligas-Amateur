import { UsuarioModel } from "../models/usuario.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class UsuarioService {

    static validateRegistro({ nombre, email, password }) {
        if (!nombre || nombre.length < 2) {
            throw new Error("El nombre debe tener al menos 2 caracteres.");
        }

        if (!email || !this.validateEmail(email)) {
            throw new Error("Email inválido.");
        }

        if (!password || password.length < 8) {
            throw new Error("La contraseña debe tener al menos 8 caracteres.");
        }
    }

    static validateEmail(email) {
        const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        return regex.test(email);
    }

    static validateLogin({ email, password }) {
        if (!email || !password) {
            throw new Error("Email y contraseña son obligatorios.");
        }
    }

    static async register({ nombre, email, password, rol = 'admin' }) {
        this.validateRegistro({ nombre, email, password });

        const existeUsuario = await UsuarioModel.getByEmail(email);
        if (existeUsuario) {
            throw new Error("El email ya está registrado.");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const usuario = await UsuarioModel.create({
            nombre,
            email,
            password: hashedPassword,
            rol
        });

        const token = this.generateToken(usuario.id, usuario.rol);

        return {
            usuario,
            token
        };
    }

    static async login({ email, password }) {
        this.validateLogin({ email, password });

        const usuario = await UsuarioModel.getByEmail(email);
        if (!usuario) {
            throw new Error("Credenciales inválidas.");
        }

        if (!usuario.estado) {
            throw new Error("Usuario desactivado. Contacta al administrador.");
        }

        const passwordValido = await bcrypt.compare(password, usuario.password);
        if (!passwordValido) {
            throw new Error("Credenciales inválidas.");
        }

        const token = this.generateToken(usuario.id, usuario.rol);

        const { password: _, ...usuarioSinPassword } = usuario;

        return {
            usuario: usuarioSinPassword,
            token
        };
    }

    static generateToken(userId, rol) {
        return jwt.sign(
            { userId, rol },                    
            process.env.JWT_SECRET,             
            { expiresIn: process.env.JWT_EXPIRES_IN || '7d' } 
        );
    }

    static verifyToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            throw new Error("Token inválido o expirado.");
        }
    }

    static async getAll() {
        return await UsuarioModel.getAll();
    }

    static async getById(id) {
        if (!id) throw new Error("El id es obligatorio");

        const usuario = await UsuarioModel.getById(id);
        if (!usuario) throw new Error("El usuario no existe.");

        return usuario;
    }

    static async update(id, data) {
        if (!id) throw new Error("El id es obligatorio");

        const usuario = await UsuarioModel.getById(id);
        if (!usuario) throw new Error("El usuario no existe.");

        return await UsuarioModel.update(id, data);
    }

    static async delete(id) {
        if (!id) throw new Error("El id es obligatorio");

        const usuario = await UsuarioModel.getById(id);
        if (!usuario) throw new Error("El usuario no existe.");

        return await UsuarioModel.delete(id);
    }
}
