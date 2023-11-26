import { LoginModel } from './Loginmodel';
//aki edite
export interface RegistrationModel extends LoginModel {
  id?: string;
  old_Password?: string;
  email?: string;
  email_Token?: string;
}
