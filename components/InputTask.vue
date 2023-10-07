<script setup>
import { useRouter, useRoute } from "@nuxtjs/composition-api";
import { ref, computed } from "vue";
import Service from "@/service/Services";
// Routing
const route = useRoute();
const router = useRouter();

// Propping
const props = defineProps({ placeholder: { type: String, required: false, default: "" } });

const taskText = ref("");

// Functions

const handleSubmit = () => {
  Service.addTask(taskText.value);
  taskText.value = ""; // Clear the task text
  if (route.value.path === "/")
    router.push("/task");
}

// Input rendering
const focusing = ref(false);
const placeholder = computed(() => {
  if (props.placeholder)
    return props.placeholder
  return focusing.value
    ? `Try typing "Submit report by Friday 3 PM"`
    : `What's your plan for today?`;
});
</script>

<template>
  <div class="flex flex-column gap-[.8rem] p-[25px] w-full max-w-[144rem] container">
    <div
      class="flex items-center gap-[.8rem] p-[1.6rem] rounded-[.4rem] bg-gray-100 focus:ring-1 focus:ring-primary w-full"
      :class="{ 'shadow-md': props.placeholder }">
      <Transition>
        <font-awesome-icon v-if="!focusing" class="absolute w-[2rem] h-[2rem] text-gray-400" icon="fa-solid fa-plus" />
        <div v-else class="absolute w-[2rem] h-[2rem] rounded-full border-2 border-gray-400" />
      </Transition>

      <form class="flex-1 text-md h-full ml-[2.8rem]" @submit.prevent="handleSubmit">
        <input 
        v-model="taskText" 
        class="w-full bg-gray-100 outline-none" 
        type="text" 
        :placeholder="placeholder"
        @blur="focusing = false" 
        @focus="focusing = true" />
      </form>
    </div>
    <div class="text-xs text-gray-400">
      Press
      <span class="transition-[color] duration-[320ms]" :class="{ 'text-pink': !focusing }">enter</span>
      to add task
    </div>
  </div>
</template>


<style lang="scss" scoped></style>