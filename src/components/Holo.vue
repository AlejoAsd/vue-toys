<template>
  <div class="content">
    <div class="ui doubling stackable three column centered grid">
      <div id="send" class="ui column">
        <div class="ui sticky">
          <div id="send-text" class="ui segment">
            <!-- Text -->
            <h5>Text</h5>
            <div class="ui fluid right labeled input">
              <input id="text" v-model="text" type="text" @keyup.enter="qAdd">
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
          <vue-slider ref="slider" v-model="speed" :dot-size="20"
                      :min="1" :max="10" :value="5" :tooltip="false"
                      :piecewise="true" :piecewise-label="true"/>
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
  import { unset, trim } from 'lodash';
  import { post } from 'axios';
  import { stringify } from 'qs';
  import vueSlider from 'vue-slider-component';
  import '../../semantic/dist/semantic'

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

  const STATES = Object.freeze({
    IDLE: 0,
    SENDING: 1,
    STOPPED: 1,
  });

  export default {
    components: {
      vueSlider
    },
    router_config: {
      name: 'HOLO',
      icon: 'blue bullhorn',
    },
    data() {
      return {
        text: '',
        speed: 5,
        OUTPUT_TYPES,
        type: OUTPUT_TYPES[0],
        FONTS,
        font: FONTS[0],
        // Service variables
        service_url: 'localhost:5123/test/',
        queue: [],
        state: STATES.IDLE,
      };
    },
    methods: {
      updateSelectedType(value) { this.type = value; },
      updateSelectedFont(value) { this.font = value; },
      clearText() { this.text = '' },
      qStateActive(state) {
        return this.state === STATES.SENDING;
      },
      qNext() {
        if (this.qStateActive(this.state)) {
          let entry = this.queue.pop();
          // If no entries are found, update the state and exit
          if (!entry) {
            this.state = STATES.IDLE;
            return;
          }
          // Prepare URL
          let url = `${this.service_url}${entry.url}/`;
          if (!url.match('/^https?:\/\//')) url = 'http://' + url;
          // Remove url from entry to avoid sending it as data
          unset(entry, 'url');
          // Make request
          post(url, stringify(entry))
            .then(function(response) {
              console.log(`Finished ${response.data}`);
              this.qNext();
            }.bind(this));
        }
      },
      qAdd() {
        // Don't add entries with empty text
        if (trim(this.text) === '') return;
        // Add entry to the beginning of the array to make it act as a queue
        this.queue.unshift({
          url: this.type.url,
          text: this.text,
          speed: this.speed,
          font: this.font.value,
        });
        // Update the state
        this.state = STATES.SENDING;
        // Clear the text input
        this.clearText();
        // Start sending
        this.qNext();
      },
      qRemove(entry) {
        this.queue.splice(entry, 1);
      },
    },
    mounted() {
      this.$nextTick(function () {
        // Setup sticky settings for Text input
        $('.ui.sticky').sticky({
          context: '#send',
        });

        $('#text').focus();
      })
    },
  };

</script>
