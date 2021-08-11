<template>
  <div class="containter">
    <div class="row">
      <div class="col-lg-2 left">
        <infoTypesList @selection="showInfoBox($event)" />
      </div>
      <!-- TODO: Insert code to create this from config -->
      <div class="col-lg-6 middle">
        <div class="row">
          <div v-if="selectedInfoType == 'personFields'">
            <infoTypePerson @appendText="updateText($event)" />
          </div>
          <div v-if="selectedInfoType == 'projectFields'">
            <infoTypeProject @appendText="updateText($event)" />
          </div>
          <div v-if="selectedInfoType == 'organisationFields'">
            <infoTypeOrganzation @appendText="updateText($event)" />
          </div>
          <div v-if="selectedInfoType == 'committeeFields'">
            <infoTypeCommittee @appendText="updateText($event)" />
          </div>
          <div v-if="selectedInfoType == 'infoFields'">
            <infoTypeInfoSnippet @appendText="updateText($event)" />
          </div>
          <div v-if="selectedInfoType == 'productFields'">
            <infoTypeProduct @appendText="updateText($event)" />
          </div>
          <div v-if="selectedInfoType == 'conceptFields'">
            <infoTypeConcept @appendText="updateText($event)" />
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6 bottom">
              <textarea v-model="turtleText" id="output_text" class="form-control_disabled" cols="70" rows="10" />
            <p class="alignLeft">
              <button
                id="clearButton"
                type="button"
                v-on:click="setText('')"
                accesskey="c"
              >
                Clear text area
              </button>
            </p>
          </div>
        </div>
      </div>
      <div class="col-lg-4 right">
        <h3>Search and key links</h3>
        <searchMain />
      </div>
    </div>
  </div>
</template>

<script>
import infoTypePerson from "./components/infoTypePerson.vue";
import infoTypeProject from "./components/infoTypeProject.vue";
import infoTypeProduct from "./components/infoTypeProduct.vue";
import infoTypeOrganzation from "./components/infoTypeOrganization.vue";
import infoTypeCommittee from "./components/infoTypeCommittee.vue";
import infoTypeInfoSnippet from "./components/infoTypeInfoSnippet.vue";
import infoTypeConcept from "./components/infoTypeConcept.vue";
import infoTypesList from "./components/infoTypesList.vue";
import searchMain from "./components/searchMain.vue";

export default {
  name: "App",
  components: {
    infoTypeProject,
    infoTypePerson,
    infoTypeOrganzation,
    infoTypeCommittee,
    infoTypeInfoSnippet,
    infoTypesList,
    infoTypeProduct,
    infoTypeConcept,
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
      queryString:
        "PREFIX%20skos%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2004%2F02%2Fskos%2Fcore%23%3E%20SELECT%20%3Fs%20%3Fp%20%3Fo%20%20where%20%7B%20%20%09%3Fs%20%3Fp%20%3Fo%20.%20%20%20%20%20FILTER%20regex(%3Fo%2C%20%22bdr%22%2C%22i%22)%20%7D%20limit%20100%20",
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

      var textarea = document.getElementById('output_text');
      textarea.scrollTop = textarea.scrollHeight;
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
  /* float: left; */
  /* width: 10vw; */
  background-color: lightcyan;
}
.middle {
  /* float: left; */
  background-color: lightgoldenrodyellow;
  /* width: 45vw; */
}
.right {
  /* float: left; */
  background-color: thistle;
  /* width: 45vw; */
}
.bottom {
  /* clear: both; */
  /* float: left; */
}
.alignLeft {
  text-align: left;
}
</style>
