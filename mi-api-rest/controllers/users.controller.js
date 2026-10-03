const { getConnection, sql } = require('../db');

const getUsers = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query('SELECT Id, Nombre, Correo FROM UsuariosAPI');
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
            .query('SELECT Id, Nombre, Correo FROM UsuariosAPI WHERE Id = @id');
        res.json(result.recordset[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createUser = async (req, res) => {

    const { idUsuarios, nombre, apellido, email, password } = req.body;
    const nombreCompleto = `${nombre || ''} ${apellido || ''}`.trim();
    try {
        const pool = await getConnection();
        await pool.request()
            .input('nombre', sql.VarChar, nombreCompleto)
            .input('correo', sql.VarChar, email)
            .input('password', sql.VarChar, password)
            .query(`INSERT INTO dbo.UsuariosAPI (Id, Nombre, Correo, Password)
                    SELECT ISNULL(MAX(Id), 0) + 1, @nombre, @correo, @password
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
            .query('UPDATE dbo.UsuariosAPI SET Nombre = @nombre, Correo = @correo WHERE Id = @id');
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
            .query('DELETE FROM UsuariosAPI WHERE Id = @id');
        res.json({ message: 'Usuario eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };