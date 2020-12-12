<template>
  <div class="timeline">
    <h2 class="title">{{ title }}</h2>
    <ActivitiesFilter  />
    <ActivitieTopicsFilter @selectedTopicsChanged="selectedTopicsChanged" />
    <Modal v-if="modalVisible" @close="modalVisible = false" :data="modalData"/>
    <div v-for="(monthArray, year) in activitiesByMonth" :key='year'>
          <h1 class="year">{{ year }}</h1>
          <div v-for="(monthActivities, month ) in monthArray" :key='month'>
              <h2 class="month">{{ month | numberToMonth }}</h2>
              <div v-for="activitie in monthActivities"  :key='activitie.id'>
                  <div>
                    <Activitie
                    v-if="!hiddenActivities.includes(activitie.id)"
                    v-bind:version="version"
                    v-bind:act="activitie"
                    @openactdetails="openModal(activitie)"
                    />
                  </div>
              </div>
          </div>
      </div>
      <button class="btn load-more" v-if="showMoreButton" @click="showMore">
        <i class="fa fa-chevron-down"></i>
        Load More
      </button>
  </div>
</template>

<script>
// require
import Activitie from './Activitie.vue';
import ActivitiesFilter from './ActivitiesFilter.vue';
import Modal from './Modal.vue';
import ActivitieTopicsFilter from './ActivitieTopicsFilter.vue';

const moment = require('moment');

export default {
  name: 'Timeline',
  components: {
    Activitie,
    ActivitiesFilter,
    ActivitieTopicsFilter,
    Modal,
  },
  props: ['version'],
  data() {
    return {
      title: 'Timeline',
      modalVisible: false,
      modalData: null,
      items: 0,
      itemsToShow: 5,
      showMoreButton: true,
      selectedTopics: [],
    };
  },
  computed: {
    activities() {
      return this.$store.state.activities;
    },
    hiddenActivities() {
      return this.$store.state.hiddenActivities;
    },
    activitiesByMonth() {
      const years = {};
      for (let i = 0; i < this.activities.length && i < this.itemsToShow; i += 1) {
        const act = this.activities[i];
        const year = moment.unix(act.d_created, 'DD MMM YYYY hh:mm a').format('YYYY').toString();
        const month = moment.unix(act.d_created, 'DD MMM YYYY hh:mm a').format('M').toString();
        if (years[year] === undefined) {
          years[year] = {};
        }
        if (years[year][month] === undefined) {
          years[year][month] = [];
        }
        if (act.topic_data.name.includes(this.$store.state.search)) {
          if (this.selectedTopics.length <= 0 || this.selectedTopics.includes('All')) {
            years[year][month].push(act);
          } else if (this.selectedTopics.includes(act.resource_type)) {
            years[year][month].push(act);
          }
        }
      }
      return years;
    },
  },
  mounted() {
    this.$store.dispatch('getHiddenActivities');
    this.$store.dispatch('getActivities',
      { version: this.$route.params.version ? this.$route.params.version : 'v1' });
    this.$store.dispatch('getActivitieNames');
  },
  methods: {
    openModal(data) {
      this.modalData = data;
      this.modalVisible = true;
    },
    showMore() {
      if (this.activities.length > this.itemsToShow) {
        this.itemsToShow += 5;
        this.showMoreButton = true;
      } else {
        this.showMoreButton = false;
      }
    },
    selectedTopicsChanged(selectedTopics) {
      this.selectedTopics = selectedTopics;
    },
  },
};
</script>

<style scoped>
    .timeline{
      font-size: 14px;
      text-align: left;
    }
    .year{
        font-size: 16px;
        font-weight: bold;
        text-decoration: underline;
        text-align: left;
    }
    .month{
        font-size: 12px;
        text-align: center;
        padding:5px;
        max-width: 100px;
        background: #FCF8E5;
        color: #000;
        border-radius: 20px;
    }
    .title{
      text-align: left;
    }
    .btn.load-more {
      background: transparent;
      border: none;
      color: teal;
      cursor: pointer;
      font-weight: bold;
      text-align: center;
      width: 100px;
      margin: 0 auto;
      display: block;
    }
</style>
