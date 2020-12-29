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
            style="text-align: center; padding: 0px"
            :style="
              alarm.user_full_name_recognizing ? 'margin-top: -10px;' : ''
            "
          >
            <b-iconstack font-scale="2">
              <b-icon
                stacked
                icon="circle-fill"
                :style="'color:' + alarm.color_line + ' !important'"
                variant="info"
              ></b-icon>
              <b-icon
                v-if="alarm.icon"
                stacked
                :icon="alarm.icon"
                scale="0.5"
                variant="grey"
              ></b-icon>
              <b-icon
                v-else
                stacked
                icon="geo-alt-fill"
                scale="0.5"
                variant="grey"
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
          </b-col>
        </b-row>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  computed: {
    ...mapGetters(["allAlarm"]),
    orderedPriority() {
      let list = this.allAlarm;
      return list.sort((a, b) => (a.priority_id > b.priority_id ? 1 : -1));
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
    height: 89vh;
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