const Query = {
    posts(parent, args, { db }, info) {

        // 引数なしの場合、全データを取得
        if (!args.query) {
            return db.posts;
        } else {
            return db.posts.filter((post) => {
                const isTitleMatch = post.title.toLowerCase().includes(args.query.title.toLowerCase());
                const isAuthorMatch = post.author.toLowerCase().includes(args.query.toLowerCase());

                return isTitleMatch || isAuthorMatch;
            })
        }
    }
}

module.exports = Query;