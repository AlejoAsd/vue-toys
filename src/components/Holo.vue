<template>
  <div>
    <h1>LED MATRIX</h1>
    <form>
      <div class="ui input">
        <input name="question">
      </div>
      <input class="ui button" type="submit" value="Ask" @click.prevent="ask">
    </form>
    <h1 v-if="answer.answer">{{answer.answer}}</h1>
    <img :src="answer.image">
  </div>
</template>

<script>
// import { get } from 'axios';

export default {
  name: 'HOLO',
  data() {
    return {
      queue: [],
    };
  },
  methods: {},
};
</script>
