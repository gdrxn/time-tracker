<template>
	<div class="flex min-h-screen w-full flex-col items-center bg-gray-900">
		<div class="flex h-32 w-full items-center justify-center">
			<form @submit.prevent="createNewTask()" class="flex space-x-3">
				<input
					v-model.trim="input"
					type="text"
					placeholder="Task name"
					class="rounded-xl bg-gray-300 focus:border-current focus:ring-0"
				/>
				<button
					class="rounded-3xl bg-gray-700 py-2 px-4 uppercase hover:bg-gray-600"
				>
					Add
				</button>
			</form>
		</div>
		<div
			class="mb-8 flex h-full justify-center rounded-xl bg-gray-800 pb-8 xl:w-6/12"
		>
			<table class="mt-10 divide-gray-900">
				<thead>
					<tr
						class="mb-6 grid grid-cols-4 space-x-12 text-gray-300 sm:space-x-24"
					>
						<th class="pl-8 md:text-xl">Task</th>
						<th class="md:text-xl">Time</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-gray-600">
					<Row
						v-for="task in taskStore.taskList"
						:key="(task as TimeTracker).getId()"
						:task="(task as TimeTracker)"
					/>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script setup lang="ts">
import { TimeTracker } from "../classes/TimeTracker";
import { ref } from "vue";
import { useTaskStore } from "../stores/tasks";
import Row from "../components/Row.vue";

const taskStore = useTaskStore();

const input = ref("");

function createNewTask(): void {
	if (input.value.length === 0) {
		return;
	}

	taskStore.createNewTask(input.value);
	input.value = "";
}
</script>
