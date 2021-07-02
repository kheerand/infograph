<template>
  <div id="input_area">
    <h3>{{ title }}</h3>
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
        <td v-if="subject.display == true" class="input_heading">
          {{ subject.label }}
        </td>
        <td v-if="subject.display == true" class="input_input">
          <span v-if="subject.inputType == 'textarea'">
            <textarea rows="4" cols="50" v-model="subject.value" />
          </span>
          <span v-else>
            <input :type="subject.inputType" v-model="subject.value" />
          </span>
        </td>
      </tr>
    </table>
    <div style="text-align:left;">
          <p><button type="button" v-on:click="clearValues"> Clear text </button></p>
    </div>

    <div id="turtle_text">
      <turtleText
        :labelPredicate="labelPredicate"
        :prefixes="prefixes"
        :fields="fields"
        @appendText="appendText($event)"
      />
    </div>
  </div>
</template>

<script>
import json from "@/config/infoTypePerson.json"; // Change it so that this can be specified during app call.
import turtleText from "@/components/turtleText.vue";

export default {
  name: "turtleItem",
  components: {
    turtleText,
  },
  props: {},
  data() {
    return {
      title: json.title,
      labelPredicate: json.labelPredicate,
      prefixes: json.prefixes,
      fields: json.fields,
    };
  },
  methods: {
    adjustedValue(predicate, val) {
      var computedVal = String;

      if (val.substring(0, 2) == "++") {
        computedVal = predicate + "_" + val.substring(2);
      } else {
        computedVal = val;
      }
      return computedVal;
    },
    appendText(value) {
      this.$emit('appendText',value)
    },
    clearValues() {
      this.fields.predicate.value = "";
      for (let item in this.fields.subjects) {
        if (this.fields.subjects[item].value.substring(0,2) != "++") {
            this.fields.subjects[item].value = "";
        }
      }
    },
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
#turtle_text {
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
