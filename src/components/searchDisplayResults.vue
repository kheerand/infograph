<template>
  <div class="Search_Output">
    <h4>Search Display</h4>
    <table class="table search_results">
      <tr class="triple_variables">
        <td v-for="v in variables" :key="v">
          {{ v }} 
        </td>
      </tr>
    <tr v-for="triple in triples" :key="triple">
        <td v-for="v in variables" :key="v">
          {{ triple[v].value }}
        </td>
    </tr>
    </table>
  </div>
</template>

<script>

export default {
  name: 'searchDisplayResults',
  props: {
    searchResults: String,
  },
  data() {
    return {
    
    }
  },
  mounted () {
    console.log("Display mounted")
    console.log("Display: ", this.searchResults)
  },
  computed: {
    variables() {
      return this.searchResults.data.head.vars;
    },
    triples() {
      var triples = []

      for (let triple of this.searchResults.data.results.bindings) {
        triples.push(triple)
      }
      console.log("Display: ",triples)
      return triples
    }
  },
  methods: {
    processResults(json) {
      var triples = json.data.results.bindings;
      this.variables = json.data.head.vars;

      for (let triple of triples) {
        this.triples.push(triple)
      }
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("component.css")
</style>
