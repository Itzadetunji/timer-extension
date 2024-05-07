chrome.alarms.create({
	periodInMinutes: 1 / 60,
});

chrome.alarms.onAlarm.addListener((alarm) => {
	chrome.storage.local.get(["timer", "isRunning"], (res) => {
		const time = res.timer ?? 0;
		const isRunning = res.isRunning ?? true;
    console.log("background")
		if (!isRunning) return;
		chrome.storage.local.set({ timer: time + 1 });
		chrome.action.setBadgeText({
			text: `${time + 1}`,
		});

		chrome.storage.sync.get(["notificationTime"], (res) => {
			const notificationTime = res.notificationTime ?? 1000;
			if (!(time % notificationTime))
				self.registration.showNotification("Chrome Timer Extension", {
					body: `${notificationTime} second has passed!`,
					icon: "icon.png",
				});
		});
	});
});
