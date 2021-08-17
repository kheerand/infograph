<template>
  <div id="input_area">
    <h3>{{ title }}</h3>
    <table>
      <tr>
        <td>
          <div style="text-align: left">
            <p>
              <button type="button" v-on:click="clearValues">Clear text</button>
            </p>
          </div>
        </td>
        <td />
      </tr>
      <tr class="input_row">
        <td class="input_heading">
          <strong v-if="fields.predicate.autoGenerate">*</strong>
          {{ fields.predicate.label }}
        </td>
        <td class="input_input">
          <input
            type="text"
            v-model.trim="fields.predicate.value"
            @blur="formatInput(-10)"
            accesskey="w"
          />
        </td>
      </tr>
      <tr class="input_row" v-for="subject in fields.subjects" :key="subject">
        <td v-if="subject.display == true" class="input_heading">
          {{ subject.label }}
        </td>
        <td v-if="subject.display == true" class="input_input">
          <strong v-if="subject.autoGenerate">*</strong>
          <span v-if="subject.inputType == 'textarea'">
            <textarea
              rows="4"
              cols="50"
              v-model="subject.value"
              @blur="formatInput(i)"
            />
          </span>
          <span v-else>
            <input
              :type="subject.inputType"
              v-model.trim="subject.value"
              @blur="formatInput(i)"
            />
          </span>
        </td>
      </tr>
    </table>

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
import json from "@/config/infoTypeConcept.json"; // Change it so that this can be specified during app call.
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
    formatInput(index) {
      var date = new Date();
      var field = null;

      if (index == -10) {
        // Its the predicate
        field = this.fields.predicate;
      } else {
        // its not a predicate
        console.log("Not a predicate");
        field = this.fields.subjects[index];
      }
      if (!field.autoGenerate) {
        return;
      } else {
        if (field.value.length == 0) {
          var newValue = field.autoGenTemplate;
          var count = 0;
          const maxLoops = 100;

          while (newValue.search("%") >= 0 && count < maxLoops) {
            var tag = newValue[newValue.search("%") + 1];
            switch (tag) {
              case "Y":
                newValue = newValue.replace(/%Y/, date.getFullYear());
                break;
              case "M":
                newValue = newValue.replace(
                  /%M/,
                  date
                    .getMonth()
                    .toLocaleString("en-US", { minimumIntegerDigits: 2 })
                );
                break;
              case "D":
                newValue = newValue.replace(
                  /%D/,
                  date
                    .getDate()
                    .toLocaleString("en-US", { minimumIntegerDigits: 2 })
                );
                break;
              case "h":
                newValue = newValue.replace(
                  /%h/,
                  date
                    .getHours()
                    .toLocaleString("en-US", { minimumIntegerDigits: 2 })
                );
                break;
              case "m":
                newValue = newValue.replace(
                  /%m/,
                  date
                    .getMinutes()
                    .toLocaleString("en-US", { minimumIntegerDigits: 2 })
                );
                break;
              case "s":
                newValue = newValue.replace(
                  /%s/,
                  date
                    .getSeconds()
                    .toLocaleString("en-US", { minimumIntegerDigits: 2 })
                );
                break;
              case "P":
                newValue = newValue.replace(/%P/, field.predicate.value);
                break;
              // We shouldn't ever get here...
              default:
                newValue = newValue.replace(/%/, "");
                break;
            }
            count++;
          }
          field.value = newValue;
        }
      }
    },
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
      this.$emit("appendText", value);
    },
    clearValues() {
      this.fields.predicate.value = "";
      for (let item in this.fields.subjects) {
        if (this.fields.subjects[item].value.substring(0, 2) != "++") {
          this.fields.subjects[item].value = "";
        }
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="@/components/component.css" />
