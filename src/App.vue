<template>
  <div class="containter">
  <div class="left">
    <infoTypesList @selection="showInfoBox($event)" />
  </div>
  <!-- TODO: Insert code to create this from config -->
  <div class="right">
    <div v-if="selectedInfoType == 'personFields'">
      <infoTypePerson @turtleOutput="updateTurtleText($event)" />
    </div>
    <div v-if="selectedInfoType == 'projectFields'">
      <infoTypeProject />
    </div>
    <div v-if="selectedInfoType == 'organisationFields'">
      <infoTypeOrganzation />
    </div>
    <div v-if="selectedInfoType == 'infoFields'">
      <infoTypeInfoSnippet />
    </div>
  </div>
  </div>
</template>

<script>
import infoTypePerson from "./components/infoTypePerson.vue";
import infoTypeProject from "./components/infoTypeProject.vue";
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
  },
  data() {
    return {
      turtleState: false,
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
    updateTurtleText(turtleOutput) {
      this.turtleData = turtleOutput;
      console.log(turtleOutput);
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
.left{
  float:left;
  width:20%;
  background-color: lightcyan;
}
.right {
  float:right;
  width:80%;
}
</style>
