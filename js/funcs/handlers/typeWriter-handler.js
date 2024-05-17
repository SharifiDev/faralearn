const typewriterHandler = () => {
  let textElem = document.querySelector("#random-text");
  let typeSecond = 1800;
  var typewriter = new Typewriter(textElem, {
    loop: true,
    delay: 75,
  });

  typewriter
    .typeString("دوره آموزشی")
    .pauseFor(typeSecond)
    .deleteAll()
    .typeString("محتوای آموزشی")
    .pauseFor(typeSecond)
    .deleteAll()
    .typeString("دوره برنامه نویسی")
    .pauseFor(typeSecond)
    .deleteAll()
    .typeString("محتوای برنامه نویسی")
    .pauseFor(typeSecond)
    .start();

  console.log("typewriter handler runed");
};

export {typewriterHandler}
