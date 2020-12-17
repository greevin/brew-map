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
          <router-link to="/info">More info</router-link>
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
import { bus } from "../main";
export default {
  props: ["brews"],
  created() {
    bus.$on("click-list-brew", (data) => {
      this.brews[0].latitude = data[0];
      this.brews[0].longitude = data[1];
      this.infoWindowOpened = false;
    });
  },
  data() {
    return {
      infoWindowOptions: {
        pixelOffset: {
          width: 0,
          height: -35,
        },
      },
      activeBrew: {},
      infoWindowOpened: false,
      markerOptions: {
        url: securityCamera,
        scaledSize: { width: 28, height: 28 },
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
    mapCenter() {
      if (!this.brews.length) {
        return {
          lat: 10,
          lng: 10,
        };
      }
      return {
        lat: parseFloat(this.brews[0].latitude),
        lng: parseFloat(this.brews[0].longitude),
      };
    },
    infoWindowPosition() {
      return {
        lat: parseFloat(this.activeBrew.latitude),
        lng: parseFloat(this.activeBrew.longitude),
      };
    },
  },
};
</script>

<style lang="scss" scoped>
</style>