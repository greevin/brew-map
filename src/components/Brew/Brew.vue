<template>
  <div>
    <b-navbar toggleable="lg" type="light" variant="faded" fixed="top">
      <b-navbar-brand href="#">Breweries List</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    </b-navbar>

    <b-row>
      <b-col cols="3" class="remove-padding">
        <brew-list />
      </b-col>
      <b-col cols="9" class="remove-padding">
        <brew-g-map />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import BrewList from "./BrewList";
import BrewGMap from "./BrewGMap.vue";

export default {
  components: { BrewList, BrewGMap },
  name: "Brew",
  mounted() {
    this.$store.dispatch("getAllBreweries");
  },
};
</script>

<style lang="scss" scoped>
.remove-padding {
  padding-left: 0px;
  padding-right: 0px;
  margin-top: 90px;
}

nav {
  height: 90px;
  -webkit-box-shadow: 0 1px 15px rgba(0, 0, 0, 0.04),
    0 1px 6px rgba(0, 0, 0, 0.04);
  box-shadow: 0 1px 15px rgba(0, 0, 0, 0.04), 0 1px 6px rgba(0, 0, 0, 0.04);
}

.row {
  margin-right: 0;
  margin-left: 0;
}

.top-90 {
  margin-top: 90px;
}
</style>
