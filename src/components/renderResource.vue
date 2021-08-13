<template>
  <div v-if="triple.type == 'uri'">
    <span style="cursor:pointer;" v-on:click="newSearch">
      {{ triple.prefixedValue }}
    </span>
    <a :href="triple.value" target="_blank">
      <!-- <img src="/src/assets/graphdb_logo.png"> -->
      [g]
    </a>
  </div>
  <div v-else class="truncated_text">
    {{ triple.prefixedValue }}
  </div>
</template>

<script>
// import json from "@/config/prefixes.json";

export default {
  name: "renderResource",
  props: {
    triple: Object,
  },
  data() {
    return {};
  },
  mounted() {},
  beforeUpdate() {},
  computed: {},
  methods: {
    newSearch() {
      console.log("Running newsearch with ", this.triple.prefixedValue)

      // We set the new query string and emit an event to trigger things to rerun.
      var queryString = `
        prefix : <http://my_info_graph/>

        CONSTRUCT { 
          ?Subject ?Predicate ?LTR.
          ?RTL ?Predicate ?Subject. }
        where {
          {?Subject ?Predicate ?LTR}
          UNION
          {?RTL ?Predicate ?Subject}.
        } limit 50`
      
      // var resourceID = this.triple.prefixedValue.split(':')[1] // strip the prefix
      queryString = queryString.replace(/\?Subject/g,this.triple.originalValue)

      console.log('Query string: \n',queryString)
      this.$emit('queryString',queryString)
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="@/components/search.css" />
