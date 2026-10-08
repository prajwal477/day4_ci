import { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, name: "Install dependencies", status: "Passed" },
    { id: 2, name: "Run ESLint", status: "Passed" },
    { id: 3, name: "Run unit tests", status: "Passed" },
    { id: 4, name: "Create production build", status: "Pending" },
  ]);

  const [newTask, setNewTask] = useState("");

  const completedTasks = tasks.filter(
    (task) => task.status === "Passed",
  ).length;

  const addTask = (event) => {
    event.preventDefault();

    if (!newTask.trim()) {
      return;
    }

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        name: newTask,
        status: "Pending",
      },
    ]);

    setNewTask("");
  };

  const runPipeline = () => {
    setTasks((currentTasks) =>
      currentTasks.map((task) => ({
        ...task,
        status: "Passed",
      })),
    );
  };

  return (
    <div className="app">
      <header className="header">
        <div>
          <p className="eyebrow">DEVOPS / CI</p>
          <h1>CI Pipeline completed</h1>
          <p className="subtitle">
            Demo React application for Continuous Integration testing.
          </p>
        </div>

        <div className="build-status">
          <span className="status-dot"></span>
          Build Passing
        </div>
      </header>

      <main className="container">
        <section className="stats">
          <div className="stat-card">
            <span>Total Checks</span>
            <strong>{tasks.length}</strong>
          </div>

          <div className="stat-card success">
            <span>Passed</span>
            <strong>{completedTasks}</strong>
          </div>

          <div className="stat-card warning">
            <span>Pending</span>
            <strong>{tasks.length - completedTasks}</strong>
          </div>

          <div className="stat-card">
            <span>Success Rate</span>
            <strong>
              {tasks.length
                ? Math.round((completedTasks / tasks.length) * 100)
                : 0}
              %
            </strong>
          </div>
        </section>

        <section className="content-grid">
          <div className="card">
            <div className="card-header">
              <div>
                <h2>Pipeline Checks</h2>
                <p>Steps executed during CI.</p>
              </div>

              <button className="primary-button" onClick={runPipeline}>
                Run Pipeline
              </button>
            </div>

            <div className="task-list">
              {tasks.map((task) => (
                <div className="task" key={task.id}>
                  <div className="task-info">
                    <span className="check-icon">
                      {task.status === "Passed" ? "✓" : "○"}
                    </span>

                    <span>{task.name}</span>
                  </div>

                  <span
                    className={`task-status ${
                      task.status === "Passed" ? "passed" : "pending"
                    }`}
                  >
                    {task.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h2>Add CI Check</h2>
            <p className="card-description">
              Add another step to your demo pipeline.
            </p>

            <form onSubmit={addTask}>
              <input
                type="text"
                placeholder="e.g. Run integration tests"
                value={newTask}
                onChange={(event) => setNewTask(event.target.value)}
              />

              <button className="primary-button" type="submit">
                Add Check
              </button>
            </form>

            <div className="info-box">
              <strong>Why this is useful for CI</strong>
              <p>
                Your CI pipeline can automatically install dependencies, lint
                this application, run tests, and create a production build
                whenever code is pushed.
              </p>
            </div>
          </div>
        </section>

        <section className="card pipeline-card">
          <div>
            <p className="eyebrow">LATEST PIPELINE</p>
            <h2>main branch</h2>
          </div>

          <div className="pipeline-info">
            <div>
              <span>Commit</span>
              <strong>#demo-001</strong>
            </div>

            <div>
              <span>Environment</span>
              <strong>Production</strong>
            </div>

            <div>
              <span>Duration</span>
              <strong>1m 24s</strong>
            </div>

            <div>
              <span>Status</span>
              <strong className="green-text">✓ Passed</strong>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
