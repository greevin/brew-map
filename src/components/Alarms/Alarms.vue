<template>
  <div>
    <b-navbar toggleable="lg" type="light" variant="faded" fixed="top">
      <b-navbar-brand href="#">Alarms List</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    </b-navbar>

    <b-row style="height: 100vh">
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
import AlarmsList from './AlarmsList';
import AlarmsMap from './AlarmsMap';

export default {
  components: { AlarmsList, AlarmsMap },
  mounted() {
    this.$store.dispatch("getAllAlarms");
  }
};
</script>

<style lang="scss" scoped>
nav {
  -webkit-box-shadow: 0 1px 15px rgba(0, 0, 0, 0.04),
    0 1px 6px rgba(0, 0, 0, 0.04);
  box-shadow: 0 1px 15px rgba(0, 0, 0, 0.04), 0 1px 6px rgba(0, 0, 0, 0.04);
  height: 100px;
}

.remove-padding {
  padding-left: 0px;
  padding-right: 0px;
  margin-top: 100px;
}

@media (max-width: 1439px) {
  nav {
    height: 90px;
  }
  .top-90 {
    margin-top: 90px;
  }
  .remove-padding {
    margin-top: 90px;
  }
}

@media (max-width: 1199px) {
  nav {
    height: 70px;
  }
  .top-90 {
    margin-top: 70px;
  }
  .remove-padding {
    margin-top: 70px;
  }
}

.row {
  margin-right: 0;
  margin-left: 0;
}

/* .top-90 {
  margin-top: 90px;
} */
</style>
