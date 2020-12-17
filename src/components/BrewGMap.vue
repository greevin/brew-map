<template>
  <div style="height: 100%; width: 100%">
    <GmapMap :center="mapCenter" :zoom="17" style="width: 100%; height: 100%">
      <GmapInfoWindow
        :options="infoWindowOptions"
        :position="infoWindowPosition"
        :opened="infoWindowOpened"
        @closeclick="handleMarkerClicked"
      >
        <div class="info-window">
          <h5>{{ activeBrew.name }}</h5>
          <p>{{ activeBrew.city }}, {{ activeBrew.state }}</p>
        </div>
      </GmapInfoWindow>
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
export default {
  props: ["brews"],
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