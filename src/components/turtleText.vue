<template>
  <span>
      <span style="cursor:pointer" v-on:click="toggleText"><strong>{{ showIcon }}</strong></span>
      <button class="button_slim" type="button" v-on:click="updateEvent" accesskey="a"> Update text </button>
  </span>

  <div v-if="showTurtleText">
  <div id="turtle_prefixes">
    <p>
      <span v-for="prefix in prefixes" :key="prefix"> {{ prefix }}<br /> </span>
    </p>
  </div>
  <span v-if="fields.predicate.value != ''">
    :{{ fields.predicate.value }} a {{ fields.predicate.class }}.<br />
    <span v-for="subject in fields.subjects" :key="subject">
      <span v-if="subject.value != ''">
        <span> :{{ fields.predicate.value }} {{ subject.predicate }} </span>
        <span style="white-space: pre-wrap;" v-if="subject.literal == true" >
          "{{ subject.value }}".<br />
        </span>
        <span v-else>
          <!-- Adjust the value if it is prefixed with ++ to append the predicate value in front -->
          :{{ adjustedValue(fields.predicate.value, subject.value) }}.<br />
        </span>
        <span v-if="subject.predicate == labelPredicate">
          :{{ fields.predicate.value }} rdfs:label "{{ subject.value }}".<br />
        </span>
        <span v-if="subject.isClass == true">
          :{{ adjustedValue(fields.predicate.value, subject.value) }} a
          {{ subject.classType }}. <br />
          :{{ adjustedValue(fields.predicate.value, subject.value) }} rdfs:label {{ subject.label }}. <br/>
        </span>
      </span>
    </span>
  </span>
  </div>
</template>

<script>
export default {
  name: "turtleText",
  props: {
    labelPredicate: String,
    prefixes: Object,
    fields: Object,
  },
  data () { 
    return {
      showTurtleText: false,
    };
  },
  computed: {
    showIcon() {
      if (this.showTurtleText) {
        return ("[-]")
      }
      else {
        return("[+]")
      }
    }
  },
  mounted: function () {},
  methods: {
    toggleText() {
      this.showTurtleText = !this.showTurtleText;
    },
    adjustedValue(predicate, val) {
      var computedVal = String;

      if (val.substring(0, 2) == "++") {
        computedVal = predicate + "_" + val.substring(2);
      } 
      else {
        if (val.startsWith('[') && val.endsWith(']')) {
          // Its a list of items
          let value = val.slice(1,val.length-1);
          // strip any spaces after the , in the string
          value = value.replace(/ +/g,"");
          value = value.replace(/,/g,", :");
          computedVal = value;
        }
        else {
          computedVal = val;
        }
      }
      return computedVal;
    },
    updateEvent() {
      var textString = "";
      var fields = this.fields;
      var prefixes = this.prefixes;

      // Add the prefixes
      for (let prefix of prefixes) {
        textString += prefix + "\n";
      }
      textString += "\n";

      textString += ":" + fields.predicate.value +
                    " a " + fields.predicate.class + ". \n"
      // Add the fields
      for (let subject of fields.subjects) {
        if (subject.value != "") {
          textString += ":" + fields.predicate.value +
                        " " + subject.predicate;
          
          if (subject.literal == true) {
            if (subject.value.includes("\n")) {
              textString += " \"\"\"" + subject.value + "\"\"\".\n";
            }
            else {
              textString += " \"" + subject.value + "\".\n";
            }
          }
          else {
            if (subject.value.startsWith('[') && subject.value.endsWith(']')) {
              // Its a list of items
              let value = subject.value.slice(1,subject.value.length-1);
              // strip any spaces after the , in the string
              value = value.replace(/ +/g,"");
              value = " :" + value.replace(/,/g,", :") + ".\n";
              textString += value;

            } else {
              textString += " :" + this.adjustedValue(fields.predicate.value, 
                                                subject.value) + ".\n";
            }
          }

          if (subject.predicate == this.labelPredicate) {
            textString += ":" + fields.predicate.value +
                          " rdfs:label \"" + subject.value + "\".\n";
          }

          if (subject.isClass == true) {
            textString += ":" + this.adjustedValue(fields.predicate.value, 
                                              subject.value) +
                            " a " + subject.classType + ".\n";
            textString += ":" + this.adjustedValue(fields.predicate.value, 
                                              subject.value) + 
                            " rdfs:label \"" + subject.label + "\".\n";
          }
        }
                      



      }

      this.$emit('appendText',textString)
  },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("component.css")
</style>
