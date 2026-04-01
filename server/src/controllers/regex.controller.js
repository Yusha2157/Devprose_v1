/**
 * testRegex — controller for POST /api/regex.
 * Placeholder: returns mock response.
 */
export async function testRegex(req, res) {
  try {
    const { pattern, testString, flags } = req.body;

    if (!pattern || testString === undefined) {
      return res.status(400).json({ success: false, error: 'Pattern and test string are required.' });
    }

    let regex;
    try {
      regex = new RegExp(pattern, flags || 'g');
    } catch (e) {
      return res.status(400).json({ success: false, error: 'Invalid regular expression format.' });
    }

    const matches = [];
    let match;

    if (regex.global) {
      while ((match = regex.exec(testString)) !== null) {
        matches.push({
          match: match[0],
          index: match.index,
          groups: match.slice(1),
        });
      }
    } else {
      match = regex.exec(testString);
      if (match) {
        matches.push({
          match: match[0],
          index: match.index,
          groups: match.slice(1),
        });
      }
    }

    return res.json({
      success: true,
      message: `${matches.length} match(es) found.`,
      data: { matches },
    });
  } catch (err) {
    console.error('Regex Controller Error:', err.message);
    return res.status(500).json({
      success: false,
      error: 'An internal error occurred. Please try again.',
    });
  }
}
