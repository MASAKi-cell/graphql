const Mutation = {
    createPost(parent, args, {db}, info) {
        // データの新規作成
        const postnumTotal = String(db.posts.length + 1);
        const post = {
            id: postnumTotal,
            ...args.data
        }
        db.posts.push(post);


        // Subscriptionの着火
        pubsub.publish('post', {
            post: {
                mutation: 'CREATED',
                data: post
            }
        });
        return post;

    },
    updatePost(parent, args, {db}, info) {
        // データのアップデート
        const {id, data} = args;
        const post = db.posts.find((post) => post.id === id);

        if(!post) {
            throw new Error('Post not found');
        }

        if(typeof data.title === 'string' && typeof data.author === 'string') {
            post.title = data.title;
            post.author = data.author;
        }


        // Subscriptionの着火
        pubsub.publish('post', {
            post: {
                mutation: 'UPDATE',
                data: post
            }
        });
        return post;
    },
    deletePost(parent, args, {db, pubsub}, info) {
        // データの削除
        const post = db.posts.find((post) => post.id === args.id);
        const postIndex = db.posts.findIndex((post) => post.id === args.id);

        if(postIndex === -1) {
            throw new Error('Post not found');
        }

        db.posts.splice(postIndex, 1);

        // Subscriptionの着火
        pubsub.publish('post', {
            post: {
                mutation: 'DELETED',
                data: post
            }
        });
        return post;
    }
}

module.exports = Mutation;