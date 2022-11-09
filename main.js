var posts = [
  { name: "Aaron", text: "I need coffee", upvotes: 0, editing: false },
];

var createPost = function (name, text) {
  posts.push({
    name: name,
    text: text,
    upvotes: 0,
    editing: false,
  });

  renderPosts();
};

$(".posts").on("click", ".upvote", function (e) {
  console.log(e.currentTarget);

  var index = $(e.currentTarget).closest(".post").index();

  posts[index].upvotes += 1;

  posts.sort((a, b) => b.upvotes - a.upvotes);

  renderPosts();
});

$(".posts").on("blur", ".edit", function (e) {
  var index = $(e.currentTarget).closest(".post").index();
  var newText = $(e.currentTarget).val();

  posts[index].text = newText;
  posts[index].editing = false;

  renderPosts();
});

// a keypress event fires each time the user presses a key
$(".posts").on("keypress", ".edit", function (e) {
  // each key on the keyboard has a code - 13 is for the enter key
  if (e.keyCode === 13) {
    var index = $(e.currentTarget).closest(".post").index();
    var newText = $(e.currentTarget).val();

    posts[index].text = newText;
    posts[index].editing = false;

    renderPosts();
  }
});

let renderPosts = function () {
  $(".posts").empty();

  for (var i = 0; i < posts.length; i++) {
    var post = posts[i];

    $(".posts").append(Handlebars.compile($("#post-template").html())(post));
  }
};

$(".add-post").on("click", function () {
  var name = $("#post-name").val();
  var text = $("#post-text").val();

  $("#post-name").val("");
  $("#post-text").val("");

  createPost(name, text);
});

$(".posts").on("dblclick", ".post-text", function (e) {
  var index = $(e.currentTarget).closest(".post").index();

  posts[index].editing = true;

  renderPosts();
});
renderPosts();
