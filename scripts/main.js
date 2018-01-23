requirejs(["jquery"], function($) {
  const $target = $('#target')

  const hello1 = () => console.log("hello");
  const hello2 = () => console.log("hello");

  $target.on("click", hello1)
  $target.on("click", hello2)
  // $target.off("click", hello1)
  // $target.off("click", hello2)
})