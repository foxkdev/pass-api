import { Login, LOGIN_TYPE } from './login.domain';
import { Secret, SECRET_TYPE } from './secret.domain';

export const instanceDomainByType = (type, content) => {
  switch (type) {
    case LOGIN_TYPE:
      return Login.build(content);
    case SECRET_TYPE:
    default:
      return Secret.build(content);
  }
};
