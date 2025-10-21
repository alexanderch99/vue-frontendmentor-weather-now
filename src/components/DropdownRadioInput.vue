<script setup lang="ts">
defineProps<{
  inputName: string;
  inputId: string;
  value: string;
}>();

const model = defineModel();
</script>

<template>
  <div class="dropdown-radio-input">
    <label :for="inputId" class="dropdown-radio-input__label">
      <input
        type="radio"
        class="dropdown-radio-input__input"
        :name="inputName"
        :id="inputId"
        :value="value"
        v-model="model"
      />
      <div class="dropdown-radio-input__text">{{ value }}</div>
    </label>
  </div>
</template>

<style scoped lang="scss">
.dropdown-radio-input {
  width: 100%;
  height: 100%;

  &__label {
    display: block;
    cursor: pointer;
  }

  &__input {
    opacity: 0;
    visibility: hidden;
    position: absolute;
    z-index: -1;

    &:checked + div {
      background-color: #302f4a;
      outline: 1px solid #3c3b5e;
    }
  }

  &__text {
    padding: 8px;
    border-radius: 10px;
    font-size: 17px;
    line-height: 17px;

    &:hover {
      background-color: #302f4a;
    }
  }
}
</style>
