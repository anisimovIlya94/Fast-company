import httpServices from "./http.service";

const userEndPoint = "user/";

const userService = {
    get: async () => {
        const { data } = await httpServices.get(userEndPoint);
        return data;
    },
    create: async (payLoad) => {
        const { data } = await httpServices.put(userEndPoint + payLoad._id, payLoad);
        return data;
    }
};

export default userService;
