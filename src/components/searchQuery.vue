<template>
  <div id="Search_Query">
    <!-- <p>
      SPARQL query:
    </p>
      <textarea rows=10 cols=80 v-model="queryString" /> -->
    <!-- <p>
      <button type="button" v-on:click="runQuery">Query</button>
    </p> -->
</div>
</template>

<script>
import axios from 'axios'

export default {
  components: {},
  name: 'searchQuery',
  props: {
    queryString: String,
  },
  data() {
    return {
      // queryString: "",
      queryResult: "",
    }
  },
  beforeUpdate() {
    this.runQuery()
  },
  methods: {
    runQuery() {
      console.log("Search Query: ",this.queryString)

      this.updateQuery();

    },
    async updateQuery() {
      const queryPrefix = "/repositories/My_Info_graph?"
      const qs = require('querystring');

      var encodedString = qs.stringify({"query": this.queryString})
      var queryURL = queryPrefix + encodedString

      const response = await axios.get(queryURL)
      this.queryResult = response

      this.$emit('queryResult',this.queryResult)
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("component.css")
</style>
