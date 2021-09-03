import { getUser, validEmail } from './actionTypes';

export const ActionEmail = ({ email, nome }) => ({
  type: getUser,
  email,
  nome,
});

export const ValidEmail = (payload) => ({
  type: validEmail,
  payload,
});
