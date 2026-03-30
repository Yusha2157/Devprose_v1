/**
 * testRegex — controller for POST /api/regex.
 * Placeholder: returns mock response.
 */
export async function testRegex(req, res) {
  try {
    console.log('working');

    return res.json({
      success: true,
      message: 'Feature working (placeholder)',
      data: {},
    });
  } catch (err) {
    console.error('Regex Controller Error:', err.message);
    return res.status(500).json({
      success: false,
      error: 'An internal error occurred. Please try again.',
    });
  }
}
