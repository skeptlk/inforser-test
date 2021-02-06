
export default {

    updatePoll ({ state, commit }, { poll, password }) {
        return new Promise ((resolve, reject) => {    
            if (poll.password !== password) {
                reject("Incorrect password");
                return;
            }
    
            const url = `${state.host}/posts/1`;
            const method = 'PUT';
            const body = JSON.stringify(poll);
            
            // fake request
            fetch(url, { method, body })
                .then(res => res.text(), err => reject(err))
                .then(() => {
                    commit('UPDATE_POLL', poll);
                    resolve(poll);
                });
        });
    },

    createPoll ({ state, commit, getters }, poll) {
        return new Promise ((resolve, reject) => {  
            // check email
            if (getters.pollByEmail(poll.email)) {
                reject("Duplicate email");
                return;
            }  
            const url = `${state.host}/posts`;
            const method = 'POST';
            const body = JSON.stringify(poll);
            const mode = 'no-cors';
            
            // fake request
            fetch(url, { method, mode, body })
                .then(res => res.text(), err => reject(err))
                .then(() => {
                    commit('CREATE_POLL', poll);
                    resolve(poll);
                });
        });
    },

    deletePoll ({ state, commit }, { poll, password }) {
        return new Promise ((resolve, reject) => {
            if (poll.password !== password) {
                reject("Incorrect password");
                return;
            }
    
            const url = `${state.host}/posts/1`;
            const method = 'DELETE';
            
            // fake request
            fetch(url, { method })
                .then(res => res.json(), err => reject(err))
                .then(() => {
                    commit('DELETE_POLL', poll);
                    resolve(poll);
                });
        });
    }

};
