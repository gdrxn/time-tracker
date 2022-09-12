interface ITimeTracker {
	taskName: string;
	hour?: number;
	minute?: number;
	second?: number;
}

export class TimeTracker {
	static index: number = 0;

	protected taskName: string;
	protected hour: number;
	protected minute: number;
	protected second: number;

	protected isRunning: boolean = false;
	protected timer: number;

	protected id: number = TimeTracker.index;

	constructor({ taskName, hour = 0, minute = 0, second = 0 }: ITimeTracker) {
		this.taskName = taskName;
		this.hour = hour;
		this.minute = minute;
		this.second = second;

		TimeTracker.index++;
	}

	start(): void {
		if (this.isRunning) {
			return;
		}

		this.isRunning = true;
		this.timer = setInterval(() => {
			this.second = this.second + 1;

			if (this.second == 60) {
				this.second = 0;
				this.minute++;
			}
			if (this.minute == 60) {
				this.minute = 0;
				this.hour++;
			}
			if (this.hour == 24) {
				this.hour = 0;
			}
		}, 1000);
	}

	pause(): void {
		if (this.isRunning) {
			this.isRunning = false;
			clearInterval(this.timer);
		} else {
			this.start();
		}
	}

	changeTaskName(newName: string): void {
		this.taskName = newName;
	}

	stop(): void {
		clearInterval(this.timer);

		this.hour = 0;
		this.minute = 0;
		this.second = 0;

		this.isRunning = false;
	}

	getName() {
		return this.taskName;
	}

	getId() {
		return this.id;
	}

	getCurrentTime(): string {
		const stringedSecond = this.second < 10 ? `0${this.second}` : this.second;
		const stringedMinute = this.minute < 10 ? `0${this.minute}` : this.minute;
		const stringedHour = this.hour < 10 ? `0${this.hour}` : this.hour;
		return `${stringedHour}:${stringedMinute}:${stringedSecond}`;
	}
}
