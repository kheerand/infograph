<template>
  <div>
    <infoTypesList @selection="showInfoBox($event)"/>
  </div>
  <div v-if="selectedInfoType == 'personFields'">
    <h3>Person Type</h3>
    <infoTypePerson  @turtleOutput='updateTurtleText($event)'/>
  </div>
  <div v-if="selectedInfoType == 'projectFields'">
    <infoTypeProject />
  </div>
  
</template>

<script>
import infoTypePerson from "./components/infoTypePerson.vue";
import infoTypeProject from "./components/infoTypeProject.vue";
import infoTypesList from "./components/infoTypesList.vue";

export default {
  name: "App",
  components: {
    infoTypeProject,
    infoTypePerson,
    infoTypesList
  },
  data() {
    return{
      turtleState: false,
      selectedInfoType: '',
      turtleData: {
        prefixes: '',
        tripples: ''
      }
    }
  },
  methods: {
    showInfoBox(selectedType) {
      this.selectedInfoType = selectedType;
    },
    updateTurtleText(turtleOutput) {
      this.turtleData = turtleOutput;
      console.log(turtleOutput)
    }
  }
  
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
</style>
