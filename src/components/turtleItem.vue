<template>
  <div>
    <h3>Insert data below</h3>
    <p>
      <span>Subject: <input type="text" v-model="subject" /></span>
      <span>Predicate: <input type="text" v-model="predicate" /></span>
      <span>Object: <input type="text" v-model="object" /></span>
    </p>
  </div>
  <div class="turtle snippet">
    <h4>Turtle snippet</h4>
    <p>
      Copy and paste the turtle snippet below to GraphDB
    </p>
    <p>
      <span> :{{subject}} :{{predicate}} :{{object}}</span>
    </p>
  </div>
</template>

<script>
export default {
  name: 'turtleItem',
  props: {
  },
  data(){
    return{
      subject: "",
      predicate: "",
      object: ""};
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("component.css")
</style>
