const User = require('../models/userModel');

const userController = {

    async getAllUsers(req, res) {
        try {
            const users = await User.getAllUsers();
            res.json({ success: true, data: users });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    async getUserById(req, res) {
        try {
            const user = await User.getUserById(req.params.id);
            if (!user) {
                return res.status(404).json({ success: false, message: 'Пользователь не найден' });
            }
            res.json({ success: true, data: user });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    async createUser(req, res) {
        try {
            const { name, email, age } = req.body;
            if (!name || !email) {
                return res.status(400).json({ success: false, message: 'Name и email обязательны' });
            }
            const newUser = await User.createUser({ name, email, age });
            res.status(201).json({ success: true, data: newUser });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    async updateUser(req, res) {
        try {
            const updated = await User.updateUser(req.params.id, req.body);
            if (!updated) {
                return res.status(404).json({ success: false, message: 'Пользователь не найден' });
            }
            res.json({ success: true, message: 'Пользователь обновлен' });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    async deleteUser(req, res) {
        try {
            const deleted = await User.deleteUser(req.params.id);
            if (!deleted) {
                return res.status(404).json({ success: false, message: 'Пользователь не найден' });
            }
            res.json({ success: true, message: 'Пользователь удален' });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
};

module.exports = userController;
