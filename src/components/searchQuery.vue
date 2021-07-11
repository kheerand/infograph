<template>
  <div id="Search_Query">
    <p>insert search box here</p>
      <textarea rows=6 cols=40 v-model="queryString" />
    <p>
      <button type="button" v-on:click="runQuery">Query</button>
    </p>
    <!-- <p>Query result</p>
    <p>
      {{ queryResult }}
    </p> -->
</div>
</template>

<script>
import axios from 'axios'

export default {
  components: {  },
  name: 'searchMain',
  props: {
    // queryString: String,
  },
  data() {
    return {
      queryString: "",
      queryResult: "",
    }
  },
  async mounted() {
  },
  methods: {
    runQuery() {
      // this.$emit('queryRequest',this.queryString)
      this.updateQuery();
      // this.$emit('queryResult',this.queryResult)
    },
    async updateQuery() {
      const queryPrefix = "/repositories/My_Info_graph?"
      const qs = require('querystring');

      var encodedString = qs.stringify({"query": this.queryString})
      var queryURL = queryPrefix + encodedString

      console.log("raw string: ",this.queryString)
      console.log("encodedString: ",encodedString)

      const response = await axios.get(queryURL)
      this.queryResult = response
      console.log("Response:",this.queryResult.data)
      this.$emit('queryResult',this.queryResult)
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("component.css")
</style>
