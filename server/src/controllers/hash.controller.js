import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';

export async function generateHashOrUUID(req, res) {
  try {
    const { type, input } = req.body; // type can be 'uuid', 'md5', 'sha1', 'sha256', 'sha512'

    if (type === 'uuid') {
      return res.json({ success: true, data: uuidv4() });
    }

    if (!input && type !== 'uuid') {
      return res.status(400).json({ success: false, error: 'Input text is required for hashing.' });
    }

    let result;
    switch (type) {
      case 'md5':
        result = crypto.createHash('md5').update(input).digest('hex');
        break;
      case 'sha1':
        result = crypto.createHash('sha1').update(input).digest('hex');
        break;
      case 'sha256':
        result = crypto.createHash('sha256').update(input).digest('hex');
        break;
      case 'sha512':
        result = crypto.createHash('sha512').update(input).digest('hex');
        break;
      default:
        return res.status(400).json({ success: false, error: 'Invalid type provided.' });
    }

    res.json({ success: true, data: result });
  } catch (error) {
    console.error('Error generating hash/uuid:', error.message);
    res.status(500).json({ success: false, error: 'Failed to process request.' });
  }
}
