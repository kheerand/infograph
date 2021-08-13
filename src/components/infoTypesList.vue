<template>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">

  <div class="col-lg-1" />
  <div class="col-lg-11">
   <ul class="nav nav-pills" id="infoTypeSelection">
          <li v-for="item in infoTypes" :key="item.name">
            <a data-toggle="pill" href="#" @click="onChange($event)" :id="item.app" :accesskey="item.keyboardKey">
              {{ item.name }}
            </a>
          </li>
  </ul>
  </div>
</template>

<script>
import json from '@/config/infoTypes.json';

export default {
  name: 'infoTypesList',
  props: {
  },
  data() {
    return {
      infoTypes: json.infoTypes,
    };
  },
  methods: {
    onChange(event) {
      var infoTypeSelected = event.target.id;
      this.$emit('selection',infoTypeSelected)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="@/components/component.css" />
