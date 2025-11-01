/**
 * Diff engine for comparing file versions
 * Uses a simple line-by-line comparison algorithm
 */

/**
 * Calculate diff between two versions of content
 */
export function calculateDiff(oldContent, newContent) {
  const oldLines = oldContent.split('\n');
  const newLines = newContent.split('\n');

  const changes = [];
  const lcs = longestCommonSubsequence(oldLines, newLines);

  let oldIndex = 0;
  let newIndex = 0;
  let lineNumber = 1;

  while (oldIndex < oldLines.length || newIndex < newLines.length) {
    const oldLine = oldLines[oldIndex];
    const newLine = newLines[newIndex];

    if (oldIndex < oldLines.length && newIndex < newLines.length && oldLine === newLine) {
      // Unchanged line
      changes.push({
        type: 'unchanged',
        lineNumber,
        oldLineNumber: oldIndex + 1,
        newLineNumber: newIndex + 1,
        content: oldLine,
      });
      oldIndex++;
      newIndex++;
      lineNumber++;
    } else if (newIndex >= newLines.length || (oldIndex < oldLines.length && !lcs.includes(oldLine))) {
      // Deleted line
      changes.push({
        type: 'deleted',
        lineNumber,
        oldLineNumber: oldIndex + 1,
        newLineNumber: null,
        content: oldLine,
      });
      oldIndex++;
    } else {
      // Added line
      changes.push({
        type: 'added',
        lineNumber,
        oldLineNumber: null,
        newLineNumber: newIndex + 1,
        content: newLine,
      });
      newIndex++;
      lineNumber++;
    }
  }

  return changes;
}

/**
 * Get only changed sections with context
 */
export function getChangedSections(diff, contextLines = 3) {
  const sections = [];
  let currentSection = null;

  diff.forEach((change, index) => {
    if (change.type !== 'unchanged') {
      // Start a new section or extend current one
      if (!currentSection) {
        currentSection = {
          startLine: Math.max(1, change.lineNumber - contextLines),
          endLine: change.lineNumber,
          changes: [],
        };

        // Add context before
        for (let i = Math.max(0, index - contextLines); i < index; i++) {
          currentSection.changes.push(diff[i]);
        }
      }

      currentSection.changes.push(change);
      currentSection.endLine = change.lineNumber;
    } else if (currentSection) {
      // Add context after
      currentSection.changes.push(change);
      currentSection.contextAfter = (currentSection.contextAfter || 0) + 1;

      if (currentSection.contextAfter >= contextLines) {
        sections.push(currentSection);
        currentSection = null;
      }
    }
  });

  // Add last section if exists
  if (currentSection) {
    sections.push(currentSection);
  }

  return sections;
}

/**
 * Get changed line numbers
 */
export function getChangedLines(diff) {
  return diff
    .filter(change => change.type !== 'unchanged')
    .map(change => ({
      type: change.type,
      lineNumber: change.newLineNumber || change.oldLineNumber,
      content: change.content,
    }));
}

/**
 * Get diff statistics
 */
export function getDiffStats(diff) {
  const stats = {
    added: 0,
    deleted: 0,
    modified: 0,
    unchanged: 0,
    total: diff.length,
  };

  diff.forEach(change => {
    if (change.type === 'added') {
      stats.added++;
    } else if (change.type === 'deleted') {
      stats.deleted++;
    } else if (change.type === 'modified') {
      stats.modified++;
    } else {
      stats.unchanged++;
    }
  });

  stats.changePercentage = ((stats.added + stats.deleted + stats.modified) / stats.total * 100).toFixed(2);

  return stats;
}

/**
 * Simple LCS algorithm for finding common lines
 */
function longestCommonSubsequence(arr1, arr2) {
  const m = arr1.length;
  const n = arr2.length;
  const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (arr1[i - 1] === arr2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Backtrack to find the actual sequence
  const lcs = [];
  let i = m, j = n;
  while (i > 0 && j > 0) {
    if (arr1[i - 1] === arr2[j - 1]) {
      lcs.unshift(arr1[i - 1]);
      i--;
      j--;
    } else if (dp[i - 1][j] > dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }

  return lcs;
}

/**
 * Format diff for display
 */
export function formatDiffForDisplay(diff, options = {}) {
  const { showLineNumbers = true, contextLines = 3 } = options;

  const sections = getChangedSections(diff, contextLines);

  return sections.map(section => {
    const lines = section.changes.map(change => {
      const prefix = change.type === 'added' ? '+ ' :
                     change.type === 'deleted' ? '- ' : '  ';
      const lineNum = showLineNumbers ? `${change.lineNumber.toString().padStart(4, ' ')} ` : '';
      return `${lineNum}${prefix}${change.content}`;
    });

    return {
      startLine: section.startLine,
      endLine: section.endLine,
      content: lines.join('\n'),
    };
  });
}

/**
 * Check if line should be analyzed in incremental review
 */
export function shouldAnalyzeLine(lineNumber, changedLines) {
  return changedLines.some(change =>
    Math.abs(change.lineNumber - lineNumber) <= 2 // Include context
  );
}

