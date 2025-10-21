<template>
  <div class="dropdown">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.dropdown {
  background-color: var(--bgc-dark);
  padding: 8px;
  border-radius: 20px;
  outline: 1px solid #3c3b5e;
}
</style>
