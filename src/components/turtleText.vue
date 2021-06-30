<template>
  <div id="turtle_preamble">
    <h4>Turtle snippet</h4>
    <p>
      <em>Copy and paste the turtle snippet below to GraphDB</em>
    </p>
    <hr />
  </div>

  <div id="turtle_prefixes">
    <p>
      <span v-for="prefix in prefixes" :key="prefix"> {{ prefix }}<br /> </span>
    </p>
  </div>
  <span v-if="fields.predicate.value != ''">
    :{{ fields.predicate.value }} a {{ fields.predicate.class }}.<br />
  </span>
  <span v-for="subject in fields.subjects" :key="subject">
    <span v-if="subject.value != ''">
      <span> :{{ fields.predicate.value }} {{ subject.predicate }} </span>
      <span v-if="subject.literal == true"> "{{ subject.value }}".<br /> </span>
      <span v-else>
        <!-- Adjust the value if it is prefixed with ++ to append the predicate value in front -->
        :{{ adjustedValue(fields.predicate.value, subject.value) }}.<br />
      </span>
      <span v-if="subject.predicate == labelPredicate">
        :{{ fields.predicate.value }} rdfs:label "{{ subject.value }}".<br />
      </span>
    </span>
  </span>
</template>

<script>
export default {
  name: "turtleText",
  props: {
    labelPredicate: String,
    prefixes: Object,
    fields: Object,
  },
  mounted: function () {},
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
