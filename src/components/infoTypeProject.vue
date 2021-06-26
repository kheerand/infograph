<template>
  <div id="input_area">
    <h3>{{title}}</h3>
    <table>
      <tr class="input_row">
        <td class="input_heading">
          {{ fields.predicate.label }}
        </td>
        <td class="input_input">
          <input type="text" v-model="fields.predicate.value" />
        </td>
      </tr>
      <tr class="input_row" v-for="subject in fields.subjects" :key="subject">
        <td class="input_heading">
          {{ subject.label }}
        </td>
        <td class="input_input">
          <span v-if="subject.type == 'textarea'">
            <textarea rows=4 cols=50 v-model="subject.value" />
          </span>
          <span v-else>
            <input :type="subject.type" v-model="subject.value" />
          </span>
        </td>
      </tr>
    </table>

    <div id="turtle_snippet">
      <div id="turtle_preamble">
        <h4>Turtle snippet</h4>
        <p>
          <em>Copy and paste the turtle snippet below to GraphDB</em>
        </p>
        <hr />
      </div>

      <div id="turtle_prefixes">
        <p>
          <span v-for="prefix in prefixes" :key="prefix">
            {{ prefix }}<br />
          </span>
        </p>
      </div>

      <div id="turtle_tripples">
        <span v-if="fields.predicate.value != ''">
          :{{ fields.predicate.value }} a {{ fields.predicate.class }}.<br />
        </span>
        <span v-for="subject in fields.subjects" :key="subject">
          <span v-if="subject.value != ''">
            <span> :{{ fields.predicate.value }} {{ subject.predicate }} </span>
            <span v-if="subject.literal == true">
              "{{ subject.value }}".<br />
            </span>
            <span v-else>
              :{{ subject.value }}.<br />
            </span>
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import json from '@/config/infoTypeProject.json'; // Change it so that this can be specified during app call.

export default {
  name: "turtleItem",
  props: {},
  data() {
    return {
      title: json.title,
      prefixes: json.prefixes,
      fields: json.fields
    }
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
  background: beige;
}
.input_heading {
  text-align: right;
}
.input_input {
  text-align: left;
}
</style>
