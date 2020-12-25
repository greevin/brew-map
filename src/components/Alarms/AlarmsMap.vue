<template>
  <div style="height: 100%; width: 100%">
    <!-- mapa -->
    <GmapMap :center="mapCenter" :zoom="zoom" style="width: 100%; height: 100%">
      <!-- popup -->
      <GmapInfoWindow
        :options="infoWindowOptions"
        :position="infoWindowPosition"
        :opened="infoWindowOpened"
        @closeclick="handleInfoWindowClose"
      >
        <div class="info-window">
          <h6 class="mb-1">{{ activeAlarm.name }}</h6>
          <p class="mb-1">{{ activeAlarm.priority }}</p>
          <p class="mb-1">{{ activeAlarm.priority_id }}</p>
          <a
            :href="
              'http://localhost:8080/sub/office/synoptic/' +
              activeAlarm.office_id
            "
            target="_blank"
            >Acessar Synoptic</a
          >
        </div>
      </GmapInfoWindow>
      <!-- marker -->
      <!-- <GmapMarker
        :clickable="true"
        :draggable="false"
        v-for="alarm in allAlarmList"
        :key="alarm.id"
        :position="getPosition(alarm)"
        :icon="markerOptions"
        :label="alarm.icon"
        @click="handleMarkerClicked(alarm)"
      /> -->
      <gmap-custom-marker
        :clickable="true"
        v-for="alarm in allAlarmList"
        :key="alarm.id"
        :marker="getPosition(alarm)"
        :icon="markerOptions"
        :label="alarm.icon"
        @click.native="handleMarkerClicked(alarm)"
      >
        <b-iconstack font-scale="4">
          <b-icon
            stacked
            icon="circle-fill"
            :style="'color:' + alarm.color_line"
          ></b-icon>
          <b-icon
            stacked
            :icon="alarm.icon"
            scale="0.5"
            variant="grey"
          ></b-icon>
          <b-icon stacked icon="circle" variant="danger"></b-icon>
        </b-iconstack>

        <!-- <b-icon
          v-if="alarm.icon"
          :icon="alarm.icon"
          :style="'color:' + alarm.color_line"
          style="width: 35px; height: 35px"
        ></b-icon>
        <b-icon
          v-else
          icon="exclamation-circle"
          style="width: 35px; height: 35px"
        ></b-icon> -->
      </gmap-custom-marker>
    </GmapMap>
  </div>
</template>

<script>
// import securityCamera from "../assets/security-camera.png";
import { mapGetters, mapState } from "vuex";
import GmapCustomMarker from "vue2-gmap-custom-marker";
const icon =
  '<svg viewBox="0 0 16 16" width="1em" height="1em" focusable="false" role="img" aria-label="exclamation triangle fill" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi-exclamation-triangle-fill b-icon bi"><g><path fill-rule="evenodd" d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 5zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path></g></svg>';

export default {
  components: {
    GmapCustomMarker,
  },
  computed: {
    ...mapState(["lat", "lng", "zoom"]),
    ...mapGetters(["mapCenter", "updateMaps", "allAlarmList"]),
    infoWindowPosition() {
      return {
        lat: parseFloat(this.activeAlarm.latitude),
        lng: parseFloat(this.activeAlarm.longitude),
      };
    },
  },
  data() {
    return {
      infoWindowOptions: {
        pixelOffset: {
          width: 0,
          height: -45,
        },
      },
      marker: {
        lat: 50.60229509638775,
        lng: 3.0247059387528408,
      },
      activeAlarm: {},
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
      this.activeAlarm = brew;
      this.infoWindowOpened = true;
    },
    handleInfoWindowClose() {
      this.activeAlarm = {};
      this.infoWindowOpened = false;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>