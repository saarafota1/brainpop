<template>
    <div class='wrapper'>
        <div class="act-img">
            <img :src='act.topic_data.icon_path' v-bind:class="{bpjr: act.product==='bpjr'}" />
        </div>
        <div class="act-data">
            <div>{{ act.topic_data.name }} - {{ version }}</div>
            <div>{{ parseInt(act.d_created) | moment("DD MMM YYYY hh:mm a") }}</div>
        </div>
        <div class="act-actions">
            <div v-if="showScoreCat.includes(act.resource_type)" class='score'>
                {{act.score}}/10
            </div>
            <div
                v-if="showZoomCat.includes(act.resource_type)"
                @click="$emit('openactdetails')"
                class='watch'>
                <i class="fa fa-eye"></i>
                View Work
            </div>
            <div class="hide" @click="hide()">
                <i class="fa fa-eye-slash"></i>
                <small>Hide</small>
            </div>
        </div>
    </div >

</template>

<script>
export default {
  name: 'Activitie',
  props: ['act', 'version'],
  data() {
    return {
      showScoreCat: ['quiz', 'easy_quiz', 'challenge'],
      showZoomCat: ['quiz', 'easy_quiz', 'challenge', 'make_a_map', 'make_a_movie', 'wordplay', 'draw_about_it'],
    };
  },
  methods: {
    hide() {
      this.$store.dispatch('updateActivitie', { version: this.version, act: this.act });
    },
  },
};
</script>

<style scoped>
    .wrapper{
        padding:15px;
        border:1px solid gray;
        border-radius: 5px;
        margin-bottom: 10px;
        display: flex;
        align-items: center;

    }
    .act-img{
        flex: 1;
    }
    .act-img img{
        max-width: 50px;
        background: #01CCCB;
        border-radius: 50%;
        padding:5px;
    }
    .act-img img.bpjr{
        background: #F8B70E;
    }
    .act-data{
        flex:3;
        text-align: left;
        font-size: 14px;
    }
    .act-data div:first-child{
        font-weight: bold;
    }
    .act-data div:nth-child(2){
        font-size: 10px;
    }
    .act-actions{
        flex:6;
        text-align: right;
    }
    .act-actions div{
        display: inline-block;
        margin-right: 15px;
        color: #34999A;
        font-weight: bold;
        font-size: 14px;
    }
    .act-actions .watch,.act-actions .hide{
        cursor: pointer;
    }
    .act-actions .hide{
        color: red;
    }
</style>
