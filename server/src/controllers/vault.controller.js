import Snippet from '../models/Snippet.js';

// Get all snippets
export async function getSnippets(req, res) {
  try {
    const snippets = await Snippet.find().sort({ createdAt: -1 });
    res.json({ success: true, data: snippets });
  } catch (error) {
    console.error('Error fetching snippets:', error.message);
    res.status(500).json({ success: false, error: 'Failed to fetch snippets' });
  }
}

// Create a snippet
export async function createSnippet(req, res) {
  try {
    const { title, content, language, tags } = req.body;

    if (!title || !content) {
      return res.status(400).json({ success: false, error: 'Title and content are required' });
    }

    const snippet = new Snippet({
      title,
      content,
      language: language || 'plaintext',
      tags: tags || [],
    });

    await snippet.save();
    res.status(201).json({ success: true, data: snippet });
  } catch (error) {
    console.error('Error creating snippet:', error.message);
    res.status(500).json({ success: false, error: 'Failed to create snippet' });
  }
}

// Delete a snippet
export async function deleteSnippet(req, res) {
  try {
    const { id } = req.params;
    const deletedSnippet = await Snippet.findByIdAndDelete(id);

    if (!deletedSnippet) {
      return res.status(404).json({ success: false, error: 'Snippet not found' });
    }

    res.json({ success: true, message: 'Snippet deleted successfully' });
  } catch (error) {
    console.error('Error deleting snippet:', error.message);
    res.status(500).json({ success: false, error: 'Failed to delete snippet' });
  }
}
