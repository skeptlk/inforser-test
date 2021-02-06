
export default {

    CREATE_POLL (state, poll) {
        state.polls = [...state.polls, poll];
    },

    UPDATE_POLL (state, poll) {
        let target = state.polls.find(p => p.email === poll.email);
        Object.assign(target, poll);
    },

    DELETE_POLL (state, poll) {
        state.polls = [...state.polls.filter(p => p.email !== poll.email)];
    }
     
};
