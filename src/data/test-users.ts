import { USER_EMAIL, USER_NAME, USER_PASSWORD } from '../../config/baseConfig';

export const testUsers = {
  customer: {
    email: USER_EMAIL,
    password: USER_PASSWORD,
    fullName: USER_NAME,
  },
} as const;
