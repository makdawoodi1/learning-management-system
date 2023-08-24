import { isRejectedWithValue } from '@reduxjs/toolkit';
import { resetStateAction } from '../actions/resetState';

export const unauthenticatedMiddleware = ({ dispatch }) => (next) => (action) => {
    if (isRejectedWithValue(action) && action.payload.status === 401) {
        dispatch(resetStateAction());
    }

    return next(action)
}