<template>
  <div class="Search_Output">
    <searchQuery @queryResult="updateResults($event)"/>
    <searchDisplayResults :searchResults="searchResults"/>
  </div>
</template>

<script>
import searchQuery from "@/components/searchQuery.vue";
import searchDisplayResults from "@/components/searchDisplayResults.vue"

export default {
  components: { 
    searchQuery,
    searchDisplayResults
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
