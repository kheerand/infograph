<template>
    <div class="row">
      <span class="sub_title">
      Canned Searches
      </span>
    </div>
      <div class="row">
        <div class="col-lg-4" id="searchOptions">
          <select v-model="choice" accesskey="s">
            <!-- <option disabled value="">Select search</option> -->
            <option v-for="(search, index) in searches" 
              :key="search" 
              :index="index" 
              :value="index"
            >
              {{ search.name }}
            </option>
          </select>
        </div>
        <div class="col-lg-8 left_align" id="searchQuery">
            <div class="row">
                {{searches[choice].description}}
            </div>
            <div class="row" v-for="term in searches[choice].terms" :key="term">
              <div class="col-lg-4">
                {{ term.name }}
              </div>
              <div class="col-lg-8">
                <input type="text" v-model="term.value" v-on:keyup.enter="runQuery" />
              </div>
            </div>
        </div>
        </div>
    <p>
      <button type="button" v-on:click="runQuery">Search</button>
    </p>
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
  mounted () {
  },
  computed: {
    computedQuery: function() {
      var search = this.searches[this.choice]
      var queryString = search.query.join("\n")

      console.log(search)
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