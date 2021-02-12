import {createSelector} from 'reselect';

const usersSelector = (state) => state.users;

// マルシェ申請状況取得
export const getApproval = createSelector(
    [usersSelector],
    state => state.approval  
);

// icon取得
export const getIcons = createSelector(
    [usersSelector],
    state => state.icons  
);

// サインイン状態取得
export const getIsSignedIn = createSelector(
    [usersSelector],
    state => state.isSignedIn  
);

// マルシェID取得
export const getMarusheId = createSelector(
    [usersSelector],
    state => state.marusheId 
);

// 権限取得
export const getRole = createSelector(
    [usersSelector],
    state => state.role
);

// UID取得
export const getUserId = createSelector(
    [usersSelector],
    state => state.uid  
);

// ユーザー名取得
export const getUserName = createSelector(
    [usersSelector],
    state => state.username
);

// ユーザー情報取得
export const getUser = createSelector(
    [usersSelector],
    state => state
);