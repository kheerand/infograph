<template>
  <div class="Search_Output">
    <searchCannedSearches @queryString="updateQuery($event)"/>
    <searchQuery :queryString="query" @queryResult="updateResults($event)"/>
    <searchDisplayResults :searchResults="searchResults"/>
  </div>
</template>

<script>
import searchCannedSearches from "@/components/searchCannedSearches.vue";
import searchQuery from "@/components/searchQuery.vue";
import searchDisplayResults from "@/components/searchDisplayResults.vue"

export default {
  components: { 
    searchQuery,
    searchDisplayResults,
    searchCannedSearches
  },
  name: 'searchMain',
  props: {
  },
  data() {
    return {
      // See if I can have this without needing to pre-specify format.
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
      },
      query: ""
    }
  },
  async mounted() {
  },
  methods: {
    updateResults(results) {
      this.searchResults = results;
      console.log("searchMain:",this.searchResults)
    },
    updateQuery(query) {
      this.query = query;
      console.log("Search Query: ",this.query)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="@/components/search.css" />
