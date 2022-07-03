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
    }
}