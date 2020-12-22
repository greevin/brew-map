<template>
  <div style="height: 100%; width: 100%">
    <!-- mapa -->
    <GmapMap :center="mapCenter" :zoom="17" style="width: 100%; height: 100%">
      <!-- popup -->
      <GmapInfoWindow
        :options="infoWindowOptions"
        :position="infoWindowPosition"
        :opened="infoWindowOpened"
        @closeclick="handleInfoWindowClose"
      >
        <div class="info-window">
          <h6 class="mb-1">{{ activeBrew.name }}</h6>
          <p class="mb-1">{{ activeBrew.city }}, {{ activeBrew.state }}</p>
          <a
            :href="'http://localhost:8080/sub/office/synoptic/' + activeBrew.id"
            target="_blank"
            >More info</a
          >
          <!-- <router-link to="/info">More info</router-link> -->
        </div>
      </GmapInfoWindow>
      <!-- marker -->
      <GmapMarker
        :clickable="true"
        :draggable="false"
        v-for="brew in brews"
        :key="brew.id"
        :position="getPosition(brew)"
        :icon="markerOptions"
        @click="handleMarkerClicked(brew)"
      />
    </GmapMap>
  </div>
</template>

<script>
// import securityCamera from "../assets/security-camera.png";
import { mapGetters, mapState } from "vuex";
const icon =
  '<svg viewBox="0 0 16 16" width="1em" height="1em" focusable="false" role="img" aria-label="exclamation triangle fill" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi-exclamation-triangle-fill b-icon bi"><g><path fill-rule="evenodd" d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 5zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path></g></svg>';

export default {
  data() {
    return {
      infoWindowOptions: {
        pixelOffset: {
          width: 0,
          height: -55,
        },
      },
      activeBrew: {},
      infoWindowOpened: false,
      markerOptions: {
        url: "data:image/svg+xml;charset=UTF-8;base64," + btoa(icon),
        scaledSize: { width: 40, height: 40 },
      },
    };
  },
  methods: {
    getPosition(brew) {
      return {
        lat: parseFloat(brew.latitude),
        lng: parseFloat(brew.longitude),
      };
    },
    handleMarkerClicked(brew) {
      this.activeBrew = brew;
      this.infoWindowOpened = true;
    },
    handleInfoWindowClose() {
      this.activeBrew = {};
      this.infoWindowOpened = false;
    },
  },
  computed: {
    ...mapState(["brews", "lat", "lng"]),
    ...mapGetters(["mapCenter", "updateMaps"]),
    infoWindowPosition() {
      return {
        lat: parseFloat(this.activeBrew.latitude),
        lng: parseFloat(this.activeBrew.longitude),
      };
    },
  },
  mounted() {
    this.$store.dispatch("getAllBreweries");
  },
};
</script>

<style lang="scss" scoped>
</style>