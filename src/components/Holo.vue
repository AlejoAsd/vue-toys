<template>
  <div class="content">
    <div class="ui doubling stackable four column grid">
      <div class="row">
        <div class="column">
          <!-- Text -->
          <h5>Text</h5>
          <div class="ui fluid right labeled input">
            <input :value="text" type="text" @keyup.enter="addToQueue">
            <a class="ui tag blue label" @click="addToQueue">
              Send
            </a>
          </div>
          <!-- Speed -->
          <h5>Speed</h5>
          <div class="ui blue range" id="my-range"></div>
          <input style="display: none;" id="speed" :value="speed">
          <!-- Font -->
          <h5>Font</h5>
          <div class="ui stackable two column grid">
            <div class="row">
              <div class="column" :key="font.value" v-for="f in fonts">
                <button class="ui fluid toggle button"
                        :class="{ blue: font === f.value }"
                        @click="updateSelectedFont(f.value)">
                  {{ f.name }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  .content {
    padding: 1em 1em;
  }

  .ui .button {
    margin: .25em;
  }

  .ui.range .inner {
    margin: 0;
  }
</style>

<script>
  import 'semantic-ui-range/range.css';
  import 'semantic-ui-range/range';

  const fonts = [
    { value: 0, name: 'CP437_FONT' },
    { value: 1, name: 'TINY_FONT' },
    { value: 2, name: 'SINCLAIR_FONT' },
    { value: 3, name: 'LCD_FONT' },
  ]

  $(document).ready(function () {
    $('#my-range').range({
      min: 1,
      max: 10,
      start: 5,
      input: '#rangevalue',
    });
  });

  export default {
    name: 'HOLO',
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
      addToQueue() {},
    },
  };

</script>
