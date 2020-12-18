<template>
  <div class="row" style="margin-left: 0px; margin-right: 0px">
    <brew-list />
    <div class="col-9 remove-padding">
      <brew-g-map />
    </div>
  </div>
</template>

<script>
import BrewList from "./BrewList.vue";
import BrewGMap from "./BrewGMap.vue";

export default {
  components: { BrewList, BrewGMap },
  name: "Brew",
};
</script>

<style lang="scss" scoped>
.remove-padding {
  padding-left: 0px;
  padding-right: 0px;
}
</style>
