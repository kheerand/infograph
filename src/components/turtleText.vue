<template>
  <div class="turtle_output">
    <div class="instructions">
      <h4>Turtle snippet</h4>
      <p>Copy and paste the turtle snippet below to GraphDB</p>
    </div>
    <hr>
    <div class="turtle_code">
      <p>
        @PREFIX : &lt;"prefix"&gt;<br />
        @PREFIX schema: &lt;https://schema.org/&gt;<br />
      </p>
      <p>
        <span> :{{ subject }} :{{ predicate }} :{{ object }}</span>
      </p>
    </div>
    <hr>
    <div>
      <p>
        @{{prefixes}}
      </p>
      <p>
        :{{tripples}}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "turtleItem",
  props: {
    prefixes: String,
    tripples: String
  },
  data() {
    return {
      subject: "",
      predicate: "",
      object: "",
    };
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
.turtle_code {
  text-align: left;
}
</style>
