<template>
  <div>
    <b-list-group class="size-list">
      <b-list-group-item
        href="#"
        class="flex-column align-items-start"
        v-for="alarm in orderedPriority"
        :key="alarm.id"
        @click="clickList(alarm.latitude, alarm.longitude, alarm.id)"
      >
        <b-row class="row align-items-center">
          <b-col cols="10" class="remove-padding">
            <h6 class="mb-1">
              <b>{{ alarm.name }}</b>
            </h6>
            <p class="mb-1" v-if="alarm.priority">
              <b>Prioridade: </b> {{ alarm.priority }} ({{ alarm.quantity }})
            </p>
          </b-col>
          <b-col cols="2" class="remove-padding" style="text-align: center">
            <b-iconstack font-scale="2">
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
    ...mapGetters(["allAlarmList"]),
    orderedPriority() {
      let list = this.allAlarmList;

      return list
        .sort((a, b) => (a.priority_id > b.priority_id ? 1 : -1))
        .reverse();
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
  overflow-y: scroll;
  height: 90vh;
}

h4 {
  font-size: 16px;
}

p {
  font-size: 13px !important;
  line-height: 1.3rem !important;
}
</style>