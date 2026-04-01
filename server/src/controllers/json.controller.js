/**
 * formatJSON — controller for POST /api/json/format.
 * Parses raw JSON input and returns formatted (pretty-printed) output.
 */
export async function formatJSON(req, res) {
  try {
    const { json } = req.body;

    if (!json || typeof json !== 'string' || !json.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a JSON string in the "json" field.',
      });
    }

    // Parse and re-stringify with 2-space indentation
    const parsed = JSON.parse(json);
    const formatted = JSON.stringify(parsed, null, 2);

    return res.json({
      success: true,
      data: formatted,
    });
  } catch (err) {
    // JSON.parse throws SyntaxError for invalid JSON
    if (err instanceof SyntaxError) {
      return res.status(400).json({
        success: false,
        error: `Invalid JSON: ${err.message}`,
      });
    }

    console.error('JSON Controller Error:', err.message);
    return res.status(500).json({
      success: false,
      error: 'An internal error occurred. Please try again.',
    });
  }
}
