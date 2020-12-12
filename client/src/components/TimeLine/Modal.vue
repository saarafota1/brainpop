<template>
    <div class="modal">
        <div class="body">
            <img :src="data.topic_data.icon_path" />
            <div class="title">{{ data.topic_data.name }}</div>
            <div class="date">{{ parseInt(data.d_created) | moment("DD MMM YYYY hh:mm a") }}</div>
            <div class="comment">{{ data.comment }}</div>
            <div v-if="data.score != ''" class="score">
                Score <strong>{{ data.score}}/10</strong>
            </div>
        </div>
        <button @click="$emit('close')">X</button>
    </div>
</template>

<script>
export default {
  props: ['data'],
  data() {
    return {

    };
  },
};
</script>

<style scoped>
    .modal{
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 50%;
        max-width: 500px;
        background: #fff;
        border: 3px solid gray;
        min-height: 300px;
        border-radius: 5px;
        padding:20px;
    }
    .body{
        text-align: center;
    }
    .body .title{
        font-size: 50px;
        font-weight: bold;
        margin-bottom: 20px;
    }
    .body .date{
        font-size: 20px;
        margin-bottom: 50px;
    }
    .body .comment{
        font-size: 40px;
        font-weight: bold;
        text-align: left;
        margin-bottom: 50px;
    }
    .body .score{
        font-size: 25px;
        text-align: left;
        color: #34999A;
    }
    button{
        position: absolute;
        top:20px;
        right: 20px;
        background: #fff;
        color: gray;
        text-align: center;
        border-radius: 50%;
        border: 2px solid gray;
        cursor: pointer;
    }
    img{
        margin: 0 auto;
        max-width: 100px;
    }
</style>
