import axios from "axios";
import toastr from "toastr";
import useStore from "@/store/Store";


const API_URL = process.env.API_URL;

class TaskService {
    static async addTask (task) {
        try{
            const { data } = await axios.post(API_URL + "tasks", {  title: task });
            const taskStore = useStore();
            taskStore.addTask(data);
            toastr.success("Task Successfully added.");
        } catch (err) {
            toastr.error("Error occured");
        }
    }

    static async removeTask (taskID) {
        try{
            await axios.delete(`${API_URL}/tasks/${taskID}`);
            const taskStore = useStore();
            taskStore.removeTask(taskID);
            toastr.success("Deletion success.");
        } catch (err) {
            toastr.error("An error occured during the deletion.");
        }
    }

    static async updateTask (taskID, updatedTaskProp, updateMsg) {
        try{
            await axios.put(`${API_URL}/tasks/${taskID}`, updatedTaskProp);
            const taskStore = useStore();
            taskStore.updateTask(taskID, updatedTaskProp);
            toastr.success(updateMsg);
        } catch (err) {
            toastr.error("An error occured during updating task.");
        }
    }

    static async getTasks () {
        try{
            const { data } = await axios.get(API_URL + "/tasks");
            const taskStore = useStore();
            taskStore.tasks = data;
        } catch (err) {
            toastr.error("Unable to fetch tasks.");
        }
    }

    static async getUsers () {
        try {
            const { data } = await axios.get(API_URL + "/users");
            const userStore = useStore();
            userStore.users = data;
        }   catch (err) {
            toastr.error("Unable to fetch users.")
        }
    }
}

export default TaskService;