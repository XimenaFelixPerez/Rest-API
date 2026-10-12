const crypto = require('crypto');

const calcularHash = (password, salt) =>
    crypto.createHash('sha512').update(salt + password).digest('base64url');

const hashPassword = (password) => {
    const salt = crypto.randomBytes(24).toString('base64url');
    return `${salt}:${calcularHash(password, salt)}`;
};

const verifyPassword = (password, stored) => {
    const [salt, hash] = stored.split(':');
    if (!salt || !hash) return false;
    const intento = Buffer.from(calcularHash(password, salt));
    const original = Buffer.from(hash);
    return intento.length === original.length && crypto.timingSafeEqual(intento, original);
};

module.exports = { hashPassword, verifyPassword };