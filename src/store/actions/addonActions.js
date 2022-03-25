import { toast } from "react-toastify";
import AddonsApi from "../../api/Addons";
import { ADD_ADDON, DELETE_ADDON, GET_ADDONS, UPDATE_ADDON } from "../types/addonsTypes";

export const getAddons = () => async (dispatch, getState) => {
    try {
        const response = await AddonsApi.getAllAddons();

        dispatch({
            type: GET_ADDONS,
            payload: response.data.data
        })
        return response;
    } catch (err) {
        toast.error("Problem while getting addons");
    }
}

export const deleteAddon = (id) => async (dispatch, getState) => {
    try {
        await AddonsApi.deleteAddon(id);

        dispatch({
            type: DELETE_ADDON,
            payload: id
        });
        toast.success("Addon deleted successfully");
    } catch (err) {
        toast.error(err.response.data.message);
    }
}

export const createAddon = (data) => async (dispatch, getState) => {
    try {
        await AddonsApi.createAddon(data);
        dispatch({
            type: ADD_ADDON,
            payload: data
        })
        toast.success("Addon created successfully");
    } catch (err) {
        toast.error(err.response.data.message);
    }
}

export const updateAddon = (id, data) => async (dispatch, getState) => {
    try {
        await AddonsApi.updateAddon(id, data);
        dispatch({
            type: UPDATE_ADDON,
            payload: {
                data,
                id
            }
        })
        toast.success("Addon update successfully");
    } catch (err) {
        toast.error(err.response.data.message);
    }
}