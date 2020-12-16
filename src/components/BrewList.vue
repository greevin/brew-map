<template>
  <div class="col-3 brew-list">
    <h1 class="text-center text-info m-3">Breweries List</h1>
    <ul class="list-group mb-3 ml-2" v-for="brew in brews" :key="brew.id">
      <a href="#" class="list-group-item list-group-item-action">
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
export default {
  name: "BrewList",
  props: ["brews"],
};
</script>

<style lang="scss" scoped>
.brew-list {
  overflow-y: scroll;
  height: 100vh;
}
</style>