
export default {

    updatePoll ({ state, commit }, poll) {
        return new Promise ((resolve, reject) => {
            commit('START_LOADING');
    
            const url = `${state.host}/posts/${poll.email}`;
            const method = 'PUT';
            const data = JSON.stringify(poll);
            const mode = 'no-cors';
            
            // fake request
            fetch(url, { method, mode, data })
                .then(res => res.json(), err => reject(err))
                .then(() => {
                    commit('UPDATE_POLL', poll);
                    resolve(poll);
                });
        })
    },

    createPoll ({ state, commit }, poll) {
        return new Promise ((resolve, reject) => {
            commit('START_LOADING');
    
            const url = `${state.host}/posts/${poll.email}`;
            const method = 'POST';
            const data = JSON.stringify(poll);
            const mode = 'no-cors';
            
            // fake request
            fetch(url, { method, mode, data })
                .then(res => res.json(), err => reject(err))
                .then(() => {
                    commit('CREATE_POLL', poll);
                    resolve(poll);
                });
        })
    },

};
