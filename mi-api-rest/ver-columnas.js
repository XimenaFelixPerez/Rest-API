const { getConnection } = require('./db');

(async () => {
    const pool = await getConnection();
    const r = await pool.request().query(
        "SELECT COLUMN_NAME, DATA_TYPE FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'UsuariosAPI'"
    );
    console.table(r.recordset);
    process.exit();
})();