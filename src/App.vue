<template>
  <div class="containter">
    <div class="left">
      <infoTypesList @selection="showInfoBox($event)" />
    </div>
    <!-- TODO: Insert code to create this from config -->
    <div class="middle">
      <div v-if="selectedInfoType == 'personFields'">
        <infoTypePerson @appendText="updateText($event)" />
      </div>
      <div v-if="selectedInfoType == 'projectFields'">
        <infoTypeProject @appendText="updateText($event)" />
      </div>
      <div v-if="selectedInfoType == 'organisationFields'">
        <infoTypeOrganzation @appendText="updateText($event)" />
      </div>
      <div v-if="selectedInfoType == 'infoFields'">
        <infoTypeInfoSnippet @appendText="updateText($event)" />
      </div>
      <div v-if="selectedInfoType == 'productFields'">
        <infoTypeProduct @appendText="updateText($event)" />
      </div>
      <div class="bottom">
        <textarea v-model="turtleText" cols="120" rows="20" />
        <p class="alignLeft">
          <button id="clearButton" type="button" v-on:click="setText('')" accesskey="c">Clear text area</button>
        </p>
      </div>
    </div>
    <div class="right">
      <h3>Search and key links</h3>
    </div>
  </div>
</template>

<script>
import infoTypePerson from "./components/infoTypePerson.vue";
import infoTypeProject from "./components/infoTypeProject.vue";
import infoTypeProduct from "./components/infoTypeProduct.vue";
import infoTypeOrganzation from "./components/infoTypeOrganization.vue";
import infoTypeInfoSnippet from "./components/infoTypeInfoSnippet.vue";
import infoTypesList from "./components/infoTypesList.vue";

export default {
  name: "App",
  components: {
    infoTypeProject,
    infoTypePerson,
    infoTypeOrganzation,
    infoTypeInfoSnippet,
    infoTypesList,
    infoTypeProduct,
  },
  data() {
    return {
      turtleState: false,
      turtleText: "",
      selectedInfoType: "",
      turtleData: {
        prefixes: "",
        tripples: "",
      },
    };
  },
  methods: {
    showInfoBox(selectedType) {
      this.selectedInfoType = selectedType;
    },
    setText(turtleOutput) {
      this.turtleText = turtleOutput;
      console.log(turtleOutput);
    },
    updateText(value) {
      this.turtleText += value + "\n";
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#clearButton {
  background-color: lightcoral;
}
.left {
  float: left;
  width: 10%;
  background-color: lightcyan;
}
.middle {
  float: left;
  background-color: lightgoldenrodyellow;
  width: 45%;
}
.right {
  float: left;
  background-color: thistle;
  width: 45%;
}
.bottom {
  clear: both;
  float: left;
}
.alignLeft {
  text-align: left;
}
</style>
