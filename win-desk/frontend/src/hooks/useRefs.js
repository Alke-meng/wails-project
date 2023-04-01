import { ref, onBeforeUpdate } from 'vue';

export function useRefs() {
  const refs = ref([]);

  onBeforeUpdate(() => {
    refs.value = [];
  });

  const setRefs = (index) => (el) => {
    refs.value[index] = el;
  };

  return [refs, setRefs];
}
