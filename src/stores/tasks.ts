import { defineStore } from "pinia";
import { TimeTracker } from "../classes/TimeTracker";

export const useTaskStore = defineStore("task", {
	state: () => ({
		taskList: [] as TimeTracker[],
	}),
	getters: {},
	actions: {
		createNewTask(name: string): void {
			const newTask = new TimeTracker({ taskName: name });
			this.taskList.push(newTask);
		},
		removeTask(id: number): void {
			this.taskList = this.taskList.filter((task: TimeTracker) => {
				return task.getId() !== id;
			});
		},
	},
});
