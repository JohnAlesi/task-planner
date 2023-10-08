<script setup>
import { ref } from "vue";
import useService from "@/service/Services";
useService.getTasks();
useService.getUsers()

const filters = ["all", "important", "done"];

// Search
const searchInputValue = ref("");
const handleSearchInput = (input) => {
    searchInputValue.value = input;
};

</script>

<template>
    <div class="relative flex flex-col items-center gap-[3.2rem] min-h-screen pt-12 px-[153px] container">
        <nav class="flex justify-between items-center w-full max-w-[144rem]">
            <NuxtLink class="font-medium text-[3rem] !text-secondary !no-underline" to="/">
                Task Planner
            </NuxtLink>
            <ul class="flex">
                <li v-for="(filter, index) in filters" :key="index" class="text-dark">
                    <TaskFilter :filter-name="filter" />
                </li>
            </ul>
        </nav>
        <TaskSearch @searchInput="handleSearchInput" />
        <TaskListing :search-input-value="searchInputValue" />
        <div class="fixed bottom-[1.6rem] left-0 right-0 flex justify-center px-[14.60rem]">
            <InputTask placeholder="Add a task..." />
        </div>
    </div>
</template>