// created a Class for fetching data and interacting it;
class DataHandler {
    constructor() {
        this.map = new Map();
    }

    async fetchPosts() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            const data = await response.json();
            for (let value of data) {
                this.map.set (value.id, value);
            }
            console.log('Fetching is completed successfully!');
            return Promise.resolve();
        } catch(error) {
            console.error('Failure of data fetching!', error);
            return Promise.reject(error);
        }      
    }

    listPosts() {
        return Array.from(this.map.values()).sort((a, b) => a.title.localeCompare(b.title));
    }

    getPost(id) {
        return this.map.get(id) || null;
    }

    clearPosts() {
        this.map.clear();
    }
}

// example of usage
(async () => {
    const handler = new DataHandler();
    await handler.fetchPosts();
    console.log('Posts sorted alphabetically by titles:', handler.listPosts());
    console.log('Post with the id#1:', handler.getPost(1));
    handler.clearPosts();
    console.log('Posts are deleted, the map is empty', handler.listPosts());
})();