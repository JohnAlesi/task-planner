<script setup>
import { ref } from "vue";
import { useDebounceFn } from "@vueuse/core";

// Component
const emit = defineEmits(["searchInput"]);

// Search
const searchInputValue = ref("");
const handleSearchInput = useDebounceFn(() => {
  emit("searchInput", searchInputValue.value.trim());
}, 512);
</script>

<template>
  <div
    class="flex items-center gap-[.8rem] w-full max-w-[144rem] p-[1.6rem] py-[.8rem] !border border-solid border-gray-200 rounded-full">
    <font-awesome-icon class="w-[1.4rem] h-[1.4rem] text-gray-400" icon="fa-solid fa-search" />
    <input 
      v-model="searchInputValue"
      class="flex-1 text-md font-medium text-gray-700 outline-none placeholder:text-gray-400" type="text"
      placeholder="Search" @input="handleSearchInput" />
  </div>
</template>

<style lang="scss" scoped></style>