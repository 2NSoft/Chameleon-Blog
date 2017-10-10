/* globals $ */
const getHomeData = ()=> {
    return Promise.all( [
        $.get('/api/v1/posts?random=4'),
        $.get('/api/v1/quotes?random=1'),
        $.get('/api/v1/posts?random=3'),
        $.get('/api/v1/lists?type=quotes'),
        $.get('/api/v1/lists?type=posts'),
        $.get('/api/v1/lists?type=text&random=1'),
        $.get('/api/v1/lists?type=comments'),
    ]);
};

const getFooterData = () => {
    return Promise.all( [
        $.get('/api/v1/lists?type=posts'),
        $.get('/api/v1/lists?type=text&random=1'),
        $.get('/api/v1/lists?type=comments'),
    ]);
};
const getBlogData = (id) => {
    return Promise.all([
        $.get(`/api/v1/posts?id=${id}`),
        $.get('/api/v1/lists?type=quotes'),
        $.get('/api/v1/lists?type=posts&random=6'),
        $.get('/api/v1/lists?type=posts'),
    ]);
};

const addComment = (commentData) => {
    return $.post('/api/v1/comments', commentData );
};

const getCategoryData = (id, pageSize, pageNumber ) => {
    const query = `?id=${id}&pagesize=${pageSize}&pagenumber=${pageNumber}`;
    return Promise.all([
        $.get(`/api/v1/categories${query}`),
        $.get('/api/v1/posts?random=3'),
        $.get('/api/v1/lists?type=quotes'),
        $.get('/api/v1/lists?type=posts&random=6'),
        $.get('/api/v1/lists?type=posts'),
    ]);
};

const getUserData = (id, pageSize, pageNumber ) => {
    const query = `?id=${id}&pagesize=${pageSize}&pagenumber=${pageNumber}`;
    return Promise.all([
        $.get(`/api/v1/users${query}`),
        $.get('/api/v1/posts?random=3'),
        $.get('/api/v1/lists?type=quotes'),
        $.get('/api/v1/lists?type=posts&random=6'),
        $.get('/api/v1/lists?type=posts'),
    ]);
};

const addPost= (formData) => {
    return $.ajax({
        url: '/api/v1/posts',
        data: formData,
        cache: false,
        processData: false,
        contentType: false,
        type: 'POST',
    });
};

const addCategory= (category) => {
    return $.post('/api/v1/categories', { category });
};

const getCategories = () => {
    return $.get('/api/v1/categories');
};

module.exports = {
    getHomeData,
    getBlogData,
    getFooterData,
    getCategoryData,
    getUserData,
    getCategories,
    addPost,
    addCategory,
    addComment,
};
