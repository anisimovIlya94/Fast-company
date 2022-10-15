import httpServices from "./http.service";
import localStorageService from "./localStorage.service";

const userEndPoint = "user/";

const userService = {
    get: async () => {
        const { data } = await httpServices.get(userEndPoint);
        return data;
    },
    create: async (payLoad) => {
        console.log(payLoad)
        const { data } = await httpServices.put(userEndPoint + payLoad._id, payLoad);
        return data;
    },
    getCurrentUser: async () => {
        const { data } = await httpServices.get(userEndPoint + localStorageService.getUserIdToken());
        return data;
    },
    update: async (payLoad) => {
        // console.log(payLoad)
        const { data } = await httpServices.patch(userEndPoint + payLoad._id, payLoad);
        return data
    }
};

export default userService;
