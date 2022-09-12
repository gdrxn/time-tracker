<template>
	<tr class="grid grid-cols-4 space-x-12 py-2.5 px-6 sm:space-x-24">
		<td
			class="flex items-center justify-center text-gray-300 md:text-xl"
			ref="taskNameElement"
			:contentEditable="isEdited"
			@dblclick="startEditing"
			@blur="changeTaskName(task)"
			@keydown.enter="changeTaskName(task)"
			@keydown.esc="cancelChanges(task)"
		>
			{{ task.getName() }}
		</td>
		<td class="flex items-center justify-center text-gray-300 md:text-xl">
			{{ task.getCurrentTime() }}
		</td>
		<td
			class="col-span-2 flex items-center justify-center space-x-2 rounded-2xl"
		>
			<svg
				@click="task.start()"
				xmlns="http://www.w3.org/2000/svg"
				class="rounded-full bg-green-400 sm:h-12 sm:w-12"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="1.4"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
				/>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
			<svg
				@click="task.pause()"
				xmlns="http://www.w3.org/2000/svg"
				class="rounded-full bg-slate-200 sm:h-12 sm:w-12"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="1.4"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
			<svg
				@click="task.stop()"
				xmlns="http://www.w3.org/2000/svg"
				class="rounded-full bg-red-500 sm:h-12 sm:w-12"
				viewBox="0 0 24 24"
				stroke="currentColor"
				fill="none"
				stroke-width="1.3"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
				/>
			</svg>
			<svg
				@click="taskStore.removeTask(task.getId())"
				xmlns="http://www.w3.org/2000/svg"
				class="text-gray-400 sm:h-10 sm:w-10"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
				/>
			</svg>
		</td>
	</tr>
</template>

<script setup lang="ts">
import { ref } from "@vue/reactivity";
import { useTaskStore } from "../stores/tasks";
import { TimeTracker } from "../classes/TimeTracker";

const taskStore = useTaskStore();

const props = defineProps({
	task: { type: TimeTracker, required: true },
});

/*
	onMounted(() => {
		console.log(taskNameElement.value.textContent);
	});
*/
const taskNameElement = ref(null);
const isEdited = ref(false);

function startEditing(): void {
	isEdited.value = true;
	setTimeout(() => taskNameElement.value.focus(), 0);
}

function changeTaskName(task: TimeTracker): void {
	isEdited.value = false;
	task.changeTaskName(taskNameElement.value.textContent);
}

function cancelChanges(task: TimeTracker): void {
	taskNameElement.value.textContent = task.getName();
}
</script>
