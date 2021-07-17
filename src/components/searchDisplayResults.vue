<template>
  <div class="Search_Output">
    <h4>Results</h4>
    <div v-if="validData">
    <table class="table search_results">
      <tr class="results_heading">
        <td v-for="v in variables" :key="v">
          {{ v }} 
        </td>
      </tr>
    <tr class="results_values" v-for="triple in triples" :key="triple">
        <td v-for="v in variables" :key="v">
          {{ triple[v].value }}
        </td>
    </tr>
    </table>
    </div>
    <div v-else>
      <p classs="warning">No results</p>
    </div>
  </div>
</template>

<script>
// import prefixList from "@/components/prefixHandler.js"
import json from "@/config/prefixes.json"

export default {
  name: 'searchDisplayResults',
  props: {
    searchResults: String,
  },
  data() {
    return {
      prefixes: json.prefixes,
      validData: false,
    }
  },
  mounted () {
  },
  beforeUpdate () {
    console.log("DISPLAy BEFORE: ", this.searchResults)
    if (this.searchResults.data == "")
    {
      console.log("DISPLAY search is blank")
      this.validData = false;
    }
    else if (("data" in this.searchResults) == true) {
      this.validData = true;
    }
    else
    {
      this.validData = true;
    }
  },
  computed: {
    variables() {
      console.log("DSIPLAY: ",this.searchResults.data)
      // if (("vars" in this.searchResults.data.head) == true ) {
      if (this.searchResults.data.head.vars ) {
        console.log("vars exists")
        return this.searchResults.data.head.vars;
      }
      else {
        console.log("no vars exists")
        return ""
      }
    },
    triples() {
      var triples = []

      // TODO: Add some error handling to fail gracefully if query fails.
      
      for (let triple of this.searchResults.data.results.bindings) {
        for (let i in triple) {
          // Replace with prefix if it is a URI
          if (triple[i].type == "uri") {
            triple[i].value = this.addPrefixes(triple[i].value)
          }
        }
        triples.push(triple)
      }
      return triples
    }
  },
  methods: {
    addPrefixes(item) {
      for (let prefix of this.prefixes) {
        if (item.search(prefix.value > 0)) {
          item = item.replace(prefix.value,prefix.prefix)
        }
      }

      return item
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="@/components/search.css" />
