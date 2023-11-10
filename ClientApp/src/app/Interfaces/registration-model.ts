import { LoginModel } from './Loginmodel';
//aki edite
export interface RegistrationModel extends LoginModel {
  old_Password?: string;
  email?: string;
  email_Token?: string;
}
