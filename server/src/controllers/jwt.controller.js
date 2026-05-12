import { processJWT } from '../services/jwt.service.js';

/**
 * handleJWTRequest — controller for JWT encode/decode
 */
export async function handleJWTRequest(req, res) {
  try {
    const { token, payload, action } = req.body;

    // ===== Validation =====
    const validActions = ['encode', 'decode'];

    if (!action || !validActions.includes(action)) {
      return res.status(400).json({
        success: false,
        error: `Action must be one of: ${validActions.join(', ')}`,
      });
    }

    // Decode validation
    if (action === 'decode') {
      if (!token || typeof token !== 'string') {
        return res.status(400).json({
          success: false,
          error: 'JWT token is required.',
        });
      }
    }

    // Encode validation
    if (action === 'encode') {
      if (!payload || typeof payload !== 'object') {
        return res.status(400).json({
          success: false,
          error: 'Payload must be a valid object.',
        });
      }
    }

    // ===== Service call =====
    const result = await processJWT({
      token,
      payload,
      action,
    });

    return res.json({
      success: true,
      result,
    });

  } catch (err) {
    console.error('JWT Controller Error:', err.message);

    return res.status(500).json({
      success: false,
      error: 'An internal server error occurred.',
    });
  }
}