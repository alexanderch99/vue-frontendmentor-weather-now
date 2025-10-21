import { onMounted, onUnmounted } from "vue";
import type { Ref } from "vue";

type MaybeRef<T> = T | Ref<T | null>;

export function useClickOutside(target: MaybeRef<HTMLElement>, closeFn: () => void) {
  function checkTarget(event: MouseEvent) {
    const el = target && "value" in target ? target.value : target;
    if (el && !el.contains(event.target as Node)) {
      closeFn();
    }
  }

  onMounted(() => {
    document.addEventListener("click", checkTarget);
  });

  onUnmounted(() => {
    document.removeEventListener("click", checkTarget);
  });
}
