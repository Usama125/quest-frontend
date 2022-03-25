import { ADD_ADDON, DELETE_ADDON, GET_ADDONS, UPDATE_ADDON } from "../types/addonsTypes";

const initialState = {
    addons: []
}

export const addonsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ADDONS:
            return {
                ...state,
                addons: action.payload,
            };
        case DELETE_ADDON: {
            return {
                ...state,
                addons: state.addons.filter(add => add._id !== action.payload)
            }
        }
        case UPDATE_ADDON: {
            return {
                ...state,
                addons: state.addons.map(
                    (addon, i) => addon._id === action.payload.id ? { ...addon, ...action.payload.data }
                        : addon
                )
            }
        }
        case ADD_ADDON:
            return {
                ...state,
                addons: [...state.addons, action.payload]
            }
        default:
            return state;
    }
};