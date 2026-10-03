const { getConnection, sql } = require('../db');

const getUsers = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query('SELECT * FROM UsuariosAPI');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.Int, req.params.id)
            .query('SELECT idUsuarios, Nombre, Apellido, Email FROM UsuariosAPI WHERE idUsuarios = @id');
        res.json(result.recordset[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createUser = async (req, res) => {

    const { idUsuarios, nombre, apellido, email, password } = req.body;
    try {
        const pool = await getConnection();
        await pool.request()
            .input('idUsuarios', sql.Int, idUsuarios)
            .input('nombre', sql.VarChar, nombre)
            .input('apellido', sql.VarChar, apellido)
            .input('email', sql.VarChar, email)
            .input('password', sql.VarChar, password)
            .query(`INSERT INTO dbo.UsuariosAPI (idUsuarios, Nombre, Apellido, Email, Password)
                    SELECT ISNULL(MAX(idUsuarios), 0) + 1, @nombre, @apellido, @email, @password
                    FROM dbo.UsuariosAPI`);
        res.status(201).json({ message: 'Usuario creado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

};

const updateUser = async (req, res) => {
    const { nombre, email } = req.body;
    try {
        const pool = await getConnection();
        await pool.request()
            .input('id', sql.Int, req.params.id)
            .input('nombre', sql.VarChar, nombre)
            .input('email', sql.VarChar, email)
            .query('UPDATE dbo.UsuariosAPI SET Nombre = @nombre, Email = @email WHERE idUsuarios = @id');
        res.json({ message: 'Usuario actualizado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

};
const deleteUser = async (req, res) => {
    try {
        const pool = await getConnection();
        await pool.request()
            .input('id', sql.Int, req.params.id)
            .query('DELETE FROM UsuariosAPI WHERE idUsuarios = @id');
        res.json({ message: 'Usuario eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };