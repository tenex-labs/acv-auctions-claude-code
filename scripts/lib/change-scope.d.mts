export interface ScopeReport {
  countingVersion: string; limit: number; countedCodeLines: number; applicationLines: number; testLines: number;
  documentationLines: number; evidenceLines: number; uncountable: string[]; generated: string[]; withinLimit: boolean;
  files: Array<{ path: string; category: string; additions: number | null; deletions: number | null; binary: boolean; instructionAdditions?: number; instructionDeletions?: number }>;
}
export function classifyPath(file: string): string;
export function parseChangedCode(output: string): ScopeReport;
export function countCommitChanges(repo: string, base: string, head?: string): ScopeReport & { baseSha: string; headSha: string };

export function instructionCode(text: string): string;
