import { sendApiRequest } from '../services/api.service.js';

/**
 * handleApiTest — controller for POST /api/test
 * Validates input, calls API service, returns structured response.
 */
export async function handleApiTest(req, res) {
  try {
    const { url, method, headers, body } = req.body;

    // ===== Input validation =====
    if (!url || typeof url !== 'string' || !url.trim()) {
      return res.status(400).json({
        success: false,
        error: 'URL is required and must be a non-empty string.',
      });
    }

    const validMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
    if (!method || !validMethods.includes(method.toUpperCase())) {
      return res.status(400).json({
        success: false,
        error: `Method must be one of: ${validMethods.join(', ')}`,
      });
    }

    if (headers && typeof headers !== 'object') {
      return res.status(400).json({
        success: false,
        error: 'Headers must be an object.',
      });
    }

    if (body && typeof body !== 'object') {
      return res.status(400).json({
        success: false,
        error: 'Body must be a valid JSON object.',
      });
    }

    // ===== Call API service =====
    const result = await sendApiRequest({
      url,
      method,
      headers,
      body,
    });

    return res.json({
      success: true,
      result,
    });

  } catch (err) {
    console.error('API Tester Controller Error:', err.message);

    return res.status(500).json({
      success: false,
      error: 'An internal error occurred while testing the API.',
    });
  }
}