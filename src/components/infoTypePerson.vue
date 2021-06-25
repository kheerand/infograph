<template>
  <div>
    <p>
      <span>Subject: <input type="text" @change="onChange($event)" v-model="subject" /></span>
      <span>Predicate: <input type="text" @change="onChange($event)" v-model="predicate" /></span>
      <span>Object: <input type="text" @change="onChange($event)" v-model="object" /></span>
    </p>
  </div>
</template>

<script>
export default {
  name: "turtleItem",
  props: {},
  data() {
    return {
      fields: {
        name: {
          subject: " ",
          predicate: " ",
          object: ""
        }
      },
      subject: "",
      predicate: "",
      object: "",
    };
  },
  methods: {
    onChange() {
      // var infoTypeSelected = event.target.value;
      // this.$emit('selection',infoTypeSelected)
      var output = {
        prefixes: "",
        tripple: {
          subject:  this.subject,
          predicate: this.predicate,
          object: this.object
        }
      }
        this.$emit('turtleOutput',output)
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
h4 {
  margin: 20px 0 0;
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
.turtle_code {
  text-align: left;
}
</style>
