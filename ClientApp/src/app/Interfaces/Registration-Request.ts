import { RoleModel } from './Role-Model';
import { RegistrationModel } from './registration-model';

export interface RegistrationRequestModel {
  roles: RoleModel[];
  user: RegistrationModel;
}
