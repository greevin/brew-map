<template>
  <div style="height: 100%; width: 100%">
    <l-map :zoom="zoom" :center="center" :options="mapOptions">
      <l-tile-layer :url="url" />
      <l-marker
        v-for="brew in brews"
        :key="brew.id"
        :lat-lng="latLng(brew.latitude, brew.longitude)"
        :icon="icon"
      >
        <l-popup>
          <div @click="innerClick">
            <b>{{ brew.name }}</b>
            <p class="mt-1">{{ brew.city }}, {{ brew.state }}</p>
          </div>
        </l-popup>
      </l-marker>
    </l-map>
  </div>
</template>

<script>
import { latLng, icon } from "leaflet";
import { LMap, LTileLayer, LMarker, LPopup } from "vue2-leaflet";
import securityCamera from "../assets/security-camera.png";

export default {
  name: "BrewMap",
  props: ["brews"],
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
  },
  data() {
    return {
      zoom: 18,
      center: latLng(33.524521, -86.774322),
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      currentZoom: 17,
      mapOptions: {
        zoomSnap: 0.5,
      },
      showMap: true,
      icon: icon({
        iconUrl: securityCamera,
        iconSize: [32, 35],
        iconAnchor: [15, -5],
      }),
    };
  },
  methods: {
    latLng(lat, lng) {
      return latLng(lat, lng);
    },
    innerClick() {
      alert("Click!");
    },
  },
};
</script>
