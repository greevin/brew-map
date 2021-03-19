<template>
  <div style="display: flex; justify-content: center">
    <div
      class="border-icon"
      :style="'background:' + colorLine + ' !important'"
      v-if="icon"
    >
      <i :class="icon" class="icon-size" />
      <i
        v-if="user"
        class="icon-user iconsminds-user"
        style="position: relative; top: -10px; left: 13px"
      />
    </div>
    <div
      v-if="!icon"
      class="border-icon"
      style="background: #007bff !important"
    >
      <i
        class="icon-size iconsminds-map-marker-2"
        style="color: white; padding-left: 1px"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ['colorLine', 'icon', 'user']
};
</script>

<style scoped>
.icon-size {
  font-size: 22px;
  line-height: 32px;
  vertical-align: middle !important;
}

.border-icon {
  color: grey;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
}

.icon-user {
  color: white;
  display: inline-block;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #28a745;
  font-size: 14px;
  line-height: 22px;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
}

.icon-user-position {
  position: relative;
  top: 20px;
  left: 13px;
}

i:before {
  font-weight: bolder !important;
}
</style>