import axios from 'axios';

/**
 * sendApiRequest — makes HTTP request to external API
 * Automatically falls back to mock response if MOCK_API=true
 *
 * @param {Object} params
 * @param {string} params.url — API endpoint
 * @param {string} params.method — HTTP method
 * @param {Object} params.headers — request headers
 * @param {Object} params.body — request body
 * @returns {Promise<Object>} — API response data
 */
export async function sendApiRequest({ url, method, headers = {}, body = {} }) {
  const useMock = process.env.MOCK_API === 'true';

  // ===== Mock fallback =====
  if (useMock) {
    console.log('ℹ MOCK_API enabled — returning mock response');
    return getMockApiResponse({ url, method });
  }

  try {
    const startTime = Date.now();

    const response = await axios({
      url,
      method,
      headers,
      data: body,
      validateStatus: () => true, // don't throw for 4xx/5xx
    });

    const endTime = Date.now();

    return {
      status: response.status,
      data: response.data,
      headers: response.headers,
      time: `${endTime - startTime} ms`,
    };

  } catch (error) {
    return {
      status: error.response?.status || 500,
      data: error.response?.data || null,
      error: error.message,
    };
  }
}

/**
 * getMockApiResponse — generates mock API response
 * useful for testing UI without real API calls
 */
function getMockApiResponse({ url, method }) {
  return {
    status: 200,
    time: `${Math.floor(Math.random() * 200) + 50} ms`,
    data: {
      message: `Mock response for ${method} ${url}`,
      success: true,
      timestamp: new Date().toISOString(),
    },
    headers: {
      'content-type': 'application/json',
      'x-mock': 'true',
    },
  };
}