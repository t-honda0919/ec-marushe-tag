export const FETCH_MARUSHES = "FETCH_MARUSHES";
export const fetchMarushesAction = (marushes) => {
    return {
        type: FETCH_MARUSHES,
        payload: marushes
    };
};

export const SAVE_MARUSHE_INFO = 'SAVE_MARUSHE_INFO';
export const saveMarusheInfoAction = (marusheState) => {
    return {
        type: SAVE_MARUSHE_INFO,
        payload: marusheState
    };
};