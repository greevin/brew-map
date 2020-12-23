<template>
  <div>
    <b-list-group class="size-list">
      <b-list-group-item
        href="#"
        class="flex-column align-items-start"
        v-for="alarm in allAlarmList"
        :key="alarm.id"
        :style="'background-color:' + alarm.color_line"
        @click="clickList(alarm.latitude, alarm.longitude, alarm.id)"
      >
        <b-row v-show="alarm.latitude">
          <b-col cols="10" class="remove-padding">
            <h5 class="mb-1">
              <b>{{ alarm.name }}</b>
            </h5>
            <p class="mb-1" v-if="alarm.priority">
              <b>Prioridade: </b> {{ alarm.priority }}
            </p>
            <p class="mb-1" v-if="alarm.quantity">
              <b>Quantidade: </b> {{ alarm.quantity }}
            </p>
          </b-col>
          <b-col cols="2" class="remove-padding" style="text-align: center">
            <b-icon
              v-if="alarm.icon"
              :icon="alarm.icon"
              style="width: 35px; height: 35px"
            ></b-icon>
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
    ...mapGetters(["currentCount", "allAlarmList"]),
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
  overflow-y: scroll;
  height: 90vh;
}
</style>