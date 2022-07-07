const Subscription = {
    post: {
        subscribe(parent, argsm, { pubsub }, info) {
            return pubsub.asyncIterator('post');
        }
    }
}

module.exports = Subscription;