<template>
  <div>
    <b-navbar toggleable="lg" type="light" variant="faded" fixed="top">
      <b-navbar-brand href="#">Alarms List</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    </b-navbar>

    <b-row>
      <b-col cols="3" class="remove-padding">
        <alarms-list />
      </b-col>
      <b-col cols="9" class="remove-padding">
        <alarms-map />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import AlarmsList from "./AlarmsList";
import AlarmsMap from "./AlarmsMap";

export default {
  components: { AlarmsList, AlarmsMap },
  mounted() {
    this.$store.dispatch("getAllAlarms");
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
