<template>
    <div class='topics-filter'>
        <div class="filter-cube" v-bind:class="selectedTopics.includes(topic) ? 'active': null"
            @click="setSelected(topic)"
            v-for="topic in topicsNames"
            :key="topic">
            {{ titleCase(topic) }}
        </div>
    </div>
</template>

<script>
export default {
  name: 'ActivitieTopicsFilter',
  data() {
    return {
      selectedTopics: [],
    };
  },
  methods: {
    setSelected(topic) {
      if (this.selectedTopics.includes(topic)) {
        this.selectedTopics.splice(this.selectedTopics.indexOf(topic), 1);
      } else {
        this.selectedTopics.push(topic);
      }
      this.$emit('selectedTopicsChanged', this.selectedTopics);
    },
    titleCase(str) {
      const splitStr = str.toLowerCase().split('_');
      for (let i = 0; i < splitStr.length; i += 1) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
      }
      return splitStr.join(' ');
    },
  },
  computed: {
    topicsNames() {
      return this.$store.state.activitiesTopics;
    },
  },
};
</script>

<style scoped>
    .topics-filter{
        padding: 10px 0px;
    }
    .filter-cube{
        color: teal;
        border: 1px solid teal;
        padding:5px;
        text-align: center;
        display: inline-block;
        margin-right: 5px;
        border-radius: 5px;
        min-width: 80px;
        cursor: pointer;
        font-size:12px;
    }
    .filter-cube.active{
        border:3px solid teal;
        font-weight: bold;
    }
</style>
