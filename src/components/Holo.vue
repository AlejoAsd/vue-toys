<template>
  <div class="content">
    <div class="ui doubling stackable three column centered grid">
      <div class="ui segment column">
        <!-- Text -->
        <h5>Text</h5>
        <div class="ui fluid right labeled input">
          <input :value="text" type="text" @keyup.enter="qPush">
          <a class="ui tag blue label" @click="qPush">
            Send
          </a>
        </div>
        <!-- Speed -->
        <h5>Speed</h5>
        <div class="ui blue range" id="my-range"></div>
        <input style="display: none;" id="speed" :value="speed">
        <!-- Font -->
        <h5>Font</h5>
        <div class="ui doubling stackable four column grid">
          <div class="column"
               :key="f.name" v-for="f in fonts">
            <button class="ui fluid button"
                    :class="{ blue: font === f.value }"
                    @click="updateSelectedFont(f.value)">
              {{ f.name }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .content {
    padding: 2em 1em;
  }

  .ui.range .inner {
    margin: 0;
  }
</style>

<script>
  import { chunk } from 'lodash';
  import 'semantic-ui-range/range.css';
  import 'semantic-ui-range/range';

  const fonts = [
    { value: 0, name: 'CP437' },
    { value: 1, name: 'TINY' },
    { value: 2, name: 'SINCLAIR' },
    { value: 3, name: 'LCD' },
  ]

  export default {
    router_config: {
      name: 'HOLO',
      icon: 'blue bullhorn',
    },
    data() {
      return {
        fonts: fonts,
        font: fonts[0].value,
        speed: 5,
        text: '',
      };
    },
    methods: {
      updateSelectedFont(value) { this.font = value; },
      qPush() {},
      qPop() {},
      qRemove(entry) {},
    },
    mounted() {
      this.$nextTick(function () {
        $('#my-range').range({
          min: 1,
          max: 10,
          start: 5,
          input: '#rangevalue',
        });
      })
    },
  };

</script>
