<template>
  <div class="padding">
    <div class="ui centered container">
      <div class="ui segment">
        <h1 class="ui centered header">Available SPAs</h1>
        <div class="ui divider"/>
        <div class="ui list">
          <router-link class="item"
                      :key="entry.name" v-for="entry in entries"
                      :to="entry.path" :disabled="entry.disabled">
            <h2 class="ui header">
              <i class="circular icon"
                :class="entry.icon || 'star'"></i>
              <div class="content">
                {{ entry.name }}
                <div v-if="entry.description"
                    class="sub header">
                  {{ entry.description }}
                </div>
              </div>
            </h2>
          </router-link>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .padding {
    padding: 2em 1em;
  }
</style>

<script>
import { map, transform } from 'lodash';

// Import all components from the current folder
let components = require.context('.', true, /\.vue$/);
components = map(components.keys(), key => components(key));

export default {
  router_config: {
    enabled: false,
    name: 'Index',
  },
  data() {
    return {
      entries: transform(components, function (result, component) {
        const config = component.default.router_config;
        const filename = component.default.__file
                                  .replace('\\', '/')
                                  .split('/')
                                  .pop();
        // If no config was defined setup an entry to alert the user
        if (!config) {
          result.push({
            disabled: true,
            path: '/',
            icon: 'red exclamation',
            name: `Failed to load \`${filename}\``,
            description: 'No router config was found for this app.',
          })
        }
        // Don't load disabled entries
        else if (config.enabled !== undefined && !config.enabled) {
          return;
        }
        // Load the config
        else {
          result.push({
            ...config,
            component: component.default,
            path: `/${config.path || config.name}`,
          });
        }
      }),
    };
  },
};
</script>
