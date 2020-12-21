<template>
  <div class="col-3 brew-list remove-padding">
    <h3 class="text-center text-info m-3">Breweries List</h3>

    <div class="form-group" style="padding-left: 15px; padding-right: 15px">
      <label for="exampleFormControlSelect1">State</label>
      <select v-model="selectedState" class="form-control">
        <option value="All" selected>All State</option>
        <option v-for="state in uniqueStates" :value="state" :key="state.id">
          {{ state }}
        </option>
      </select>
    </div>

    <div class="form-group" style="padding-left: 15px; padding-right: 15px">
      <label for="exampleFormControlSelect1">City</label>
      <select
        v-model="selectedCity"
        class="form-control"
        :disabled="selectedState === 'All'"
      >
        <option value="All" selected>All Cities</option>
        <option v-for="city in filteredCities" :value="city" :key="city.id">
          {{ city.city }}
        </option>
      </select>
    </div>

    <hr />
    <ul class="list-group" v-for="brew in brews" :key="brew.id">
      <a
        href="#"
        class="list-group-item list-group-item-action"
        :class="{ active: isActive }"
        @click="clickList(brew.latitude, brew.longitude, brew.id)"
      >
        <div class="container">
          <div class="row">
            <div class="col-10">
              <h5 class="mb-1">{{ brew.name }}</h5>
              <p class="mb-1">{{ brew.city }}, {{ brew.state }}</p>
              <p class="mb-1">{{ brew.street }}</p>
            </div>
            <div
              class="col-2"
              style="padding-left: 0px; padding-right: 0px; text-align: center"
            >
              <img
                src="../assets/security-camera.png"
                alt=""
                height="40px"
                width="40px"
              />
            </div>
          </div>
        </div>
      </a>
    </ul>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  data() {
    return {
      selectedState: "All",
      selectedCity: "All",
    };
  },
  computed: {
    ...mapState(["brews", "isActive"]),
    uniqueStates() {
      const states = this.brews
        .map((item) => item.state)
        .filter((value, index, self) => self.indexOf(value) === index);
      return states;
    },
    filteredCities: function () {
      const city = this.brews.filter(
        (city) => this.selectedState === city.state
      );
      return city;
    },
  },
  mounted() {
    this.$store.dispatch("getAllBreweries");
  },
  methods: {
    ...mapMutations(["onClickList"]),
    clickList(lat, lng) {
      this.onClickList([lat, lng]);
    },
  },
};
</script>

<style lang="scss" scoped>
.brew-list {
  overflow-y: scroll;
  height: 100vh;
}

h5 {
  font-size: 1rem;
}

p {
  font-size: 0.9rem;
}

.remove-padding {
  padding-left: 0px;
  padding-right: 0px;
}

.list-group {
  border-radius: 0 !important;
}

.list-group-item {
  border-width: 0 0 1px !important;
}
</style>