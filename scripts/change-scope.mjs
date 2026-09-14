#!/usr/bin/env node
import { countCommitChanges } from './lib/change-scope.mjs';

try {
  const [base, head = 'HEAD'] = process.argv.slice(2);
  if (!base) throw new Error('Usage: node scripts/change-scope.mjs <frozen-starter-full-commit> [submitted-full-commit]');
  const report = countCommitChanges(process.cwd(), base, head);
  console.log(JSON.stringify(report, null, 2));
  process.exitCode = report.withinLimit ? 0 : 1;
} catch (error) {
  console.error(error.message);
  process.exitCode = 2;
}
