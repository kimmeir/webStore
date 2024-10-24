import { CanActivateFn } from '@angular/router';
import { ProfileService } from '../../services/requests/profile/profile.service';
import { inject } from '@angular/core';

export const accountGuard: CanActivateFn = (route, state) => {
  return inject(ProfileService).isAuthorized();
};
