<template>
  <div>
    <h1>Ask a question</h1>
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
        response.data.answer = capitalize(response.data.answer);
        this.answer = response.data;
      }.bind(this));
    },
  },
};
</script>
