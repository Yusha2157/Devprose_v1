import { getAiResponse } from '../services/ai.service.js';

/**
 * handleExplain — controller for POST /api/ai/explain.
 * Validates input, calls AI service, returns structured response.
 */
export async function handleExplain(req, res) {
  try {
    const { code, language, mode } = req.body;

    // ===== Input validation =====
    if (!code || typeof code !== 'string' || !code.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Code is required and must be a non-empty string.',
      });
    }

    if (!language || typeof language !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Language is required.',
      });
    }

    const validModes = ['explain', 'debug', 'optimize'];
    if (!mode || !validModes.includes(mode)) {
      return res.status(400).json({
        success: false,
        error: `Mode must be one of: ${validModes.join(', ')}`,
      });
    }

    // ===== Call AI service =====
    const result = await getAiResponse({ code, language, mode });

    return res.json({
      success: true,
      result,
    });
  } catch (err) {
    console.error('AI Controller Error:', err.message);
    return res.status(500).json({
      success: false,
      error: 'An internal error occurred. Please try again.',
    });
  }
}
