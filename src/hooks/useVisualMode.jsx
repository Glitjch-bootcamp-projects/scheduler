import { useState } from "react";

// tracks the history of actions depending on which mode the user is on
export default function useVisualMode(initial) {
	const [history, setHistory] = useState([initial]);

  // removes the latest mode, conditionally, but always adds a new mode
	const transition = function (newMode, replace = false) {
		const newHistory = [...history];
		if (replace) {
			newHistory.pop();
			newHistory.push(newMode);
			setHistory(newHistory);
			return;
		}
		newHistory.push(newMode);
		setHistory(newHistory);
	};

  // removes the latest mode, forcing user to previous mode
	const back = function () {
		if (history.length === 1) {
			return;
		}
		const newHistory = [...history];
		newHistory.pop();
		setHistory(newHistory);
	};

	const mode = history.slice(-1)[0];

	return { mode, transition, back };
}
