<template>
  <div class="brew-list">
    <div class="form-group" style="padding-left: 15px; padding-right: 15px">
      <label>State</label>
      <select v-model="selectedState" class="form-control">
        <option value="All" selected>All State</option>
        <option v-for="state in uniqueStates" :value="state" :key="state.id">
          {{ state }}
        </option>
      </select>
    </div>

    <div class="form-group" style="padding-left: 15px; padding-right: 15px">
      <label>City</label>
      <select
        v-model="selectedCity"
        class="form-control"
        :disabled="selectedState === 'All'"
      >
        <option value="All" selected>All Cities</option>
        <option
          v-for="city in filteredCities"
          :value="city.city"
          :key="city.id"
        >
          {{ city.city }}
        </option>
      </select>
    </div>

    <div class="form-group" style="padding-left: 15px; padding-right: 15px">
      <label>Brewery Type</label>
      <select v-model="breweryType" class="form-control">
        <option value="All" selected>All Types</option>
        <option
          v-for="breweryType in uniqueTypes"
          :value="breweryType.id"
          :key="breweryType.id"
        >
          {{ breweryType }}
        </option>
      </select>
    </div>

    <hr />
    <b-list-group>
      <b-list-group-item
        href="#"
        class="flex-column align-items-start"
        v-for="brew in filteredList"
        :key="brew.id"
        :class="{
          'priority-normal': brew.brewery_type === 'contract',
          'priority-low': brew.brewery_type === 'micro',
          'priority-medium': brew.brewery_type === 'brewpub',
          'priority-critical': brew.brewery_type === 'regional',
          'priority-high': brew.brewery_type === 'planning',
        }"
        @click="clickList(brew.latitude, brew.longitude, brew.id)"
      >
        <b-row>
          <b-col cols="10" class="remove-padding">
            <h5 class="mb-1">
              <b>{{ brew.name }}</b>
            </h5>
            <p class="mb-1">{{ brew.city }}, {{ brew.state }}</p>
            <p class="mb-1">{{ brew.street }}</p>
          </b-col>
          <b-col cols="2" class="remove-padding" style="text-align: center">
            <b-icon icon="bell-fill" style="width: 35px; height: 35px"></b-icon>
          </b-col>
        </b-row>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  data() {
    return {
      selectedState: "All",
      selectedCity: "All",
      breweryType: "All",
    };
  },
  computed: {
    ...mapState(["brews"]),
    uniqueStates() {
      const states = this.brews
        .map((item) => item.state)
        .filter((value, index, self) => self.indexOf(value) === index);

      return states;
    },
    uniqueTypes() {
      const types = this.brews
        .map((item) => item.brewery_type)
        .filter((value, index, self) => self.indexOf(value) === index);

      return types;
    },
    filteredCities: function () {
      const city = this.brews.filter(
        (brew) => this.selectedState === brew.state
      );

      const list = this.brews;
      list.sort((a, b) => (a.brewery_type > b.brewery_type ? 1 : -1));

      if (this.selectedState === "All") {
        return this.brews;
      } else {
        return city;
      }
    },
    filteredList: function () {
      const city = this.brews.filter((brew) => this.selectedCity === brew.city);

      if (this.selectedCity === "All") {
        return this.filteredCities;
      } else {
        return city;
      }
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
  height: 90vh;
}

h5 {
  font-size: 1rem;
}

p {
  font-size: 0.9rem;
}

.list-group {
  border-radius: 0 !important;
}

.list-group-item {
  border-width: 0 0 1px !important;
}

.priority-normal {
  background: #e6e6e6;
  color: #000000;
  border: 2px solid #000000 !important;
}

.priority-medium {
  background: #ffff00;
  color: #330000;
  border: 2px solid #330000 !important;
}

.priority-high {
  background: #ff0000;
  color: #ffffff;
  border: 2px solid #ffffff !important;
}

.priority-low {
  background: #b8b8b8;
  color: #000000;
  border: 2px solid #000000 !important;
}

.priority-critical {
  background: #000000;
  color: #ff0000;
  border: 2px solid #ff0000 !important;
}
</style>