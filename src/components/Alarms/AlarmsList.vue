<template>
  <div>
    <b-list-group class="size-list">
      <b-list-group-item
        href="#"
        class="flex-column align-items-start"
        v-for="alarm in allAlarm"
        :key="alarm.id"
        @click="clickList(alarm.latitude, alarm.longitude, alarm.id)"
      >
        <b-row class="row align-items-center">
          <b-col cols="10">
            <h6 class="mb-1">
              <b>{{ alarm.name }}</b>
            </h6>
            <p class="mb-1" v-if="alarm.priority">
              <b>Prioridade: </b> {{ alarm.priority }} ({{ alarm.quantity }})
            </p>
            <p
              v-if="alarm.user_full_name_recognizing"
              class="mb-1"
              style="margin-top: -2px"
            >
              <b>Operador: </b> {{ alarm.user_full_name_recognizing }}
            </p>
          </b-col>
          <b-col
            cols="2"
            style="text-align: center"
            :style="
              alarm.user_full_name_recognizing ? 'margin-top: -10px;' : ''
            "
          >
            <map-icons
              :color-line="alarm.color_line"
              :icon="alarm.icon"
              :user="alarm.user_full_name_recognizing"
            />
          </b-col>
        </b-row>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import MapIcons from "../Icons/MapIcons";
export default {
  components: { MapIcons },
  computed: {
    ...mapGetters(["allAlarm"]),
    orderedPriority() {
      const list = this.allAlarm;
      return list.sort((a, b) => {
        if (a.priority_id > b.priority_id) {
          return 1;
        } else {
          return -1;
        }
      });
    },
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
.size-list {
  overflow-y: auto;
  height: 100vh;
}

@media (max-width: 1439px) {
  .size-list {
    overflow-y: auto;
    height: 70vh;
  }
}

.h6,
h6 {
  font-size: 0.9rem;
}

.mb-1,
.my-1 {
  margin-bottom: 0.1rem !important;
}

p {
  font-size: 13px !important;
  line-height: 1.3rem !important;
}

.list-group-item {
  padding-bottom: 5px;
  padding-top: 5px;
}
</style>