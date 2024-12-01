import { useEffect, useState } from "react";

export default function App() {
    const [timeLeft, setTimeLeft] = useState(2400); // 40 minutes in seconds
    const [isRunning, setIsRunning] = useState(false); // Timer starts only when set to true
    const [timerEnded, setTimerEnded] = useState(false); // Tracks if timer hit 0

    useEffect(() => {
        let timer: number; // Use `number` for the timer

        if (isRunning) {
            timer = window.setInterval(() => {
                setTimeLeft((prevTime) => {
                    if (prevTime <= 1) {
                        clearInterval(timer);
                        setTimerEnded(true);
                        setIsRunning(false);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }

        return () => clearInterval(timer); // Cleanup interval on component unmount
    }, [isRunning]);

    // Format the time as HH:MM:SS
    const formatTime = (seconds: number) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs.toString().padStart(2, "0")}:${mins
            .toString()
            .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    return (
        <>
            <div style={styles.container}>
                {!timerEnded ? (
                    <>
                        <div style={styles.timerContainer}>
                            <p
                                style={styles.title}
                                onClick={() => {
                                    if (!isRunning) setIsRunning(true);
                                    else setTimeLeft((prev) => prev + 600); // Add 10 minutes
                                }}
                            >
                                Time until oxygen is depleted
                            </p>
                            <div
                                style={styles.timer}
                                onClick={() => setIsRunning((prev) => !prev)}
                            >
                                {formatTime(timeLeft)}
                            </div>
                        </div>
                    </>
                ) : (
                    <p style={styles.lostMessage}>Oxygen successfully extracted</p>
                )}
            </div>
        </>
    );
}

// Styles
const styles: { [key: string]: React.CSSProperties } = {
    container: {
        fontFamily: "Arial, sans-serif",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Full viewport height
        width: "100vw",
        textAlign: "center" as const, // Fix: Explicitly declare `textAlign` value
    },
    timerContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
    },
    title: {
        fontSize: "48px",
        fontWeight: "bold",
        marginBottom: "10px",
        cursor: "pointer", // Indicate clickable behavior
    },
    timer: {
        fontSize: "72px",
        fontWeight: "bold",
        margin: "10px 0",
        cursor: "pointer", // Indicate clickable behavior
    },
    lostMessage: {
        fontSize: "48px",
        fontWeight: "bold",
        color: "red",
    },
};