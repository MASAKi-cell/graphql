const Mutation = {
    createPost(parent, args, {db}, info) {
        const postnumTotal = String(db.post.length + 1);
        const post = {
            id: postnumTotal,
            ...args.data
        }
        db.posts.push(post);

        pubsub.publish('post', {
            post: {
                mutation: 'CREATED',
                data: post
            }
        });
        return post;
    },
    updatePost(parent, args, {db}, info) {
        const {id, data} = args;
        const post = db.posts.find((post) => post.id === id);
        if(!post) {
            throw new Error('Post not found');
        }

        if(typeof data.title === 'string' && typeof data.author === 'string') {
            post.title = data.title;
            post.author = data.author;
        }

        pubsub.publish('post', {
            post: {
                mutation: 'UPDATE',
                data: post
            }
        });
        return post;
    }
}