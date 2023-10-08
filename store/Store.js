import {defineStore} from "pinia";
import {ref, computed} from "@nuxtjs/composition-api";

const useTask = defineStore("task", () =>{
    const tasks= ref([]);

    const users = ref([]);

    // Task

    const isImportant = computed(() => {
        return tasks.value.filter((task) => task.is_important);
      });

    const isDone = computed(() => {
        return tasks.value.filter(
            (task => task.is_done)
        );
    })

    const isActive = ref("all");

    // Task Creation
    const addTask = (task) => {
        tasks.value.push(task);
    }

    // Task Deletion
    const removeTask = (taskID) => {
        const removedTask = tasks.value.findIndex(
            (task) => task.id === taskID
        );
        tasks.value.splice(removedTask, 1);
    };

    // Update
    const updateTask = (taskID, updatedTaskProp) => {
        const updatedTask = tasks.value.findIndex((task) => task.id === taskID
        );
        tasks.value[updatedTask][Object.keys(updatedTaskProp)[0]] = Object.values(updatedTaskProp)[0];
    };


    return{
        tasks,
        addTask,
        removeTask,
        updateTask,
        isActive,
        isDone,
        isImportant,
        users
    };
});

export default useTask;