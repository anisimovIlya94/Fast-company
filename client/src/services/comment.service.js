import httpServices from "./http.service";

const commentEndPoint = "comment/";

const commentService = {
    createComment: async (content) => {
        const { data } = await httpServices.put(commentEndPoint + content._id, content);
        return data;
    },
    getComments: async (pageId) => {
        const { data } = await httpServices.get(commentEndPoint, {
            params: {
                orderBy: '"pageId"',
                equalTo: `"${pageId}"`
            }
        });
        return data;
    },
    removeComment: async (commentId) => {
        const { data } = await httpServices.delete(commentEndPoint + commentId);
        return data;
    }
};

export default commentService;
