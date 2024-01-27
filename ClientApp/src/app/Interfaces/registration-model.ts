import { LoginModel } from './Loginmodel';
//aki edite
export interface RegistrationModel extends LoginModel {
  id?: string;
  Confirm_Password?: string;
  email?: string;
  email_Token?: string;
  phone?: string;
  Image?: string;
}
