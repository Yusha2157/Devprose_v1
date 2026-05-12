import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'devprose_secret';

/**
 * processJWT — encode or decode JWT token
 */
export async function processJWT({ token, payload, action }) {

  // ===== ENCODE =====
  if (action === 'encode') {

    const encodedToken = jwt.sign(payload, SECRET_KEY, {
      expiresIn: '1h',
    });

    return {
      token: encodedToken,
    };
  }

  // ===== DECODE =====
  if (action === 'decode') {

    try {
      const decoded = jwt.verify(token, SECRET_KEY);

      return {
        valid: true,
        decoded,
      };

    } catch (error) {

      return {
        valid: false,
        error: error.message,
      };
    }
  }
}