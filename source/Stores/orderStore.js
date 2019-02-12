import { observable } from 'mobx';

class orderStore {
    @observable statusbar_color = null;
    @observable settings = null;
    @observable login = {
        loginStatus: false,
        loginResponse: {},
    };
    @observable home = {
        LIST_ID: 0 ,
        homeGet: {},
        IMAGES: [],
        eventDetail: {},
        FEATURE_DETAIL : {},
        REPORTS: {},
        CLAIMS: {},
        TAB_LABELS: {
            amenties: ''
        }
    };
    @observable categories = [];
    @observable SEARCHING = {
        LISTING_SEARCH : {},
        LISTING_FILTER : {},
    };
    @observable SEARCH_OBJ = {};
    @observable moveToSearch = false;
    @observable CATEGORY = {};
    @observable BLOGS = {};
    @observable BLOG_DETAIL = {};
    @observable EVENTS = {};
    @observable PUB_PROFILE_DETAIL = {};
    @observable is_publicEvents = false;
}

const store = new orderStore();

export default store;
