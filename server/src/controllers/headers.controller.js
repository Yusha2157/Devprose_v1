import axios from 'axios';

/**
 * inspectHeaders — controller for POST /api/headers.
 */
export async function inspectHeaders(req, res) {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ success: false, error: 'URL is required.' });
    }

    try {
      new URL(url);
    } catch (e) {
      return res.status(400).json({ success: false, error: 'Invalid URL format.' });
    }

    const config = {
      validateStatus: () => true, // resolve promise for any status code
      timeout: 10000,
    };

    let response;
    try {
      response = await axios.head(url, config);
      if (response.status === 405 || response.status === 501) {
          response = await axios.get(url, config);
      }
    } catch (headErr) {
      // Intentionally fallback to GET if HEAD throws an error (e.g. timeout or network intercept)
      response = await axios.get(url, config);
    }

    return res.json({
      success: true,
      message: `Headers fetched successfully.`,
      data: {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      },
    });
  } catch (err) {
    console.error('Headers Controller Error:', err.message);
    return res.status(500).json({
      success: false,
      error: 'An error occurred while fetching headers (e.g. invalid host or timeout).',
    });
  }
}
