<template>
    <div>
      <Autocomplete
        default-value=""
        @submit="onSubmit"
        :search="searchAct">
      </Autocomplete>
    </div>
</template>

<script>
import Autocomplete from '@trevoreyre/autocomplete-vue';
import '@trevoreyre/autocomplete-vue/dist/style.css';

export default {
  name: 'ActivitiesFilter',
  components: { Autocomplete },
  data() {
    return {
      value: '',
    };
  },
  methods: {
    searchAct(input) {
      if (input.length < 1) { return ['']; }
      return this.optionss.filter(option => option.toLowerCase()
        .startsWith(input.toLowerCase()));
    },
    onSubmit(result) {
      this.search = result;
    },
  },
  computed: {
    search: {
      get() {
        return this.$store.state.search;
      },
      set(value) {
        this.$store.commit('SET_SEARCH', value);
      },
    },
    optionss() {
      return this.$store.state.activitiesNames;
    },
  },
  mounted() {
    this.$store.dispatch('getActivities',
      { version: this.$route.params.version ? this.$route.params.version : 'v1' });
  },
};
</script>
<style src="vue-advanced-search/dist/AdvancedSearch.css"></style>
<style scoped>
  .search{
    padding: 5px;
    border-radius: 5px;
    border: 1px solid grey;
  }
</style>
