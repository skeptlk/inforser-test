
export default {

    updatePoll ({ state, commit }, poll) {
        return new Promise ((resolve, reject) => {
            commit('START_LOADING');
    
            const url = `${state.host}/posts/1`;
            const method = 'PUT';
            const body = JSON.stringify(poll);
            
            // fake request
            fetch(url, { method, body })
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
    
            const url = `${state.host}/posts`;
            const method = 'POST';
            const body = JSON.stringify(poll);
            const mode = 'no-cors';
            
            // fake request
            fetch(url, { method, mode, body })
                .then(res => res.json(), err => reject(err))
                .then(() => {
                    commit('CREATE_POLL', poll);
                    resolve(poll);
                });
        })
    },

};
