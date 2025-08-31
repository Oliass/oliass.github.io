import { CanMatchFn } from '@angular/router';

export const teacherGuard: CanMatchFn = (route, segments) => {
  return true;
};
