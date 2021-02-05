
export default {

    pollByEmail: (state) => 
        (email) => {
            return state.polls.find(poll => poll.email === email)
        },

    polls: (state) => state.polls,


};
