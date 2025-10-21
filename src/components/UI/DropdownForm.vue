<template>
  <form action="#" class="dropdown-form" submit.prevent>
    <slot />
  </form>
</template>

<style scoped lang="scss">
.dropdown-form {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
