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

module.exports = {
    getHomeData,
    getBlogData,
    getFooterData,
};
