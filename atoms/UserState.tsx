import { atom } from "recoil";

export const UserState = atom({
    key: 'UserState',
    default: {username: '', email: '', password: '', mobile: ''}
})