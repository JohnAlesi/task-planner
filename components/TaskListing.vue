<script setup>
import { computed } from "vue";
import Drag from "vuedraggable";
import useStore from "@/store/Store";
const store = useStore();

// Component
const props = defineProps({
  searchInputValue: { type: String, required: true },
});

// Task data
const filteredTasks = computed({
  get() {
    if (store.isActive === "important") {
      return store.isImportant;
    } else if (store.isActive === "done") {
      return store.isDone;
    } else {
      return store.tasks;
    }
  },
  set(newValue) {
    if (store.isActive === "important") {
      store.isImportant = newValue;
    } else if (store.isActive === "done") {
      store.isDone = newValue;
    } else {
      store.tasks = newValue;
    }
  },
});

const searchedTasks = computed({
  get() {
    return filteredTasks.value.filter((task) => {
      return String(task.title)
        .toLowerCase()
        .includes(props.searchInputValue.toLowerCase());
    });
  },
});
</script>

<template>
  <div class="w-full">
    <template v-if="searchInputValue">
      <div class="rel flex flex-col items-center gap-[1.6rem] w-full" tag="div">
        <TaskItem v-for="(task, index) in searchedTasks" :key="index" :task="task" />
      </div>
    </template>
    <template v-else>
      <Drag  v-model="filteredTasks" class="rel flex flex-col items-center gap-[1.6rem] w-full pb-[12rem]" tag="div">
        <TaskItem v-for="(task, index) in filteredTasks" :key="index" class="cursor-move"  :task="task" />
      </Drag>
    </template>
  </div>
</template>

<style lang="scss" scoped></style>