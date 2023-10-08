<script setup>
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import userStore from "@/store/Store";
const store = userStore();

defineProps({
    assignedUser: { type: String, required: false, default: "" }
});

const emit = defineEmits(["assignUser", "close"]);

// Pick User
const handleAssign = (user) => {
    emit("assignUser", user)
};

const $dropdown = ref(null);
onClickOutside($dropdown, () => {
    emit("close")
})

// Search Functionality for user
const searchInputValue = ref("");
const searchedUser = ref([]);
const handleSearch = () => {
    searchedUser.value = store.users.filter((user) =>
        user.name.toLowerCase().includes(searchInputValue.value.toLowerCase())
    );
};

</script>

<template>
    <div 
        ref="$dropdown" 
        class="absolute top-[1.6rem] z-50 shadow-lg rounded-[.4rem] bg-white flex flex-col gap-[.8rem]">
        <div
            class="!border border-solid border-gray-400 rounded-[.4rem] mx-[1.6rem] mt-[1.6rem] mb-[.8rem] p-[.8rem] flex items-center gap-[.8rem]">
            <font-awesome-icon class="w-[1.6rem] h-[1.6rem] text-gray-400" icon="fa-solid fa-search" />
            <input 
                v-model="searchInputValue" 
                class="text-xs text-gray-700 outline-none placeholder:text-gray-400"
                type="text" 
                placeholder="Search Team Member" 
                @input="handleSearch" />
        </div>
        <perfect-scrollbar>
            <UsersList 
                v-show="searchInputValue" 
                :users="searchedUser" 
                :current-user="assignedUser"
                @assignUser="handleAssign" />
            <UsersList 
                v-show="!searchInputValue" 
                :users="store.users" 
                :current-user="assignedUser"
                @assignUser="handleAssign" />
        </perfect-scrollbar>
    </div>
</template>