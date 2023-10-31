function startGame() {
  const header = document.querySelector("h1");
  const nav = document.querySelector(".navigation");
  nav.classList.remove("inactive");
  header.innerHTML = "vim snake";
  let field = document.querySelector("#field");
  const rowsCounter = 44;
  let move_direction = "up";
  let start_line = 1;
  for (let i = 0; i < 1936; i++) {
    let newBlock = document.createElement("div");
    newBlock.classList.add("cube");
    field.append(newBlock);
  }
  let score = 0;
  let blocks = document.querySelectorAll(".cube");
  let head_index = 968 + 22;
  let snake_indexes = [968 + 22];
  let apple_index = 100;
  const score_block = document.querySelector("#score");
  score_block.parentElement.classList.remove("inactive");
  let result_block = document.querySelector(".result");
  score_block.classList.remove("inactive");
  result_block.classList.add("inactive");
  blocks[apple_index].classList.add("apple");
  document.addEventListener("keydown", (event) => {
    switch (event.code) {
      case "KeyH":
        if (move_direction != "right" && move_direction != "left") {
          move_direction = "left";
        }
        break;
      case "ArrowLeft":
        if (move_direction != "right" && move_direction != "left") {
          move_direction = "left";
        }
        break;
      case "KeyJ":
        if (move_direction != "up" && move_direction != "down") {
          move_direction = "down";
        }
        break;
      case "ArrowDown":
        if (move_direction != "up" && move_direction != "down") {
          move_direction = "down";
        }
        break;
      case "KeyK":
        if (move_direction != "up" && move_direction != "down") {
          move_direction = "up";
        }
        break;
      case "ArrowUp":
        if (move_direction != "up" && move_direction != "down") {
          move_direction = "up";
        }
        break;
      case "KeyL":
        if (move_direction != "right" && move_direction != "left") {
          move_direction = "right";
        }
        break;
      case "ArrowRight":
        if (move_direction != "right" && move_direction != "left") {
          move_direction = "right";
        }
        break;
      default:
        console.log(event.code);
        break;
    }
  });
  head_index = snake_indexes[snake_indexes.length - 1];
  let prev_line, current_line, prev_col;
  const timer = setInterval(game, 100);
  function game() {
    switch (move_direction) {
      case "right":
        prev_line = Math.floor(head_index / rowsCounter);
        current_line = Math.floor((head_index + 1) / rowsCounter);
        if (prev_line !== current_line) {
          head_index = prev_line * 44;
        } else {
          head_index++;
        }
        break;
      case "left":
        prev_line = Math.floor(head_index / rowsCounter);
        current_line = Math.floor((head_index - 1) / rowsCounter);
        if (prev_line !== current_line) {
          head_index = (prev_line + 1) * 44 - 1;
        } else {
          head_index--;
        }
        break;
      case "up":
        prev_col = head_index % 44;
        head_index -= 44;
        if (head_index < 0) {
          head_index = blocks.length - 44 + prev_col;
        }
        break;
      case "down":
        prev_col = head_index % 44;
        head_index += 44;
        if (head_index >= blocks.length) {
          head_index = prev_col;
        }
        break;
    }
    if (snake_indexes.indexOf(head_index) !== -1) {
      stopGame();
    } else {
      snake_indexes.push(head_index);
      if (blocks[head_index].classList.contains("apple")) {
        blocks[head_index].classList.remove("apple");
        blocks[head_index].classList.add("snake");
        score++;
        score_block.innerHTML = score.toString();
        generateApple();
      } else {
        blocks[snake_indexes[0]].classList.remove("snake");
        snake_indexes.splice(0, 1);
        blocks[snake_indexes[snake_indexes.length - 1]].classList.add("snake");
      }
    }
  }
  function generateApple() {
    let apple_index;
    do {
      apple_index = Math.floor((Math.random() * 10000) % blocks.length);
    } while (
      apple_index === undefined &&
      snake_indexes.indexOf(apple_index) !== -1
    );

    blocks[apple_index].classList.add("apple");
  }
  function stopGame() {
    field.innerHTML = "";
    const header = document.querySelector("h1");
    header.innerHTML = "Game over";
    clearInterval(timer);
    score_block.innerHTML = "0";
    score_block.parentElement.classList.add("inactive");
    result_block.classList.remove("inactive");
    let span = result_block.querySelector("#result");
    span.innerHTML = score.toString();
    const restart_button = document.querySelector("button");
    restart_button.addEventListener("click", () => startGame());
    nav.classList.add("inactive");
  }
}
startGame();
