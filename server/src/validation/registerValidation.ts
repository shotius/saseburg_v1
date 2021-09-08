import { FieldError } from 'src/resolvers/FieldError';
import { UsernamePasswordInput } from 'src/resolvers/UsernamePasswordInput';

export const registerValidation = (
  credentials: UsernamePasswordInput
): [FieldError] | null => {
  if (credentials.username.length < 3) {
    return [
      {
        field: 'username',
        message: 'username must be longer then 3 character',
      },
    ];
  }
  if (credentials.password.length < 4) {
    return [
      {
        field: 'password',
        message: 'password must by more then 4 characters',
      },
    ];
  }
  if (!credentials.email.includes('@')) {
    return [
      {
        field: 'email',
        message: 'email is not valid',
      },
    ];
  }
  return null;
};
