<template>
  <div class="row" style="margin-left: 0px; margin-right: 0px">
    <brew-list :brews="brews" />
    <div class="col-9 remove-padding">
      <brew-g-map :brews="brews" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import BrewList from "./BrewList.vue";
import BrewGMap from "./BrewGMap.vue";

export default {
  components: { BrewList, BrewGMap },
  name: "Brew",
  data() {
    return {
      brews: [],
    };
  },
  mounted() {
    axios.get("https://api.openbrewerydb.org/breweries").then((res) => {
      this.brews = res.data;
    });
  },
};
</script>

<style lang="scss" scoped>
.remove-padding {
  padding-left: 0px;
  padding-right: 0px;
}
</style>
