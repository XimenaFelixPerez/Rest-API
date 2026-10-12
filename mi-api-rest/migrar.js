const { getConnection, sql } = require('./db');
const { hashPassword } = require('./utils/hash');

const migrar = async () => {
    const pool = await getConnection();
    const result = await pool.request().query('SELECT Id, Password FROM dbo.UsuariosAPI');
    for (const u of result.recordset) {
        if (/^[A-Za-z0-9_-]{32}:[A-Za-z0-9_-]{86}$/.test(u.Password)) continue;
        await pool.request()
            .input('id', sql.Int, u.Id)
            .input('password', sql.VarChar, hashPassword(u.Password))
            .query('UPDATE dbo.UsuariosAPI SET Password = @password WHERE Id = @id');
    }
    process.exit(0);
};

migrar();