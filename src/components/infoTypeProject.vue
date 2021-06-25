<template>
  <div id='input_area'>
    <h3>Project</h3>
    <p>
      <table id='input_table'>
        <tr class='input_row'>
          <td class='input_heading'>
            Project ID
          </td>
          <td class='input_input'>
            <input type="text" v-model="nameID" />
          </td>
        </tr>
        <tr class='input_row'>
          <td class='input_heading'>
            Project name
          </td>
          <td class='input_input'>
            <input type="text" v-model="name" />
          </td>
        </tr>
        <tr class='input_row'>
          <td class='input_heading'>
            Description
          </td>
          <td class='input_input'>
            <textarea rows=4 cols=50 v-model="description" />
          </td>
        </tr>
        <tr class='input_row'>
          <td class='input_heading'>
            Funder ID
          </td>
          <td class='input_input'>
            <input type="text" v-model="funderID" />
          </td>
        </tr>
        <tr class='input_row'>
          <td class='input_heading'>
            Parent organisation ID
          </td>
          <td class='input_input'>
            <input type="text" v-model="parentOrganizationID" />
          </td>
        </tr>
      </table>
    </p>
  </div>
  <div id="turtle_snippet">
    <div id='turtle_preamble'>
      <h4>Turtle snippet</h4>
      <p>
        <em>Copy and paste the turtle snippet below to GraphDB</em>
      </p>
      <hr>
    </div>
    <div id="turtle_prefixes">
      <p>
        <span v-for="prefix in prefixes" :key="prefix">
            {{prefix}}<br>
        </span>
      </p>
    </div>

    
    <div id="turtle_tripples">
      <span v-if="nameID != ''">
        :{{nameID}} a schema:Project.<br>
      </span>
      <span v-if="name != ''">
        :{{nameID}} schema:name "{{name}}".<br>
        :{{nameID}} rdfs:label "{{name}}".<br>
      </span>
      <span v-if="description != ''">
        :{{nameID}} schema:description "{{description}}".<br>
      </span>
      <span v-if="funderID != ''">
        :{{nameID}} schema:funder :{{funderID}}.<br>
      </span>
      <span v-if="parentOrganizationID != ''">
        :{{nameID}} schema:parentOrganization :{{parentOrganizationID}}.<br>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "turtleItem",
  props: {},
  data() {
    return {
      prefixes: [
        "@PREFIX : <http://my_info_graph/>", // try and load this from a config file in the future.
        "@PREFIX schema: <https://schema.org>",
        "@PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>",
      ],
      nameID: "",
      name: "",
      description: "",
      funderID: "",
      parentOrganizationID: "",
      subject: "",
      predicate: "",
      object: "",
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
#turtle_snippet {
  text-align: left;
  background: aliceblue;
}
#turtle_preamble {
  background:beige;
}
.input_heading {
  text-align: right;
}
.input_input {
  text-align: left;
}
</style>
