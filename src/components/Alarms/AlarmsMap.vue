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
          <p class="mb-1" v-if="activeAlarm.priority">
            <b>Prioridade: </b> {{ activeAlarm.priority }} ({{
              activeAlarm.quantity
            }})
          </p>
          <p v-if="activeAlarm.user_full_name_recognizing">
            <b>Operador: </b> {{ activeAlarm.user_full_name_recognizing }}
          </p>
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

      <GmapCluster :zoom-on-click="true">
        <!-- marker -->
        <gmap-custom-marker
          :clickable="true"
          v-for="alarm in allAlarmList"
          :key="alarm.id"
          :marker="getPosition(alarm)"
          :label="alarm.icon"
          @mouseenter.native.stop="handleMarkerClicked(alarm)"
        >
          <b-iconstack font-scale="3">
            <b-icon
              stacked
              icon="circle-fill"
              variant="info"
              :style="'color:' + alarm.color_line + ' !important'"
            ></b-icon>
            <b-icon
              v-if="alarm.icon"
              stacked
              :icon="alarm.icon"
              scale="0.5"
              variant="black"
            ></b-icon>
            <b-icon
              v-else
              stacked
              icon="geo-alt-fill"
              scale="0.5"
              variant="black"
            ></b-icon>
            <b-icon
              v-if="alarm.user_full_name_recognizing"
              stacked
              icon="circle-fill"
              shift-h="6"
              shift-v="-8"
              scale="0.6"
              variant="white"
            ></b-icon>
            <b-icon
              v-if="alarm.user_full_name_recognizing"
              stacked
              icon="person-fill"
              shift-h="6"
              shift-v="-8"
              scale="0.4"
              variant="grey"
            ></b-icon>
            <b-icon
              stacked
              v-if="alarm.user_full_name_recognizing"
              icon="circle"
              variant="success"
              shift-h="6"
              shift-v="-8"
              scale="0.6"
            ></b-icon>
          </b-iconstack>
          <!-- <b-iconstack font-scale="3">
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
          </b-iconstack> -->
        </gmap-custom-marker>
      </GmapCluster>
    </GmapMap>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import GmapCustomMarker from "vue2-gmap-custom-marker";
import GmapCluster from "vue2-google-maps/dist/components/cluster";

export default {
  components: {
    GmapCustomMarker,
    GmapCluster,
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
div[clickable="true"] {
  cursor: pointer;
}
</style>