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
          <button id="clearButton" type="button" v-on:click="setText('')">Clear text area</button>
        </p>
      </div>
    </div>
    <div class="right">
      <h3>Search and key links</h3>
      <searchMain />
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
import searchMain from "./components/searchMain.vue";

export default {
  name: "App",
  components: {
    infoTypeProject,
    infoTypePerson,
    infoTypeOrganzation,
    infoTypeInfoSnippet,
    infoTypesList,
    infoTypeProduct,
    searchMain,
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
      queryString: "PREFIX%20skos%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2004%2F02%2Fskos%2Fcore%23%3E%20SELECT%20%3Fs%20%3Fp%20%3Fo%20%20where%20%7B%20%20%09%3Fs%20%3Fp%20%3Fo%20.%20%20%20%20%20FILTER%20regex(%3Fo%2C%20%22bdr%22%2C%22i%22)%20%7D%20limit%20100%20",

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
