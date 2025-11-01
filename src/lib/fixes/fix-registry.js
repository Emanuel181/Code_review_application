/**
 * Fix Registry - Central repository for all available code fixes
 */

export const fixRegistry = {
  'console-statement': {
    id: 'console-statement',
    name: 'Console Statement',
    fixes: [
      {
        id: 'remove-console',
        label: 'Remove console statement',
        description: 'Delete the entire console statement line',
        confidence: 'high',
        autoApply: false,
        effort: 'low',
        timeEstimate: 2,
        apply: (code, line) => {
          const lines = code.split('\n');
          lines.splice(line - 1, 1);
          return lines.join('\n');
        },
      },
      {
        id: 'comment-console',
        label: 'Comment out console statement',
        description: 'Keep the line but comment it out',
        confidence: 'high',
        autoApply: false,
        effort: 'low',
        timeEstimate: 1,
        apply: (code, line) => {
          const lines = code.split('\n');
          lines[line - 1] = '// ' + lines[line - 1];
          return lines.join('\n');
        },
      },
    ],
  },

  'var-keyword': {
    id: 'var-keyword',
    name: 'Var Keyword',
    fixes: [
      {
        id: 'var-to-const',
        label: 'Replace var with const',
        description: 'Use const for immutable variables',
        confidence: 'medium',
        autoApply: false,
        effort: 'low',
        timeEstimate: 3,
        apply: (code, line) => {
          const lines = code.split('\n');
          lines[line - 1] = lines[line - 1].replace(/\bvar\b/, 'const');
          return lines.join('\n');
        },
      },
      {
        id: 'var-to-let',
        label: 'Replace var with let',
        description: 'Use let for mutable variables',
        confidence: 'medium',
        autoApply: false,
        effort: 'low',
        timeEstimate: 3,
        apply: (code, line) => {
          const lines = code.split('\n');
          lines[line - 1] = lines[line - 1].replace(/\bvar\b/, 'let');
          return lines.join('\n');
        },
      },
    ],
  },

  'loose-equality': {
    id: 'loose-equality',
    name: 'Loose Equality',
    fixes: [
      {
        id: 'strict-equality',
        label: 'Use strict equality (===)',
        description: 'Replace == with ===',
        confidence: 'high',
        autoApply: true,
        effort: 'low',
        timeEstimate: 1,
        apply: (code, line) => {
          const lines = code.split('\n');
          lines[line - 1] = lines[line - 1].replace(/([^=!><])={2}([^=])/g, '$1===$2');
          return lines.join('\n');
        },
      },
    ],
  },

  'trailing-whitespace': {
    id: 'trailing-whitespace',
    name: 'Trailing Whitespace',
    fixes: [
      {
        id: 'remove-trailing-whitespace',
        label: 'Remove trailing whitespace',
        description: 'Remove whitespace at end of line',
        confidence: 'high',
        autoApply: true,
        effort: 'low',
        timeEstimate: 1,
        apply: (code, line) => {
          const lines = code.split('\n');
          lines[line - 1] = lines[line - 1].trimEnd();
          return lines.join('\n');
        },
      },
    ],
  },

  'missing-semicolon': {
    id: 'missing-semicolon',
    name: 'Missing Semicolon',
    fixes: [
      {
        id: 'add-semicolon',
        label: 'Add semicolon',
        description: 'Add semicolon at end of statement',
        confidence: 'medium',
        autoApply: false,
        effort: 'low',
        timeEstimate: 1,
        apply: (code, line) => {
          const lines = code.split('\n');
          lines[line - 1] = lines[line - 1].trimEnd() + ';';
          return lines.join('\n');
        },
      },
    ],
  },

  'long-line': {
    id: 'long-line',
    name: 'Long Line',
    fixes: [
      {
        id: 'format-long-line',
        label: 'Format long line',
        description: 'Break into multiple lines (requires manual adjustment)',
        confidence: 'low',
        autoApply: false,
        effort: 'medium',
        timeEstimate: 10,
        apply: null, // Requires AI or manual intervention
      },
    ],
  },

  'deeply-nested': {
    id: 'deeply-nested',
    name: 'Deeply Nested Code',
    fixes: [
      {
        id: 'extract-function',
        label: 'Extract to function',
        description: 'Refactor nested code into separate function (requires AI)',
        confidence: 'low',
        autoApply: false,
        effort: 'high',
        timeEstimate: 30,
        apply: null, // Requires AI assistance
      },
      {
        id: 'early-return',
        label: 'Use early returns',
        description: 'Reduce nesting with early return statements (requires AI)',
        confidence: 'low',
        autoApply: false,
        effort: 'medium',
        timeEstimate: 20,
        apply: null, // Requires AI assistance
      },
    ],
  },
};

/**
 * Get fixes for a specific issue type
 */
export function getFixesForIssue(issueType) {
  const normalizedType = issueType.toLowerCase().replace(/\s+/g, '-');
  return fixRegistry[normalizedType]?.fixes || [];
}

/**
 * Get all available fix types
 */
export function getAllFixTypes() {
  return Object.keys(fixRegistry);
}

/**
 * Check if issue has automatic fixes
 */
export function hasAutomaticFix(issueType) {
  const fixes = getFixesForIssue(issueType);
  return fixes.length > 0;
}

/**
 * Get auto-applicable fixes
 */
export function getAutoApplicableFixes(issueType) {
  const fixes = getFixesForIssue(issueType);
  return fixes.filter(fix => fix.autoApply && fix.apply);
}

/**
 * Apply a specific fix to code
 */
export function applyFix(code, issueType, fixId, lineNumber) {
  const fixes = getFixesForIssue(issueType);
  const fix = fixes.find(f => f.id === fixId);

  if (!fix || !fix.apply) {
    throw new Error(`Fix ${fixId} not found or not applicable`);
  }

  try {
    const fixedCode = fix.apply(code, lineNumber);
    return {
      success: true,
      code: fixedCode,
      fixApplied: fix.label,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Preview a fix without applying it
 */
export function previewFix(code, issueType, fixId, lineNumber) {
  try {
    const result = applyFix(code, issueType, fixId, lineNumber);
    if (!result.success) {
      return result;
    }

    // Generate diff preview
    const oldLines = code.split('\n');
    const newLines = result.code.split('\n');
    const contextStart = Math.max(0, lineNumber - 3);
    const contextEnd = Math.min(oldLines.length, lineNumber + 3);

    const preview = {
      success: true,
      before: oldLines.slice(contextStart, contextEnd).join('\n'),
      after: newLines.slice(contextStart, contextEnd).join('\n'),
      lineNumber,
      fixApplied: result.fixApplied,
    };

    return preview;
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Map issue message to fix type
 */
export function mapIssueToFixType(issueMessage) {
  const message = issueMessage.toLowerCase();

  if (message.includes('console')) return 'console-statement';
  if (message.includes('var')) return 'var-keyword';
  if (message.includes('==') || message.includes('equality')) return 'loose-equality';
  if (message.includes('trailing whitespace')) return 'trailing-whitespace';
  if (message.includes('semicolon')) return 'missing-semicolon';
  if (message.includes('long') && message.includes('line')) return 'long-line';
  if (message.includes('nested')) return 'deeply-nested';

  return null;
}

