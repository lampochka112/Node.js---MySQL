const { pool } = require('../config/database');

class User {
  
    static async getAllUsers() {
        try {
            const [rows] = await pool.query('SELECT * FROM users');
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async getUserById(id) {
        try {
            const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async createUser(userData) {
        const { name, email, age } = userData;
        try {
            const [result] = await pool.query(
                'INSERT INTO users (name, email, age) VALUES (?, ?, ?)',
                [name, email, age]
            );
            return { id: result.insertId, ...userData };
        } catch (error) {
            throw error;
        }
    }

    // Обновить пользователя
    static async updateUser(id, userData) {
        const { name, email, age } = userData;
        try {
            const [result] = await pool.query(
                'UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?',
                [name, email, age, id]
            );
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }

    static async deleteUser(id) {
        try {
            const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = User;
