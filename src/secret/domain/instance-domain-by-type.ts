import { Login, LOGIN_TYPE } from './login.domain';
import { Secret } from './secret.domain';

export const instanceDomainByType = (type, content) => {
  switch (type) {
    case LOGIN_TYPE:
      return Login.build(content);
    default:
      return Secret.build(content);
  }
};
