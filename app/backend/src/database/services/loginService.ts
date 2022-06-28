// import * as jwt from 'jsonwebtoken';
import * as Bcrypt from 'bcryptjs';
import Token from '../../utils/Token';
import Users from '../models/users';

export default class LoginService {
  static async postLogin(info: { email: 'string', password: 'string' }) {
    const user = await Users.findOne({ where: { email: info.email } });
    if (user === null) {
      return false;
    }
    const status = Bcrypt.compareSync(info.password, user.password);
    if (status === false) {
      return false;
    }
    const { id, email, role, username } = user;
    const payload = { id, email, role, username };
    const token = Token.create(payload);
    return {
      user: { id, username, role, email },
      token,
    };
  }
}