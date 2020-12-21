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
            href="http://localhost:8080/sub/office/synoptic/654"
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
import securityCamera from "../assets/security-camera.png";
import { mapGetters, mapState } from "vuex";
// import { bus } from "../main";
export default {
  // created() {
  //   bus.$on("click-list-brew", (data) => {
  //     this.brews[0].latitude = data[0];
  //     this.brews[0].longitude = data[1];
  //     this.infoWindowOpened = false;
  //   });
  // },
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
        url: securityCamera,
        scaledSize: { width: 50, height: 50 },
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