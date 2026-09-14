export const ALL_AC: string[];
export const PLACEHOLDER: RegExp;
export function readDoc(root: string, name: string): string;
export function section(markdown: string, heading: string): string | null;
export function checkSpec(root: string): string[];

export function wordCount(markdown: string): number;
export function wordLimit(text: string, maximum: number, label: string): string[];

export function checkFinalDocument(root: string, file: string): string[];
export function checkFinalDocuments(root: string): string[];
