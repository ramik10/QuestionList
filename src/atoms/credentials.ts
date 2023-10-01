import {atom} from 'recoil';

export const usernameState = atom({
  key: 'username',
  default: '',
});
export const passwordState = atom({
    key: 'password',
    default: '',
});