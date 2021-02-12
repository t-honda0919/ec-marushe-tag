export const SAVE_USER_INFO = 'SAVE_USER_INFO';
export const saveUserInfoAction = (userState) => {
    return {
        type: SAVE_USER_INFO,
        payload: userState
    };
};

export const SIGN_IN = 'SIGN_IN';
export const signInAction = (userState) => {
    return {
        type: SIGN_IN,
        payload: userState
    };
};

export const SIGN_OUT = 'SIGN_OUT';
export const signOutAction = () => {
    return {
        type: SIGN_OUT,
        payload: null
    };
};