import { CanMatchFn } from '@angular/router';

export const studentGuard: CanMatchFn = (route, segments) => {
  return true;
};
