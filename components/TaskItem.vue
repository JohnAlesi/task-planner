<script setup>
import { ref } from "vue";
import useService from "@/service/Services";

// Component
const props = defineProps({ task: { type: Object, required: true } });

// events
const handleDone = () => {
  useService.updateTask(
    props.task.id,
    { is_done: !props.task.is_done },
    "Task has been updated"
  );
};
const handleImportant = () => {
  useService.updateTask(
    props.task.id,
    { is_important: !props.task.is_important },
    "Task has been updated"
  );
};

// Data properties
const editing = ref(false);
const editedTitle = ref(props.task.title);

// Event handlers
const startEditing = () => {
  editing.value = true;
};

const stopEditing = () => {
  editing.value = false;
};

const handleSave = () => {
  useService.updateTask(
    props.task.id,
    { title: editedTitle.value },
    "Title successfully updated");
  stopEditing();
};

// Delete task
const handleDelete = () => {
  useService.removeTask(props.task.id);
};

// Update Assigned user
const $assigneeAvatar = ref(null);
const handleAssignUser = (newAssignee) => {
  useService.updateTask(
    props.task.id,
    { assignee: newAssignee },
    "Task assigne updated"
  );
  shouldShowDropdown.value = false;
};

// User dropdown
const shouldShowDropdown = ref(false);

</script>

<template>
  <div
    class="relative flex justify-between items-center gap-[3.2rem] w-full max-w-[144rem] bg-white p-[25px] border border-solid border-[#b8db32] rounded-[.4rem] transition-shadow hover:shadow-md"
    :class="{ 'translate-x-[-20px]': task.is_done }">
    <div class="flex items-center gap-[25px]">
      <button 
        class="grid p-[.4rem] rounded-full transition-colors hover:!bg-primary"
        :class="{ 'bg-gray-300': !task.is_done, 'bg-success': task.is_done }" 
        @click="handleDone">
        <font-awesome-icon class="w-[.875rem] h-[1rem] text-white" icon="fa-solid fa-check" />
      </button>
      <button class="check grid p-[.4rem] rounded-full transition-colors hover:!bg-primary" @click="handleDone">
        <font-awesome-icon class="w-[.875rem] h-[1rem] text-white" icon="fa-solid fa-check" />
      </button>
      <template v-if="!editing">
        <button 
          class="flex-1 text-left transition-[text-decoration]" 
          :class="{
          'text-gray-500': task.is_done,
          'text-gray-700': !task.is_done,
          'line-through': task.is_done
        }" @click="startEditing">
          {{ task.title }}
        </button>
      </template>
      <template v-else>
        <!-- Editable input field -->
        <input 
          v-model="editedTitle" 
          class="flex-1 text-left outline-none" 
          @blur="stopEditing"
          @keyup.enter="handleSave" />
      </template>
    </div>
    <div class="relative flex gap-[.8rem]">
      <DropdownList
        v-if="shouldShowDropdown"
        :current-user="task.assignee.name"
        @close="shouldShowDropdown = false"
        @assignUser="handleAssignUser"
      />
      <button
        ref="$assigneeAvatar"
        class="task-item__assignee w-[1.6rem] h-[1.6rem] overflow-hidden rounded-full grid place-items-center"
        @click="shouldShowDropdown = true"
      >
        <img
          v-if="task.assignee.name"
          class="w-full"
          :src="`https://api.dicebear.com/7.x/initials/svg?seed=${task.assignee.name}&backgroundColor=0fbcf9,6f42c1,e83e8c,ffc048,0be881,36b9cc,34495e,27ae60,2ecc71,2980b9`"
          :alt="`${task.assignee.name} Avatar`"
        />
        <font-awesome-icon
          v-else
          class="task-item__assignee-avatar w-[1.6rem] h-[1.6rem] text-gray-300 transition-colors hover:!text-gray-500"
          icon="fa-solid fa-user-xmark"
        />
      </button>
      <button class="grid" @click="handleImportant">
        <font-awesome-icon 
        class="text-gray-300 transition-colors hover:!text-yellow" 
        :class="[{
          'text-yellow'
            :
            task.is_important
        }]" icon="fa-solid fa-star" />
      </button>
      <button class="grid" @click="handleDelete">
        <font-awesome-icon class="text-gray-300 transition-colors hover:!text-danger" icon="fa-solid fa-trash-can" />
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>