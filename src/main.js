import { createApp, watch, watchEffect } from "vue";
import "./tailwind.css";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router/auto";
import { createPinia } from "pinia";
import { TimeTracker } from "./classes/TimeTracker";
import { useTaskStore } from "./stores/tasks";
const app = createApp(App);

const router = createRouter({
	history: createWebHistory(),
});
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.mount("#app");

const taskStore = useTaskStore();

if (localStorage.getItem("state")) {
	const tasksList = [];
	const tasks = JSON.parse(localStorage.getItem("state"));

	for (const task of tasks) {
		const newTask = new TimeTracker(task);
		tasksList.push(newTask);
	}

	taskStore.taskList = tasksList;
}

watchEffect(() => {
	localStorage.setItem("state", JSON.stringify(taskStore.taskList));
});
