const init = (data) => {
    const controller = {
        addUser(req, res) {
            const model = {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                stringProfilePicture: 'user.png',
            };

            if (!data.users.validator.isValid(model)) {
                return Promise.reject(res.status(400)
                    .send('Data does not meet requirements!'));
            }

            return data.users.findUser(model.username)
                .then((user) => {
                    if (user) {
                        return Promise.reject('Username already exists!');
                    }
                    return data.users.filter({
                        email: model.email,
                    });
                })
                .then((users) => {
                    if (users.length) {
                        return Promise.reject('Email already used!');
                    }
                    return data.users.create(model);
                })
                .then(() => {
                    return res.status(200).send('User successfully added!');
                })
                .catch((err) => {
                    return res.status(400).send(err);
                });
        },
        updateUser(req, res) {
            return data.users.findById(req.user.id)
                .then((user) => {
                    user.username = req.user.username;
                    user.email = req.body.email || user.email;
                    user.password = req.body.password || user.password;
                    if (req.file) {
                        user.stringProfilePicture = req.file.filename;
                    }
                    if (!data.users.validator.isValid(user)) {
                        return Promise
                            .reject('Data does not meet requirements!');
                    }
                    return Promise.all([user, data.users.filter({
                        email: user.email,
                    })]);
                })
                .then(([validUser, users]) => {
                    const index = users
                        .findIndex((user) =>
                            user.id.toString() !== validUser.id.toString());
                    if (index !== -1) {
                        return Promise.reject('E-mail already in use!');
                    }
                    return data.users.updateById(validUser, req.body.password);
                })
                .then((user) => {
                    return res.status(200)
                        .send('User successfully updated!');
                })
                .catch((err) => {
                    return res.status(400).send(err);
                });
        },
        getPosts(req, res) {
            if (req.query.random) {
                const size = req.query.random || 5;
                return data.posts.getRandom(+size)
                    .then((posts) => {
                        return res.status(200).send(posts);
                    })
                    .catch((err) => {
                        return res.status(400).send(err);
                    });
            }
            if (req.query.id) {
                return data.posts.findById(req.query.id)
                    .then( (post) => {
                        return res.status(200).send(post);
                    });
            }
            return data.posts.getAll()
                .then((posts) => {
                    return res.status(200).send(posts);
                })
                .catch((err) => {
                    return res.status(400).send(err);
                });
        },
        getQuotes(req, res) {
            const prepareQuotes = (posts, size) => {
                posts = posts.map((post) => {
                    return {
                        quotes: post.quotes,
                        author: post.author,
                        postId: post._id,
                    };
                });
                const quotes = [];
                posts.forEach((el) => {
                    el.quotes.forEach((quote) => {
                        quotes.push({
                            quote,
                            author: el.author.name,
                            postId: el.postId,
                        });
                    });
                });
                if (!size) {
                    return quotes;
                }
                while (quotes.length > size) {
                    quotes.splice(Math.floor(
                        Math.random() * (quotes.length - 1)), 1);
                }
                return quotes;
            };
            if (req.query.random) {
                const size = req.query.random || 5;
                return data.posts.getRandom(+size)
                    .then((posts) => {
                        return res
                            .status(200)
                            .send(prepareQuotes(posts, size));
                    })
                    .catch((err) => {
                        return res.status(400).send(err);
                    });
            }
            return data.posts.getAll()
                .then((posts) => {
                    return res
                        .status(200)
                        .send(prepareQuotes(posts));
                })
                .catch((err) => {
                    return res.status(400).send(err);
                });
        },

        getLists(req, res) {
            const size = req.query.random || 6;
            const listType = req.query.type;
            const prepareList = (rawList) => {
                let list = [];
                switch (listType) {
                    case 'comments': {
                        list = rawList.map( (el) => {
                            return {
                                text: el.text,
                                postId: el.postId,
                             };
                         });
                        return list;
                    }
                    case 'posts': {
                        list = rawList.map( (el) => {
                            return {
                                text: el.title,
                                postId: el._id,
                             };
                         });
                        return list;
                    }
                    case 'quotes': {
                        rawList
                            .map( (el) => {
                                const quoteList = [];
                                el.quotes.forEach( ( quote ) => {
                                    quoteList.push( {
                                        text: quote,
                                        postId: el._id,
                                    });
                                });
                                return quoteList;
                             })
                             .forEach( (quote) => {
                                list = list.concat( quote );
                            });
                        while (list.length > size) {
                            list.splice(Math.floor(
                                Math.random() * (list.length - 1)), 1);
                        }
                        return list;
                    }
                    case 'text': {
                        return [{
                            text: rawList[0].text,
                            postId: rawList[0]._id,
                        }];
                    }
                    default: {
                        return 'Incorect type specified.';
                    }
                }
            };
            if (!listType) {
                return res.status(400).send('Type not specified!');
            }
            const source =
                ( listType === 'comments' ) ? data.comments : data.posts;
            if (req.query.random) {
                return source.getRandom(+size)
                    .then((posts) => {
                        return res
                            .status(200)
                            .send(prepareList(posts, size));
                    })
                    .catch((err) => {
                        return res.status(400).send(err);
                    });
            }
            return source.filter({}, size)
                .then((posts) => {
                    return res
                        .status(200)
                        .send(prepareList(posts));
                })
                .catch((err) => {
                    return res.status(400).send(err);
                });
        },
        addComment( req, res ) {
            const comment = {
                text: req.body.comment,
                createdOn: req.body.time,
                postId: req.body.postId,
                author: {
                    name: req.body.user.username,
                    id: req.body.user.id,
                    profilePic: req.body.user.profilePic,
                },
            };
            return data.comments
                .create(comment)
                .then( (dbComment)=> {
                    return Promise.all( [
                        data.posts.findById(dbComment.postId),
                        dbComment,
                    ]);
                })
                .then( ([dbPost, dbComment]) => {
                    dbComment.id = dbComment._id;
                    delete( dbComment._id );
                    dbPost.comments = dbPost.comments || [];
                    dbPost.comments.push( dbComment );
                    return data.posts.updateById( dbPost );
                })
                .then( () => {
                    return res.status(200).send();
                } )
                .catch((err) => {
                    return res.status(500).send(err);
                });
        },
        getCategories( req, res ) {
            const id = req.query.id;
            const pageSize = req.query.pagesize;
            const pageNumber = req.query.pagenumber;
            if (id) {
                return Promise.all([
                    data.categories.findById( id ),
                    data.posts.filter( {
                        'category.id': { '$eq': id } },
                        pageSize, pageNumber ),
                ])
                .then( ( [categoryData, postsData] ) => {
                    return res.status(200).send([categoryData, postsData]);
                });
            }

            return true;
        },
    };

    return controller;
};


module.exports = {
    init,
};
