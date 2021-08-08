<template>
  <div class="Search_Output">
    <h4>Results</h4>
    <div v-if="validData">
      <table class="table search_results">
        <tr class="results_heading">
          <td v-for="h in headers" :key="h">
            {{ h }}
          </td>
        </tr>
        <tr class="results_values" v-for="triple in triples" :key="triple">
          <td v-for="h in headers" :key="h">
            <div v-if="triple[h].type == 'uri'">
              <a :href="triple[h].value" target="_blank">
                {{ triple[h].prefixedValue }}
              </a>
            </div>
            <div v-else class="truncated_text">
              {{ triple[h].prefixedValue }}
            </div>
          </td>
        </tr>
      </table>
      <iframe name="graphdb_view" width="600" height="300" />
    </div>
    <div v-else>
      <p classs="warning">No results</p>
    </div>
  </div>
</template>

<script>
// import prefixList from "@/components/prefixHandler.js"
import json from "@/config/prefixes.json";

export default {
  name: "searchDisplayResults",
  props: {
    searchResults: null,
  },
  data() {
    return {
      prefixes: json.prefixes,
      resourcePrefix: json.resourcePrefix,
      headers: ["Subject","Predicate","Object"],
      triples: [],
      validData: false,
      fmtTurtle: false,
    };
  },
  mounted() {},
  beforeUpdate() {
    this.triples = [] // Reset the list of triples

    if (this.searchResults.data == "") {
      console.log("DISPLAY search is blank");
      this.validData = false;
    } else if (this.searchResults.data.startsWith("{")) {
      // Its most likey in JSON format so lets confirm it
      if ("data" in this.searchResults == true) {
        console.log("DISPLAY: search results are likely in JSON format");
        this.validData = true;
      } else {
        this.validData = false;
      }
    } else {
      // Most likely in turtle format
      console.log("DISPLAY: search results are likely in turtle format");
      this.validData = true;
      this.fmtTurtle = true;
    }
    
    if (this.fmtTurtle) {
      this.updateTriplesTurtleFmt()
    }
  },
  computed: {
  },
  methods: {
    addPrefixes(item) {
      for (let prefix of this.prefixes) {
        if (item.search(prefix.value > 0)) {
          item = item.replace(prefix.value, prefix.prefix);
        }
      }
      return item;
    },
    addResourcePrefix(triple) {
      // If its a uri, then make the value into a link.
      for (let i in triple) {
        if (triple[i].prefixedValue[0] == ":") {
          const qs = require("querystring");

          var encoded = qs.stringify({ uri: triple[i].value });
          triple[i].value = this.resourcePrefix + encoded;
        }
        return triple;
      }
    },
    updateTriplesTurtleFmt() {
      const qs = require("querystring");

      if (!this.fmtTurtle) {
        console.log("ERR: SearchDisplay: Data is not in Turtle format but ended up in updateTriplesTurtleFmt method!!")
        return "";
      }

      const headers = this.headers;
      var triple = {};

      // Split String into array of triples
      var lines = this.searchResults.data.split("\n");

      for (let line of lines) {
        triple = {}
        line = line.replace(/> /g, ">___,___").split("___,___");

        if (line.length == 4 && line[3] == ".") { line.pop()} // remove the 4th element that is a .
        if (line.length != 3) { continue }

        // Process Subject
        for (let i in line) {
          let processedLine = this.addPrefixes(line[i]);

          if (line[i].startsWith("<") && line[i].endsWith(">")){
            let trimedLine = line[i].slice(1,-1); // Remove the < and > from the start & end of the line. 
            processedLine = processedLine.slice(1,-1); // Remove the < and > from the start & end of the line.

            let encoded = qs.stringify({ uri: trimedLine });

            triple[headers[i]] = { prefixedValue: processedLine,
                                  type: "uri",
                                  value: this.resourcePrefix + encoded
                              }
          }
          else {
            triple[headers[i]] = { prefixedValue: processedLine,
                                type: "literal",
                                value: "" };
          }
        }

        this.triples.push(triple);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="@/components/search.css" />
