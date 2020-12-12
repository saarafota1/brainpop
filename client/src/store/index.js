// import dependency to handle HTTP request to our back end
import axios from 'axios';
import Vuex from 'vuex';
import Vue from 'vue';

// load Vuex
Vue.use(Vuex);

const transformToV1 = (data) => {
  const tempArray = [];
  for (let i = 0; i < data.length; i += 1) {
    if (data[i]) {
      for (let j = 0; j < data[i].activities.length; j += 1) {
        const activitie = data[i].activities[j];
        activitie.resource_type = data[i].resource_type;
        tempArray.push(activitie);
      }
    }
  }
  return tempArray;
};

// to handle state
const state = {
  activities: [],
  hiddenActivities: [],
  search: '',
  activitiesNames: [],
  activitiesTopics: [],
  selectedTopics: [],
};

// to handle state
const getters = {};

// to handle actions
const actions = {
  getActivities({ commit, dispatch }, payload) {
    axios.get(`http://localhost:3000/activities/${payload.version}`)
      .then((response) => {
        const activities = payload.version === 'v2' ? transformToV1(response.data) : response.data;
        commit('SET_ACTIVITIES', activities);
        dispatch('getActivitieNames');
        dispatch('getActivitieTopics');
      });
  },
  getHiddenActivities({ commit }) {
    axios.get('http://localhost:3000/activities/hidden')
      .then((response) => {
        commit('SET_HIDDEN_ACTIVITIES', response.data);
      });
  },
  setSearch({ commit }, search) {
    commit('SET_SEARCH', search);
  },
  updateActivitie({ dispatch }, payload) {
    axios.delete(`http://localhost:3000/activities/${payload.act.id}`)
      .then(() => {
        dispatch('getHiddenActivities');
      });
  },
  getActivitieNames({ commit }) {
    const activitiesNames = [];
    const flags = {};
    const acts = state.activities;
    activitiesNames.push('');
    for (let i = 0; i < acts.length; i += 1) {
      if (!flags[acts[i].topic_data.name]) {
        activitiesNames.push(acts[i].topic_data.name);
        flags[acts[i].topic_data.name] = acts[i];
      }
    }
    commit('SET_ACTIVITIE_NAMES', activitiesNames);
  },
  getActivitieTopics({ commit }) {
    const activitiesTopics = [];
    const flags = {};
    const acts = state.activities;
    activitiesTopics.push('All');
    for (let i = 0; i < acts.length; i += 1) {
      if (!flags[acts[i].resource_type]) {
        activitiesTopics.push(acts[i].resource_type);
        flags[acts[i].resource_type] = acts[i];
      }
    }
    commit('SET_ACTIVITIE_TOPICS', activitiesTopics);
  },
  setSelectedTopics({ commit }, selectedTopics) {
    commit('SET_SELECTED_TOPICS', selectedTopics);
  },
};

// to handle mutations
const mutations = {
  SET_ACTIVITIES(store, activities) {
    state.activities = activities;
  },
  SET_HIDDEN_ACTIVITIES(store, hiddenActivities) {
    state.hiddenActivities = hiddenActivities;
  },
  SET_SEARCH(store, search) {
    state.search = search;
  },
  SET_ACTIVITIE_NAMES(store, activitiesNames) {
    state.activitiesNames = activitiesNames;
  },
  SET_ACTIVITIE_TOPICS(store, activitiesTopics) {
    state.activitiesTopics = activitiesTopics;
  },
  SET_SELECTED_TOPICS(store, selectedTopics) {
    state.selectedTopics = selectedTopics;
  },
};

// export store module
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
});
