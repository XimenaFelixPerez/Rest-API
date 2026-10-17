const { getConnection, sql } = require('../db');

const getGameUser = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('Id', sql.Int, req.params.user_id)
            .query('SELECT Nombre AS name, Puntos AS points FROM UsuariosAPI WHERE Id = @Id');

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json(result.recordset[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updatePoints = async (req, res) => {
    const { points } = req.body;

    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('Id', sql.Int, req.params.user_id)
            .input('Puntos', sql.Int, points)
            .query('UPDATE UsuariosAPI SET Puntos = @Puntos WHERE Id = @Id');

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json({ message: 'Puntos actualizados', points });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getGameUser, updatePoints };