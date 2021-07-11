<template>
  <div class="Search_Output">
    <h3>Search area</h3>
    <p>insert search box here</p>
    <searchQuery @queryResult="updateResults($event)"/>
    <h3>Search results</h3>
    <!-- <searchGetResults :queryString="queryString"/> -->
    <searchDisplayResults :searchResults="searchResults"/>
  </div>
</template>

<script>
// import searchGetResults from "@/components/searchGetResults.vue";
import searchQuery from "@/components/searchQuery.vue";
import searchDisplayResults from "@/components/searchDisplayResults.vue"

export default {
  components: { 
    // searchGetResults,
    searchQuery,
    searchDisplayResults
  },
  name: 'searchMain',
  props: {
    // msg: String,
    // queryStr: String,
  },
  data() {
    return {
      searchResults: {
        "data": {
          "head": {
            "vars": ["a","b"]
          },
          "results": {
            "bindings": [
              {
                "a": {
                  "value": "A is here"
                },
                "b": {
                  "value": "B is there"
                }
              },
            ]
          }
        }
      }
    }
  },
  async mounted() {
  },
  methods: {
    updateResults(results) {
      this.searchResults = results;
      console.log("searchMain:",this.searchResults)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("component.css")
</style>
