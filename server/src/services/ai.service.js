import OpenAI from 'openai';

/**
 * getAiResponse — calls OpenAI API or returns mock response.
 * Automatically falls back to mock if OPENAI_API_KEY is not set.
 *
 * @param {Object} params
 * @param {string} params.code — source code to analyze
 * @param {string} params.language — programming language
 * @param {string} params.mode — 'explain' | 'debug' | 'optimize'
 * @returns {Promise<string>} — AI analysis text
 */
export async function getAiResponse({ code, language, mode }) {
  const apiKey = process.env.OPENAI_API_KEY;

  // Use mock if no API key is configured
  if (!apiKey) {
    console.log('ℹ No OpenAI key set — returning mock response');
    return getMockResponse({ code, language, mode });
  }

  // ===== Real OpenAI call =====
  const openai = new OpenAI({ apiKey });

  const systemPrompts = {
    explain: `You are an expert code tutor. Explain the following ${language} code clearly and concisely. Break it down step by step. Use simple language that a junior developer can understand.`,
    debug: `You are an expert debugger. Analyze the following ${language} code for bugs, potential issues, edge cases, and common mistakes. List each issue with a brief explanation and suggested fix.`,
    optimize: `You are a performance optimization expert. Analyze the following ${language} code and suggest concrete improvements for performance, readability, and best practices. Provide the optimized version where applicable.`,
  };

  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: systemPrompts[mode] },
      { role: 'user', content: code },
    ],
    temperature: 0.4,
    max_tokens: 1500,
  });

  return completion.choices[0].message.content;
}

/**
 * getMockResponse — generates a realistic mock response for testing
 * without an OpenAI API key.
 */
function getMockResponse({ code, language, mode }) {
  const lineCount = code.split('\n').length;

  const mocks = {
    explain: `📖 CODE EXPLANATION (${language.toUpperCase()})
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This ${language} code snippet contains ${lineCount} line(s).

Here's a step-by-step breakdown:

1. **Structure**: The code follows standard ${language} conventions and patterns.

2. **Logic Flow**: The program processes data through a defined sequence of operations, handling input and producing output as expected.

3. **Key Concepts Used**:
   • Variable declarations and assignments
   • Control flow (conditionals/loops if present)
   • Function definitions and calls

4. **Summary**: This code appears to be a well-structured ${language} program. Each section serves a clear purpose within the overall logic.

💡 Note: This is a mock response. Set your OPENAI_API_KEY in the server .env file to get real AI-powered explanations.`,

    debug: `🐛 BUG ANALYSIS (${language.toUpperCase()})
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Analyzed ${lineCount} line(s) of ${language} code.

Potential Issues Found:

⚠ Issue 1: Input Validation
  → Consider adding null/undefined checks for function parameters.
  → Suggested fix: Add guard clauses at the top of each function.

⚠ Issue 2: Error Handling
  → No try-catch blocks detected for operations that may throw.
  → Suggested fix: Wrap risky operations in proper error handling.

⚠ Issue 3: Edge Cases
  → Empty input handling may not be addressed.
  → Consider what happens with boundary values.

✅ General: The code structure is clean, but adding defensive programming patterns would improve robustness.

💡 Note: This is a mock response. Set your OPENAI_API_KEY in the server .env file for real AI debugging.`,

    optimize: `⚡ OPTIMIZATION SUGGESTIONS (${language.toUpperCase()})
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Analyzed ${lineCount} line(s) of ${language} code.

Optimization Opportunities:

🔧 Performance:
  1. Consider caching frequently computed values.
  2. Use efficient data structures (Maps/Sets instead of arrays for lookups).
  3. Minimize repeated string concatenations.

📐 Readability:
  1. Extract magic numbers into named constants.
  2. Break complex functions into smaller, single-responsibility functions.
  3. Add JSDoc/docstring comments for public APIs.

🏗 Best Practices:
  1. Use const for variables that don't change.
  2. Prefer modern ${language} syntax and idioms.
  3. Consider adding input validation at function boundaries.

Overall: The code is functional. These optimizations would bring it closer to production quality.

💡 Note: This is a mock response. Set your OPENAI_API_KEY in the server .env file for real AI optimization.`,
  };

  return mocks[mode] || mocks.explain;
}
