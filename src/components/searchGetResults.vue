<template>
  <div class="Search_Output">
    <table class="table search_results">
      <tr class="triple_variables">
        <td v-for="v in resultVariables" :key="v">
          {{ v }} 
        </td>
      </tr>
    <tr v-for="triple in triples" :key="triple">
        <td v-for="v in resultVariables" :key="v">
          {{ triple[v].value }}
        </td>
    </tr>
    </table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'searchGetResults',
  props: {
    queryString: String,
  },
  data() {
    return {
      queryResult: "",
      resultVariables: "",
      triples: [],
    }
  },
  async mounted() {
    
    const queryPrefix = "/repositories/My_Info_graph?query="
    // const queryString = "PREFIX%20skos%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2004%2F02%2Fskos%2Fcore%23%3E%20SELECT%20%3Fs%20%3Fp%20%3Fo%20%20where%20%7B%20%20%09%3Fs%20%3Fp%20%3Fo%20.%20%20%20%20%20FILTER%20regex(%3Fo%2C%20%22exchange%22%2C%22i%22)%20%7D%20limit%20100%20";
    const queryString = this.queryString
    const queryURL = queryPrefix + queryString
    
    const response = await axios.get(queryURL)
    this.info = response

    this.processTriples(this.info)
  },
  methods: {
    processTriples(json) {
      var triples = json.data.results.bindings;
      this.resultVariables = json.data.head.vars;

      for (let triple of triples) {
        this.triples.push(triple)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("component.css")
</style>
