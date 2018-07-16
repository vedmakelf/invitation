onload = function(params) {
  var starCountRef = firebase.database().ref("guests/");
  starCountRef.on("value", function(snapshot) {
    var obj = snapshot.val();
    var data = {
      stooges: []
    };
    var count = 0;
    for (var index in obj) {
      obj[index].count = ++count;
      obj[index].check = obj[index].plusOne ? "+" : "-";
      data.stooges.push(obj[index]);
    }
    template = `
    <table border="1" width="100%" cellpadding="5" id="guestTable">
        <tr class="cap">
            <td rowspan="2">№</td>
            <td rowspan="2">Имя</td>
            <td rowspan="2">Фамилия</td>
            <td rowspan="2">email</td>
            <td rowspan="2">Коментарий</td>
            <td colspan="3">+1</td>
        </tr>
        <tr class="cap">
            <td>+1</td>
            <td>Имя</td>
            <td>Фамилия</td>
        </tr>
        {{#stooges}}
          <tr>
            <td>{{count}}</td>
            <td>{{ name }}</td>
            <td>{{ surname }}</td>
            <td>{{ email }}</td>
            <td>{{ comment }}</td>
            <td>{{ check }}</td>
            <td>{{ plusOneName }}</td>
            <td>{{ plusOneSurname }}</td>
          </tr >
        {{/stooges}}
      </table>`;
    var output = Mustache.render(template, data);
    document.getElementById("table").innerHTML = output;
  });
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
