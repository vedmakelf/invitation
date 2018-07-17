onload = function(params) {
  $("#invitation-more-button").click(function() {
    $(".invitation-more").slideToggle(600);
    $("html, body").animate(
      { scrollTop: $(".invitation-more").offset().top },
      600,
      function() {}
    );
  });

  $("#checkbox").change(() => {
    if ($("#checkbox").attr("checked")) {
      $("#plusOne").css("display", "flex");
    } else {
      $("#plusOne").css("display", "none");
    }
  });

  $(function() {
    var height = 1.7;
    $(".galleria").height($(".galleria").width() / height);
    $(window).resize(function() {
      $(".galleria").height($(".galleria").width() / height);
    });
  });

  (function galleria(params) {
    var data = [
      { image: "photo/maria_latonina-1027.jpg" },
      { image: "photo/maria_latonina-1058.jpg" },
      { image: "photo/maria_latonina-1066.jpg" }
    ];
    Galleria.loadTheme("../galleria/themes/classic/galleria.classic.min.js");
    Galleria.run(".galleria", {
      // autoplay: 5000
      // clicknext: true
      dataSource: data
    });
  })();
};

(function initFirebase() {
  var config = {
    apiKey: "AIzaSyBpkzjJMdl_DvAGltY7fn-FkFAcveOLiUA",
    authDomain: "landingpage-3b330.firebaseapp.com",
    databaseURL: "https://landingpage-3b330.firebaseio.com",
    projectId: "landingpage-3b330",
    storageBucket: "landingpage-3b330.appspot.com",
    messagingSenderId: "781723110833"
  };
  firebase.initializeApp(config);
})();

function confirm(data) {
  var $that = $(data);
  var formData = new FormData($that.get(0));
  var data = {
    name: formData.get("name"),
    surname: formData.get("surname"),
    email: formData.get("email"),
    comment: formData.get("comment"),
    plusOne:
      formData.get("checkbox") == null
        ? false
        : {
            name: formData.get("plusOneName"),
            surname: formData.get("plusOneSurname")
          }
  };
  var insertData = firebase
    .database()
    .ref("/guests")
    .push(data);
  $that.html(
    '<p style="color: white; text-align: center; width: 100%">Подтверждение отправлено</p>'
  );
}

// function test() {
//   var postData = {
//     author: "asdas",
//     uid: "asdasd"
//   };
//   //   var newPostKey = firebase
//   //     .database()
//   //     .ref()
//   //     .child("/guests")
//   //     .push().key;
//   //   firebase
//   //     .database()
//   //     .ref("guests/X1nH66Nb4L8FTQhRXKSf")
//   //     .set({
//   //       username: "asdasd"
//   //     });
//   var insertData = firebase
//     .database()
//     .ref("/guests")
//     .push(postData);
//   console.log(insertData);
// }

// function lol(params) {
//   //"/guests/X1nH66Nb4L8FTQhRXKSf/test"
//   var starCountRef = firebase.database().ref("guests/");
//   starCountRef.on("value", function(snapshot) {
//     console.log(snapshot.val());
//   });
// }
