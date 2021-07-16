<template>
    <p>
      <button type="button" v-on:click="toggleShowQuery">{{ buttonText }}</button>
    </p>
  <div v-if="showQuery" id="Search_Query">
      <textarea rows=10 cols=80 v-model="queryString" />
</div>
</template>

<script>
import axios from 'axios'

export default {
  components: {},
  name: 'searchQuery',
  props: {
    query: String,
  },
  data() {
    return {
      queryString: "",
      queryResult: "",
      showQuery: false,
      buttonText: "Show Query"
    }
  },
  beforeUpdate() {
    console.log("QUERY STRING:::",this.query)
    this.queryString = this.query;
    this.runQuery()
  },
  methods: {
    toggleShowQuery() {
      this.showQuery = !this.showQuery;
      if (this.showQuery) {
        this.buttonText = "Hide Query"
      }
      else {
        this.buttonText = "Show Query"
      }
    },
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
