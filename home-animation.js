// Keep the movement of the original sne.js: one figure, a slow fall and a
// small sine-wave swing. Its horizontal starting point changes each fall.
const fallingFigure = document.querySelector(".dunst-dims");
const homeStage = document.querySelector(".archive-content, .home-article");

if (fallingFigure && homeStage) {
  let baseX = 0;
  let y = 0;
  let phase = 0;
  const amplitude = Math.random() * 20;
  let phaseStep = 0;
  let fallStep = 0;

  function startFall(resetTop = false) {
    const stage = homeStage.getBoundingClientRect();
    const stageLeft = Math.max(0, stage.left + 20);
    const maxX = Math.max(stageLeft, Math.min(innerWidth - fallingFigure.offsetWidth, stage.right - fallingFigure.offsetWidth - 20));
    baseX = stageLeft + amplitude + Math.random() * Math.max(0, maxX - stageLeft - amplitude * 2);
    phaseStep = 0.02 + Math.random() / 10;
    fallStep = 0.7 + Math.random();
    if (resetTop) y = 0;
  }

  function moveFigure() {
    y += fallStep;
    if (y > innerHeight - 50) startFall(true);
    phase += phaseStep;
    fallingFigure.style.left = `${baseX + amplitude * Math.sin(phase)}px`;
    fallingFigure.style.top = `${y}px`;
  }

  startFall();
  moveFigure();
  setInterval(moveFigure, 40);
  addEventListener("resize", () => startFall());
}
