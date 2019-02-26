import { observable } from 'mobx';

class orderStore {
    @observable LOGIN_SOCIAL_TYPE = null;
    @observable statusbar_color = null;
    @observable settings = null;
    @observable LOGIN_TYPE = '';
    //login
    @observable login = {
        loginStatus: false,
        loginResponse: {},
    };
    //home 
    @observable home = {
        LIST_ID: 0,
        homeGet: {},
        IMAGES: [],
        eventDetail: {},
        FEATURE_DETAIL: {},
        REPORTS: {},
        CLAIMS: {},
        TAB_LABELS: {
            amenties: ''
        }
    };
    //categories
    @observable categories = [];
    //searching events and listings
    @observable SEARCHING = {
        LISTING_SEARCH: {},
        LISTING_FILTER: {},
        LISTING_FILTER_EVENTS: {}
    };
    //searching objects
    @observable SEARCH_OBJ = {};
    @observable SEARCH_OBJ_EVENT = {};
    @observable moveToSearch = false;

    @observable CATEGORY = {};
    //Blogs
    @observable BLOGS = {};
    @observable BLOG_DETAIL = {};
    //Events
    @observable EVENTS = {};
    @observable EVENTS_SORTING = {};
    //Public Profile
    @observable PUB_PROFILE_DETAIL = {};
    @observable is_publicEvents = false;
    @observable PUB_PROFILE_ID = '';
}

const store = new orderStore();

export default store;
