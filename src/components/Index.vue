<template>
  <div>
    <h1 class="ui header">Available SPAs</h1>
    <div class="ui list">
      <router-link class="item" :to="entry.path"
                   :key="entry.name" v-for="entry in entries">
        {{entry.name}}
      </router-link>
      </a>
    </div>
  </div>
</template>

<script>
import { map, transform } from 'lodash';

// Import all components from the current folder
let components = require.context('.', true, /\.vue$/);
components = map(components.keys(), key => components(key));

export default {
  name: 'Index',
  data() {
    return {
      entries: transform(components, function (result, component) {
        const name = component.default.name;
        if (name !== 'Index') {
          result.push({
            name,
            component: component.default,
            path: `/${name}`,
          });
        }
      }),
    };
  },
};
</script>
