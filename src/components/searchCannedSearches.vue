<template>
  <div class="hello">
    <h1>Canned Searches</h1>
    <table id="cannedSearches">
      <tr>
        <td id="searchOptions">
          <select v-model="choice">
            <option disabled value="">Select search</option>
            <option v-for="(search, index) in searches" 
              :key="search" 
              :index="index" 
              :value="index"
            >
              {{ search.name }}
            </option>
          </select>
        </td>
        <td id="searchQuery">
          <table>
            <tr>
              <td>
                {{searches[choice].description}}
              </td>
            </tr>
            <tr v-for="term in searches[choice].terms" :key="term">
              <td>
                {{ term.name }}
              </td>
              <td>
                <input type="text" v-model="term.value" />
              </td>
            </tr>
            <!-- <tr style="white-space: pre-wrap;text-align: left">
              {{computedQuery}}
            </tr> -->
          </table>
        </td>
      </tr>
    </table>
    <p>
      <button type="button" v-on:click="runQuery">Search</button>
    </p>
  </div>
</template>

<script>
import json from "@/config/searchQueries.json"; // Change it so that this can be specified during app call.

export default {
  name: 'searchCannedSearches',
  props: {
  },
  data() {
    return {
      choice: 0,
      searches: json.searches
    }
  },
  computed: {
    computedQuery: function() {
      var search = this.searches[this.choice]
      var queryString = search.query.join("\n")

      // queryString = queryString.replace("term","BLAH")
      for (let term of search.terms) {
        queryString = queryString.replaceAll("??"+term.term,
          term.value);

      }
      

      return queryString
    }
  },
  methods: {
    runQuery() {
      this.$emit('queryString',this.computedQuery)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="@/components/search.css" />