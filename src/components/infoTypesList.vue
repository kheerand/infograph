<template>
  <div>
    <h3>Info type list</h3>
    <p>
      Select information type from the list below.
    </p>
  </div>
  <table style="width:100%">
    <colgroup>
      <col style="width:10%;">
      <col style="width:90%;">
      <col style="width:00%;">
    </colgroup>
    <tr>
      <td></td>
      <td>
        <div id="infoTypeSelection">
          <span v-for="item in infoTypes" :key="item.name">
            <input type="radio" @change="onChange($event)" :id="item.name" name="infoType" :value="item.app">
            <label>{{item.name}}</label><br>
          </span>
        </div>

      </td>
      <td></td>
    </tr>
  </table>
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
      var infoTypeSelected = event.target.value;
      this.$emit('selection',infoTypeSelected)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("component.css")
</style>
