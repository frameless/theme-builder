import { ValidationError } from './validation-error';

export type ValidationEvent = CustomEvent<{ errors: ValidationError[] }>;
