export class ServiceError extends Error {
  constructor(public code: string, message: string, public status = 400, public extra: Record<string, unknown> = {}) { super(message); }
}
export function validId(id: string) {
  if (!/^[A-Za-z0-9][A-Za-z0-9._-]{0,127}$/.test(id)) throw new ServiceError('INVALID_REQUEST', 'Invalid record identifier.');
  return id;
}
export function failure(error: unknown) {
  if (error instanceof ServiceError) return Response.json({ error: { code: error.code, message: error.message }, ...error.extra }, { status: error.status });
  console.error(error);
  return Response.json({ error: { code: 'INTERNAL_ERROR', message: 'The request could not be completed.' } }, { status: 500 });
}
