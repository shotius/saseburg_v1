import { FieldError } from 'src/resolvers/FieldError';
import { RegisterCredentials } from 'src/resolvers/RegisterCredentials';

export const registerValidation = (
  credentials: RegisterCredentials
): [FieldError] | null => {
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
