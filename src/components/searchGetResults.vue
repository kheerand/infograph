<template>
  <div class="Search_Output">
    <h4>Query string</h4>
    <p>
      {{ queryString }}
    </p>
    <p>
      {{ displayQuery }}
    </p>
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
      serialisedQuery: "",
    }
  },
  mounted () {
    this.updateQuery()
    this.serialiseQuery()
  },
  computed: {
    displayQuery() {
      this.updateQuery;
      return this.queryResult;
    }
  },
  methods: {
    async updateQuery() {
      // const queryPrefix = "/repositories/My_Info_graph?query="
      const queryPrefix = "/repositories/My_Info_graph"
      const params = new URLSearchParams();

      params.append("query",this.queryString)
      
      const response = await axios.get(queryPrefix,params)
      this.queryResult = response
    },
    showQuery() {
      console.log("SearchQuery:",this.queryString)
      console.log("Serialised:",this.serialisedQuery)
    },
    async updateQuery2() {
      
      const queryPrefix = "/repositories/My_Info_graph?query="
      const queryString = "PREFIX%20skos%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2004%2F02%2Fskos%2Fcore%23%3E%20SELECT%20%3Fs%20%3Fp%20%3Fo%20%20where%20%7B%20%20%09%3Fs%20%3Fp%20%3Fo%20.%20%20%20%20%20FILTER%20regex(%3Fo%2C%20%22exchange%22%2C%22i%22)%20%7D%20limit%20100%20";
      // const queryString = this.queryString
      const queryURL = queryPrefix + queryString
      
      // const response = await axios.get(queryURL)
      const response = await axios.get(queryPrefix,this.serialisedQuery)
      this.queryResult = response

      this.processTriples(this.queryResult)
      this.showQuery()
      console.log(queryURL,queryString)
    },
    serialiseQuery() {
      const params = new URLSearchParams ();
      params.append("query",this.queryString)
      this.serialisedQuery = params
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("component.css")
</style>
