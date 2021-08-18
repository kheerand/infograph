<template>
  <div v-if="triple.type == 'uri'" >
    <span style="cursor: pointer" v-on:click="newSearch">
      {{ triple.prefixedValue }}
    </span>
    <br />
    <a class="graph_link" :href="triple.value" target="_blank"> [g] </a>
    <a class="graph_link" :href="triple.visualLink" target="_blank"> [v] </a>
    <span class="graph_link" style="cursor: pointer" v-on:click="copyText">[c]</span>
  </div>
  <div v-else class="truncated_text">
    {{ triple.prefixedValue }}
  </div>
  <input type="hidden" :id="copyID" :value="copyID">
</template>

<script>
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
  computed: {
    copyID() {
      let copyID = this.triple.prefixedValue.split(":")[1]
      return(copyID)
    }
  },
  methods: {
    newSearch() {
      console.log("Running newsearch with ", this.triple.prefixedValue);

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
        } limit 50`;

      queryString = queryString.replace(
        /\?Subject/g,
        this.triple.originalValue
      );

      console.log("Query string: \n", queryString);
      this.$emit("queryString", queryString);
    },
    copyText() {
      console.log("Copy text: ");
      // var copyText = this.triple.prefixedValue.split(":")[1];
      // navigator.clipboard.writeText(copyText)

      let copyText = document.querySelector("#"+this.copyID)
      copyText.setAttribute("type","text")
      copyText.select()
      document.execCommand("copy")
      copyText.setAttribute("type","hidden")
      console.log("Copy text: ", copyText);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="@/components/search.css" />
