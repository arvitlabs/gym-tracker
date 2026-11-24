export abstract class ApplicationError extends Error {
  abstract readonly code: string;

  protected constructor(message: string, cause?: unknown) {
    super(message, { cause });
  }
}
