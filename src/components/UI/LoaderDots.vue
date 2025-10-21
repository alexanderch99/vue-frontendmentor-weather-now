<script setup lang="ts"></script>

<template>
  <div class="loader-dots">
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>

<style scoped>
.loader-dots {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.loader-dots span {
  width: 12px;
  height: 12px;
  background: #fff;
  border-radius: 50%;
  animation: bounce 0.6s infinite alternate;
}

.loader-dots span:nth-child(2) {
  animation-delay: 0.2s;
}
.loader-dots span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes bounce {
  from {
    transform: translateY(0);
    opacity: 0.4;
  }
  to {
    transform: translateY(-6px);
    opacity: 1;
  }
}
</style>
