import {createSelector} from 'reselect';

const marushesSelector = (state) => state.marushes;

// icon取得
export const getIcons = createSelector(
    [marushesSelector],
    state => state.icons  
);

// 承認状態取得
export const getApproval = createSelector(
    [marushesSelector],
    state => state.approval  
);

// マルシェ情報取得
export const getMarushe = createSelector(
    [marushesSelector],
    state => state
);

// マルシェ申請情報取得
export const getApprovalMarushes = createSelector(
    [marushesSelector],
    state => state.list
)