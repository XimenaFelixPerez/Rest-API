const { getConnection, sql } = require('../db');

const login = async (req, res) => {
    const { Email, Password } = req.body;

    try {
        const pool = await getConnection();

        const result = await pool.request()
            .input('Correo', sql.VarChar, Email)
            .query('SELECT * FROM UsuariosAPI WHERE Correo = @Correo');

        const user = result.recordset[0];

        if (!user || user.Password !== Password) {
            return res.status(401).json({
                message: 'Credenciales inválidas'
            });
        }

        const { Password: _, ...userSinPassword } = user;
        res.json({ message: 'Login exitoso', user: userSinPassword });

    } catch (error) {
        console.error('ERROR LOGIN:', error);
        res.status(500).json({
            error: error.message
        });
    }
};

module.exports = { login };