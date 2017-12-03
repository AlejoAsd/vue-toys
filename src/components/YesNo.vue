<template>
  <div>
    <h1>Ask a question</h1>
    <form target="#">
      <input name="question">
      <input type="submit" value="Ask" @click.prevent="ask">
    </form>
    <h1 v-if="answer.answer">Answer: {{answer.answer}}</h1>
    <img :src="answer.image">
  </div>
</template>

<script>
import { capitalize } from 'lodash';
import { get } from 'axios';

export default {
  name: 'YesNo',
  data() {
    return {
      answer: {
        answer: undefined,
        forced: undefined,
        image: undefined,
      },
    };
  },
  methods: {
    ask() {
      get('https://yesno.wtf/api')
      .then(function (response) {
        capitalize(response.data);
        this.answer = response.data;
      }.bind(this));
    },
  },
};
</script>
