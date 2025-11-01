/**
 * Effort Estimator - Calculates development effort for fixing issues
 */

const estimationRules = {
  // Style issues - Low effort
  'trailing-whitespace': { effort: 'low', minTime: 1, maxTime: 2, complexity: 'simple', risk: 'low' },
  'missing-semicolon': { effort: 'low', minTime: 1, maxTime: 3, complexity: 'simple', risk: 'low' },
  'long-line': { effort: 'low', minTime: 5, maxTime: 15, complexity: 'simple', risk: 'low' },

  // Best practice issues - Low to Medium effort
  'console-statement': { effort: 'low', minTime: 2, maxTime: 5, complexity: 'simple', risk: 'low' },
  'var-keyword': { effort: 'low', minTime: 3, maxTime: 10, complexity: 'simple', risk: 'medium' },
  'loose-equality': { effort: 'low', minTime: 2, maxTime: 5, complexity: 'simple', risk: 'medium' },
  'todo-comment': { effort: 'medium', minTime: 30, maxTime: 180, complexity: 'moderate', risk: 'medium' },

  // Quality issues - Medium effort
  'unused-variable': { effort: 'low', minTime: 5, maxTime: 15, complexity: 'simple', risk: 'medium' },
  'empty-file': { effort: 'low', minTime: 5, maxTime: 30, complexity: 'simple', risk: 'low' },
  'print-statement': { effort: 'low', minTime: 2, maxTime: 10, complexity: 'simple', risk: 'low' },
  'hard-coded-color': { effort: 'low', minTime: 10, maxTime: 30, complexity: 'moderate', risk: 'low' },

  // Performance issues - Medium to High effort
  'large-file': { effort: 'very-high', minTime: 120, maxTime: 480, complexity: 'complex', risk: 'high' },
  'deeply-nested': { effort: 'high', minTime: 60, maxTime: 180, complexity: 'complex', risk: 'high' },

  // Complexity issues - High effort
  'high-complexity': { effort: 'high', minTime: 90, maxTime: 240, complexity: 'complex', risk: 'high' },
  'cyclomatic-complexity': { effort: 'high', minTime: 90, maxTime: 240, complexity: 'complex', risk: 'high' },

  // Syntax errors - Variable effort
  'syntax-error': { effort: 'medium', minTime: 15, maxTime: 120, complexity: 'moderate', risk: 'high' },

  // Accessibility - Medium effort
  'missing-alt': { effort: 'low', minTime: 5, maxTime: 15, complexity: 'simple', risk: 'low' },
  'aria-attribute': { effort: 'medium', minTime: 15, maxTime: 45, complexity: 'moderate', risk: 'medium' },
};

/**
 * Estimate effort for a single issue
 */
export function estimateIssue(issue) {
  const type = normalizeIssueType(issue.type || issue.message);
  const rule = estimationRules[type] || getDefaultEstimation(issue);

  // Calculate confidence based on rule match
  const confidence = estimationRules[type] ? 0.85 : 0.50;

  // Adjust based on severity
  const severityMultiplier = getSeverityMultiplier(issue.severity);
  const adjustedMinTime = Math.ceil(rule.minTime * severityMultiplier);
  const adjustedMaxTime = Math.ceil(rule.maxTime * severityMultiplier);

  // Generate factors
  const factors = generateFactors(issue, rule);

  // Calculate priority score
  const priority = calculatePriority(issue, rule);

  return {
    issueId: issue.id || generateIssueId(issue),
    effort: rule.effort,
    timeEstimate: {
      min: adjustedMinTime,
      max: adjustedMaxTime,
      unit: 'minutes',
      average: Math.ceil((adjustedMinTime + adjustedMaxTime) / 2),
    },
    complexity: rule.complexity,
    riskLevel: rule.risk,
    confidence,
    factors,
    priority,
    autoFixAvailable: hasAutoFix(type),
  };
}

/**
 * Estimate effort for multiple issues
 */
export function estimateBatch(issues) {
  const estimations = issues.map(issue => estimateIssue(issue));

  // Calculate totals
  const totalMinTime = estimations.reduce((sum, est) => sum + est.timeEstimate.min, 0);
  const totalMaxTime = estimations.reduce((sum, est) => sum + est.timeEstimate.max, 0);
  const averageTime = estimations.reduce((sum, est) => sum + est.timeEstimate.average, 0);

  // Group by effort level
  const byEffort = {
    low: estimations.filter(e => e.effort === 'low').length,
    medium: estimations.filter(e => e.effort === 'medium').length,
    high: estimations.filter(e => e.effort === 'high').length,
    'very-high': estimations.filter(e => e.effort === 'very-high').length,
  };

  // Group by complexity
  const byComplexity = {
    simple: estimations.filter(e => e.complexity === 'simple').length,
    moderate: estimations.filter(e => e.complexity === 'moderate').length,
    complex: estimations.filter(e => e.complexity === 'complex').length,
  };

  // Group by risk
  const byRisk = {
    low: estimations.filter(e => e.riskLevel === 'low').length,
    medium: estimations.filter(e => e.riskLevel === 'medium').length,
    high: estimations.filter(e => e.riskLevel === 'high').length,
  };

  // Recommend order
  const recommended = prioritizeIssues(estimations);

  return {
    estimations,
    summary: {
      totalIssues: issues.length,
      timeEstimate: {
        min: totalMinTime,
        max: totalMaxTime,
        average: averageTime,
        unit: 'minutes',
        formatted: formatTime(averageTime),
      },
      distribution: {
        effort: byEffort,
        complexity: byComplexity,
        risk: byRisk,
      },
      autoFixable: estimations.filter(e => e.autoFixAvailable).length,
    },
    recommended,
  };
}

/**
 * Prioritize issues based on multiple factors
 */
export function prioritizeIssues(estimations) {
  return estimations
    .sort((a, b) => b.priority - a.priority)
    .map((est, index) => ({
      ...est,
      rank: index + 1,
      reason: getPriorityReason(est),
    }));
}

/**
 * Calculate priority score (0-100)
 */
function calculatePriority(issue, rule) {
  let score = 50; // Base score

  // Severity impact (30 points max)
  const severityScores = { error: 30, warning: 20, info: 10 };
  score += severityScores[issue.severity] || 10;

  // Effort impact (lower effort = higher priority) (20 points max)
  const effortScores = { low: 20, medium: 10, high: 5, 'very-high': 0 };
  score += effortScores[rule.effort] || 5;

  // Risk impact (lower risk = higher priority) (15 points max)
  const riskScores = { low: 15, medium: 10, high: 5 };
  score += riskScores[rule.risk] || 5;

  // Auto-fix availability (15 points bonus)
  if (hasAutoFix(normalizeIssueType(issue.type || issue.message))) {
    score += 15;
  }

  // Type-specific adjustments
  if (issue.type === 'syntax') {
    score += 10; // Syntax errors should be fixed first
  }

  return Math.min(100, Math.max(0, score));
}

/**
 * Get priority reason
 */
function getPriorityReason(estimation) {
  if (estimation.priority >= 80) {
    return 'High severity, low effort';
  } else if (estimation.priority >= 60) {
    return 'Good effort/impact ratio';
  } else if (estimation.priority >= 40) {
    return 'Moderate priority';
  } else {
    return 'Lower priority, consider later';
  }
}

/**
 * Generate factors for estimation
 */
function generateFactors(issue, rule) {
  const factors = [];

  if (rule.effort === 'low') {
    factors.push('Simple fix with minimal changes');
  } else if (rule.effort === 'high' || rule.effort === 'very-high') {
    factors.push('Requires significant refactoring');
  }

  if (rule.complexity === 'complex') {
    factors.push('Complex code structure may require careful analysis');
  }

  if (rule.risk === 'high') {
    factors.push('Changes may affect other parts of the codebase');
    factors.push('Comprehensive testing recommended');
  }

  if (issue.line > 0) {
    factors.push(`Located at line ${issue.line}`);
  }

  if (hasAutoFix(normalizeIssueType(issue.type || issue.message))) {
    factors.push('Automatic fix available');
  }

  return factors;
}

/**
 * Get severity multiplier
 */
function getSeverityMultiplier(severity) {
  const multipliers = {
    error: 1.5,
    warning: 1.0,
    info: 0.8,
  };
  return multipliers[severity] || 1.0;
}

/**
 * Get default estimation for unknown types
 */
function getDefaultEstimation(issue) {
  const severity = issue.severity || 'info';

  if (severity === 'error') {
    return { effort: 'high', minTime: 30, maxTime: 120, complexity: 'moderate', risk: 'high' };
  } else if (severity === 'warning') {
    return { effort: 'medium', minTime: 15, maxTime: 60, complexity: 'moderate', risk: 'medium' };
  } else {
    return { effort: 'low', minTime: 5, maxTime: 30, complexity: 'simple', risk: 'low' };
  }
}

/**
 * Normalize issue type
 */
function normalizeIssueType(type) {
  if (!type) return 'unknown';
  return type.toLowerCase().replace(/\s+/g, '-');
}

/**
 * Check if auto-fix is available
 */
function hasAutoFix(type) {
  const autoFixTypes = [
    'trailing-whitespace',
    'loose-equality',
    'missing-semicolon',
    'console-statement',
    'var-keyword',
  ];
  return autoFixTypes.includes(type);
}

/**
 * Generate issue ID
 */
function generateIssueId(issue) {
  return `issue-${issue.type}-${issue.line}-${Date.now()}`;
}

/**
 * Format time in human-readable format
 */
function formatTime(minutes) {
  if (minutes < 60) {
    return `${minutes} minutes`;
  } else if (minutes < 1440) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  } else {
    const days = Math.floor(minutes / 1440);
    const hours = Math.floor((minutes % 1440) / 60);
    return hours > 0 ? `${days}d ${hours}h` : `${days}d`;
  }
}

/**
 * Get effort color for UI
 */
export function getEffortColor(effort) {
  const colors = {
    low: 'green',
    medium: 'yellow',
    high: 'orange',
    'very-high': 'red',
  };
  return colors[effort] || 'gray';
}

/**
 * Get effort icon for UI
 */
export function getEffortIcon(effort) {
  const icons = {
    low: '⚡',
    medium: '⏱️',
    high: '🔨',
    'very-high': '🏗️',
  };
  return icons[effort] || '📝';
}

