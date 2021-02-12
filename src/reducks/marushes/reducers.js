import * as Actions from './actions';
import initialState from '../store/initialState';

export const MarushesReducer = (state = initialState.marushes, action) => {
    switch (action.type) {
        case Actions.FETCH_MARUSHES:
            return {
                ...state,
                list: [...action.payload]
            }
        case Actions.SAVE_MARUSHE_INFO:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    };
};