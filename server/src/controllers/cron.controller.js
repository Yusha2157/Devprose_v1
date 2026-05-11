import cronstrue from 'cronstrue';

export async function explainCron(req, res) {
  try {
    const { expression } = req.body;

    if (!expression) {
      return res.status(400).json({ success: false, error: 'Cron expression is required' });
    }

    try {
      const description = cronstrue.toString(expression, { throwExceptionOnParseError: true });
      res.json({ success: true, data: description });
    } catch (parseError) {
      return res.status(400).json({ success: false, error: 'Invalid cron expression' });
    }
  } catch (error) {
    console.error('Error explaining cron:', error.message);
    res.status(500).json({ success: false, error: 'Failed to explain cron expression' });
  }
}
