<template>
  <div class="col-3 brew-list">
    <h1 class="text-center text-info m-3">Breweries List</h1>
    <ul class="list-group mb-3" v-for="brew in brews" :key="brew.id">
      <a
        href="#"
        class="list-group-item list-group-item-action"
        @click="clickList(brew.latitude, brew.longitude)"
      >
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">{{ brew.name }}</h5>
        </div>
        <p class="mb-1">{{ brew.city }}, {{ brew.state }}</p>
        <p class="mb-1">{{ brew.street }}</p>
      </a>
    </ul>
  </div>
</template>

<script>
// import { bus } from "../main";
import { mapMutations, mapState } from "vuex";

export default {
  computed: {
    ...mapState(["brews"]),
  },
  mounted() {
    this.$store.dispatch("getAllBreweries");
  },
  methods: {
    ...mapMutations(["onClickList"]),
    clickList(lat, lng) {
      // bus.$emit("click-list-brew", [lat, lng]);
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
</style>