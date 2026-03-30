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

/**
 * Inspect HTTP headers for a given URL.
 * @param {Object} params
 * @param {string} params.url — URL to inspect
 */
export async function inspectHeaders({ url }) {
  const response = await api.post('/headers', { url });
  return response.data;
}

/**
 * Encode or decode a JWT token.
 * @param {Object} params
 * @param {string} params.token — JWT token or payload
 * @param {string} params.action — 'encode' | 'decode'
 */
export async function handleJWTApi({ token, action }) {
  const response = await api.post('/jwt', { token, action });
  return response.data;
}

/**
 * Test a regex pattern against a string.
 * @param {Object} params
 * @param {string} params.pattern — regex pattern
 * @param {string} params.testString — string to test against
 * @param {string} params.flags — regex flags
 */
export async function testRegexApi({ pattern, testString, flags }) {
  const response = await api.post('/regex', { pattern, testString, flags });
  return response.data;
}

/**
 * Format/validate a JSON string.
 * @param {Object} params
 * @param {string} params.json — raw JSON string
 */
export async function formatJSONApi({ json }) {
  const response = await api.post('/json', { json });
  return response.data;
}

/**
 * Send an HTTP request to an endpoint via the API tester.
 * @param {Object} params
 * @param {string} params.url — target URL
 * @param {string} params.method — HTTP method
 * @param {string} params.body — request body
 */
export async function testAPIEndpoint({ url, method, body }) {
  const response = await api.post('/api-tester', { url, method, body });
  return response.data;
}

export default api;

