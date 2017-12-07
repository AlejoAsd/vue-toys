<template>
  <div class="content">
    <div class="ui doubling stackable three column centered grid">
      <div id="send" class="ui column">
        <div class="ui sticky">
          <div id="send-text" class="ui segment">
            <!-- Text -->
            <h5>Text</h5>
            <div class="ui fluid right labeled input">
              <input :value="text" type="text" @keyup.enter="qAdd">
              <a class="ui tag blue label" @click="qAdd">
                Send
              </a>
            </div>
          </div>
        </div>
        <div id="send-options" class="ui segment">
          <!-- Type -->
          <h5>Output Type</h5>
          <div class="ui doubling stackable two column grid">
            <div class="column"
                :key="t.name" v-for="t in OUTPUT_TYPES">
              <button class="ui fluid button"
                      :class="{ blue: type.value === t.value }"
                      @click="updateSelectedType(t)">
                {{ t.name }}
              </button>
            </div>
          </div>
          <!-- Speed -->
          <h5>Speed</h5>
          <div class="ui blue range" id="my-range"></div>
          <input style="display: none;" id="speed" :value="speed">
          <!-- Font -->
          <h5>Font</h5>
          <div class="ui doubling stackable four column grid">
            <div class="column"
                :key="f.name" v-for="f in FONTS">
              <button class="ui fluid button"
                      :class="{ blue: font.value === f.value }"
                      @click="updateSelectedFont(f)">
                {{ f.name }}
              </button>
            </div>
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

  /* Sad hack to stop sticky from bouncing */
  .ui.fixed.sticky + div {
    margin-top: 114px;
  }

  .ui.range .inner {
    margin: 0;
  }
</style>

<script>
  import { chunk } from 'lodash';
  import { post } from 'axios';
  import '../../semantic/dist/semantic'
  import 'semantic-ui-range/range';
  import 'semantic-ui-range/range.css';

  const OUTPUT_TYPES = [
    { value: 0, name:'Scrolling Text', url: 'text/scrolling' },
    { value: 1, name:'Static Text', url: 'text/static' },
  ];

  const FONTS = [
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
        OUTPUT_TYPES,
        type: OUTPUT_TYPES[0],
        FONTS,
        font: FONTS[0],
        speed: 5,
        text: '',
        // Service variables
        service_url: 'localhost:5123/',
        queue: [],
        queue_state: undefined,
      };
    },
    methods: {
      updateSelectedType(value) { this.type = value; },
      updateSelectedFont(value) { this.font = value; },
      clearText() { this.text = '' },
      qNext() {
        if (!queue_state) {
          let entry = this.queue.pop();
          const url = entry.url && unset(entry, 'url')
          post('')
        }
      },
      qAdd() {
        queue.unshift({
          url: this.url || 'scrolling',
          texto: this.text,
          speed: this.speed,
          font: this.font,
        });
        this.clearText();
      },
      qRemove(entry) {},
    },
    mounted() {
      this.$nextTick(function () {
        $('.ui.sticky').sticky({
          context: '#send',
        });
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
