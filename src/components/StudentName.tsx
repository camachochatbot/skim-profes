import type { Student } from '../core/model';
export const fullName = (s: Student) => `${s.first} ${s.last}`;
