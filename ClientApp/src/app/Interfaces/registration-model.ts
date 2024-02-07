import { LoginModel } from './Loginmodel';
//aki edite
export interface RegistrationModel extends LoginModel {
  id?: string;
  confirm_Password?: string;
  email?: string;
  email_Token?: string;
  phone?: string;
  image?: string;
}
