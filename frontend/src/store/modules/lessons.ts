import router from '@/router'
import backend from '@/services/backend.service'
export default {
    actions: {
        async fetchPage({ commit, state }, { _page, _size, _subject }) {

            if (_page == undefined) _page = (!isNaN(state.page)) ? state.page : 0; //default value
            if (_page < 0) _page = 0;
            if (_size == undefined) _size = (!isNaN(state.pageSize)) ? state.pageSize : 5; //default value
            if (_subject == undefined) _subject = (state.subject != undefined) ? state.subject : "";

            const data = {page: _page, size: _size, subject: _subject};

            router.replace({ query: data }).catch(() => { });
            router.put;

            const response = await backend.fetch({ path: "lessons", data: data }); // [{ name: "page", val: _page }, { name: "size", val: _size }, { name: "subject", val: _subject }]
            const page = await response.json();

            commit('updateLessons', page.lessons);
            commit('updateLessonsCount', page.lessonsCount);
            commit('updatePage', _page);
            commit('updatePageCount', page.pageCount);
            commit('updatePageSize', _size);
            commit('updateSubject', _subject);
        },
        async fetchLesson(ctx, { id }) {
            const response = await backend.fetch({ path: ("lessons/" + id), method: "GET" });
            const lesson = await response.json();
            ctx.commit('updateLesson', lesson);
        }
    },
    mutations: {
        updateLessons(state, lessons) { state.lessons = lessons; },
        updateLessonsCount(state, lessonsCount) { state.lessonsCount = lessonsCount; },
        updatePage(state, page) { state.page = page; },
        updatePageCount(state, pageCount) { state.pageCount = pageCount; },
        updatePageSize(state, pageSize) { state.pageSize = pageSize; },
        updateSubject(state, subject) { state.subject = subject; },
        updateLesson(state, lesson) { state.lesson = lesson; }
    },
    state: {
        lessons: [],
        lessonsCount: Number,
        page: Number,
        pageCount: Number,
        pageSize: Number,
        subject: "",
        lesson: {}
    },
    getters: {
        getLessons(state) { return state.lessons },
        getLessonsCount(state) { return parseInt(state.lessonsCount) },
        getPage(state) { return parseInt(state.page) },
        getPageCount(state) { return parseInt(state.pageCount) },
        getPageSize(state) { return parseInt(state.pageSize) },
        getSubject(state) { return state.subject; },
        getLesson(state) { return state.lesson }
    }
}