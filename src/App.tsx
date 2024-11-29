import { useEffect, useState } from "react";

export default function App() {
    const [timeLeft, setTimeLeft] = useState(3600); // 3600 seconds = 1 hour
    const [isRunning, setIsRunning] = useState(false); // Timer starts only when set to true
    const [timerEnded, setTimerEnded] = useState(false); // Tracks if timer hit 0

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (isRunning) {
            timer = setInterval(() => {
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
                            <p style={styles.title}>Time until oxygen is depleted</p>
                            <div style={styles.timer}>{formatTime(timeLeft)}</div>
                        </div>
                    </>
                ) : (
                    <p style={styles.lostMessage}>You lost</p>
                )}
            </div>
            <div style={styles.buttonContainer}>
                {!isRunning && (
                    <button style={styles.button} onClick={() => setIsRunning(true)}>
                        Start
                    </button>
                )}
                {isRunning && (
                    <button
                        style={styles.button}
                        onClick={() => setTimeLeft((prev) => prev + 900)}
                    >
                        Release an oxygen tank
                    </button>
                )}
            </div></>
            );
            }

            // Styles
            const styles = {
            container: {
            fontFamily: "Arial, sans-serif",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh", // Full viewport height
            width: "100vw",
            textAlign: "center",
        },
            timerContainer: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100vw"
        },
            title: {
            fontSize: "48px",
            fontWeight: "bold",
            marginBottom: "10px",
        },
            timer: {
            fontSize: "72px",
            fontWeight: "bold",
            margin: "10px 0",
        },
            buttonContainer: {
            marginTop: "20vh", // Pushes the buttons out of the initial viewport
        },
            button: {
            padding: "10px 20px",
            fontSize: "16px",
            margin: "10px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#007BFF",
            color: "white",
            cursor: "pointer",
            transition: "background-color 0.3s",
        },
            buttonHover: {
            backgroundColor: "#0056b3",
        },
            lostMessage: {
            fontSize: "24px",
            fontWeight: "bold",
            color: "red",
        },
        };