<script setup>
import useStore from "@/store/Store.js";
const taskStore = useStore();

// Component
const props = defineProps({
  filterName: {
    type: String,
    required: true,
  },
});

// Event handling
const handleButtonClick = () => {
  taskStore.isActive = props.filterName;
};
</script>

<template>
  <button
    class="task-filter px-[1.6rem] py-[.4rem] rounded-[.4rem] text-md text-gray-500 transition-colors"
    :class="{ 'bg-gray-200': taskStore.activeTask === filterName }"
    @click="handleButtonClick"
  >
    {{ filterName[0].toUpperCase() + filterName.slice(1) }}
    <span 
        v-if="filterName != 'all'" 
      >({{
        filterName === "important"
          ? taskStore.isImportant.length
          : taskStore.isDone.length
      }})</span
    >
  </button>
</template>

<style lang="scss" scoped></style>