<template>
    <div>
        <h1 class="headline">Activities View</h1>
        <Timeline
          v-bind:key="this.$route.params.version"
          v-bind:class="this.$route.params.version"
          v-bind:version="this.$route.params.version ? this.$route.params.version : 'v1'"
        />
    </div>
</template>

<script>
import Timeline from '../components/TimeLine/Timeline.vue';

export default {
  name: 'Activities',
  components: {
    Timeline,
  },
};
</script>

<style scoped>
    .headline{
        text-align: left;
    }
</style>
