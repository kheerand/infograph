<template>
  <div class="small_text left_align" id="show_Query">
    <span style="cursor:pointer;" v-on:click="toggleShowQuery">
      <strong>{{ showIcon }}</strong>
      {{ statusText }}
    </span>
  </div>
  <div v-if="showQuery" id="Search_Query">
    <!-- <textarea rows="10" cols="80" v-model="queryString" /> -->
    <pre class="code">{{ queryString }}</pre>
  </div>
</template>

<script>
import axios from "axios";

export default {
  components: {},
  name: "searchQuery",
  props: {
    query: String,
  },
  data() {
    return {
      queryString: "",
      queryResult: "",
      showQuery: false,
      statusText: "Show Query",
    };
  },
  beforeUpdate() {
    console.log("QUERY STRING:::", this.query);
    this.queryString = this.query;
    this.runQuery();
  },
  computed: {
    showIcon() {
      if (this.showQuery) {
        return "[-]";
      } else {
        return "[+]";
      }
    },
  },
  methods: {
    toggleShowQuery() {
      this.showQuery = !this.showQuery;
      if (this.showQuery) {
        this.statusText = "Hide Query";
      } else {
        this.statusText = "Show Query";
      }
    },
    runQuery() {
      console.log("Search Query: ", this.queryString);

      this.updateQuery();
    },
    async updateQuery() {
      const queryPrefix = "/repositories/My_Info_graph?";
      const qs = require("querystring");

      var encodedString = qs.stringify({ query: this.queryString });
      var queryURL = queryPrefix + encodedString;

      const response = await axios.get(queryURL);
      this.queryResult = response;

      this.$emit("queryResult", this.queryResult);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="@/components/component.css" />
