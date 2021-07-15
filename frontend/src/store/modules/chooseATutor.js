import axios from 'axios'

function makeid(length) {
    var result = '';
    var c = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var cLength = c.length;
    for (var i = 0; i < length; i++) {
        result += c.charAt(Math.floor(Math.random() * cLength));
    }
    return result;
}

export default {
    actions: {
        async startSearch({ commit, state }) {
            commit('updateTutors', []);
            while (state.tutors.length <= 10) {
                await new Promise(res => setTimeout(() => res(), Math.round(Math.random() * 4 + 1) * 1000));
                let { data } = await axios.get(`/api/tutor/${makeid(10)}/info`);
                commit('addTutor', data);
            }
        },
    },
    mutations: {
        addTutor(state, tutor) { state.tutors.push(tutor); },
        removeTutor(state, tutor) { state.tutors.pop(tutor); },
        updateTutors(state, tutors) { state.tutors = tutors },
    },
    state: {
        tutors: [],
    },
    getters: {
        getTutors(state) { return state.tutors },
    }
}