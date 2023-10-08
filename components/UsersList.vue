<script setup>
defineProps({
    users: { type: Array, required: true },
    assignedUser: { type: String, required: false, default: "" }
})

defineEmits(['assignUser']);

</script>



<template>
    <div class="h-[25.6rem] flex flex-col">
        <button 
            v-for="(user, index) in users" :key="index"
            class="px-[1.6rem] py-[.8rem] flex items-center gap-[.8rem] text-gray-700 transition-colors hover:bg-gray-200"
            :class="[{'!bg-primary/50 text-white': user.name === assignedUser }]" @click="$emit('assignUser', user)">
            <img 
                class="w-[2rem] h-[2rem] rounded-full overflow-hidden"
                :src="`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}&backgroundColor=0fbcf9,6f42c1,e83e8c,ffc048,0be881,36b9cc,34495e,27ae60,2ecc71,2980b9`"
                :alt="user.name" />
                <div
                    class="text-sm"
                    alt="User Avatar"
                    v-text="user.name"
                />
        </button>

    </div>
</template>