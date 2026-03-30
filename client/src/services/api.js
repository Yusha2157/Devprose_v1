import axios from 'axios';

/**
 * API service layer — centralized HTTP client for all backend calls.
 * Uses the Vite proxy, so base URL is relative.
 */
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30s timeout for AI requests
});

/**
 * Send code to the AI explainer endpoint.
 *
 * @param {string} code — source code to analyze
 * @param {string} language — programming language
 * @param {string} mode — 'explain' | 'debug' | 'optimize'
 * @returns {Promise<{ success: boolean, result: string }>}
 */
export async function explainCode({ code, language, mode }) {
  const response = await api.post('/ai/explain', { code, language, mode });
  return response.data;
}

export default api;
