// import knight from '../images/knight.svg';

function Game() {
  const dom = {};
  const usedSquares = [0];
  const size = 8;

  function cacheDOM() {
    dom.squares = document.querySelectorAll('.board__square');
    dom.board = document.querySelector('.board');
  }

  function handleClick(e) {
    e.preventDefault();
    const targetIndex = +e.target.dataset.index;
    const lastIndex = usedSquares[usedSquares.length - 1];
    const col = lastIndex % size;
    const possibleIndices = [];

    if (usedSquares.includes(targetIndex)) { return; }

    if (lastIndex >= 8 && col < 6) {
      possibleIndices.push(lastIndex - 6);
    }
    if (lastIndex >= 10 && col > 1) {
      possibleIndices.push(lastIndex - 10);
    }
    if (lastIndex > 15 && col !== 7) {
      possibleIndices.push(lastIndex - 15);
    }
    if (lastIndex >= 17 && col !== 0) {
      possibleIndices.push(lastIndex - 17);
    }
    if (lastIndex <= 55 && col > 1) {
      possibleIndices.push(lastIndex + 6);
    }
    if (lastIndex <= 53 && col < 6) {
      possibleIndices.push(lastIndex + 10);
    }
    if (lastIndex <= 47 && col !== 0) {
      possibleIndices.push(lastIndex + 15);
    }
    if (lastIndex <= 46 && col !== 7) {
      possibleIndices.push(lastIndex + 17);
    }
    // @todo: check if there are any more moves
    if (possibleIndices.includes(targetIndex)) {
      usedSquares.push(targetIndex);
      dom.squares[lastIndex].innerHTML = '';
      // eslint-disable-next-line
      updateSquare(targetIndex);
    }
  }

  function bindEvents() {
    dom.board.addEventListener('click', handleClick);
  }

  function updateSquare(index) {
    dom.squares[index].classList.add('board__square--used');
    dom.squares[index].innerHTML = '<img src="/images/knight-white.svg" alt="" />';
  }

  function init() {
    cacheDOM();
    bindEvents();
    updateSquare(0);
  }

  return { init };
}

document.addEventListener('DOMContentLoaded', () => {
  const game = Game();
  game.init();
});
