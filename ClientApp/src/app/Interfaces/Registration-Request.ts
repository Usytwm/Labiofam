import { RoleModel } from './Role-Model';
import { RegistrationModel } from './registration-model';

export interface RegistrationRequestModel {
  role: RoleModel;
  user: RegistrationModel;
}
