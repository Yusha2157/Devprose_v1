import { useState } from 'react';
import Card from '../components/ui/Card';
import Textarea from '../components/ui/Textarea';
import CopyButton from '../components/ui/CopyButton';
import SaveToVaultButton from '../components/ui/SaveToVaultButton';
import ReactMarkdown from 'react-markdown';

export default function MarkdownPreview() {
  const [markdown, setMarkdown] = useState('# Hello World\n\nStart typing **markdown** here...');

  return (
    <div className="space-y-8 h-full flex flex-col">
      <div className="pt-2 flex-shrink-0">
        <h1 className="text-2xl lg:text-3xl font-extrabold mb-3 text-white">
          Markdown Preview
        </h1>
        <p className="text-sm lg:text-base max-w-lg leading-relaxed text-[var(--color-text-secondary)]">
          Live preview of your markdown syntax.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-[500px]">
        <div className="flex flex-col gap-6 h-full">
          <Card className="h-full flex flex-col">
            <div className="flex-1 flex flex-col">
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                Markdown Input
              </label>
              <textarea
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                className="flex-1 w-full p-4 rounded-xl border bg-black/20 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all border-white/10 text-white placeholder-white/30 font-mono resize-none"
                placeholder="Type your markdown here..."
              />
            </div>
          </Card>
        </div>

        <div className="flex flex-col gap-6 h-full">
          <Card className="h-full flex flex-col">
            <div className="flex items-center justify-between mb-5 flex-shrink-0">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
                Preview
              </h2>
              {markdown && (
                <div className="flex gap-2">
                  <SaveToVaultButton 
                    title={`Markdown Snippet`} 
                    content={markdown} 
                    language="markdown" 
                    tags={['markdown']} 
                  />
                  <CopyButton text={markdown} />
                </div>
              )}
            </div>

            <div className="flex-1 overflow-auto bg-black/30 rounded-xl p-6 border border-white/5 text-white prose prose-invert max-w-none">
              <ReactMarkdown>{markdown}</ReactMarkdown>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
