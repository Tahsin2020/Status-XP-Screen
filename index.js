import("https://cdn.rawgit.com/davidshimjs/qrcodejs/gh-pages/qrcode.min.js");

var list = "";

var Recieved =
  "fumojediUBC,2023W2,BIOL,BIOL204,201&jediUBC,2023W2,COEC,COEC294,001&jediUBC,2023W2,ECON,ECON311,001&jediUBC,2023W2,PSYC,PSYC322,006&";

var courses = [];

if (Recieved.includes("fumo")) {
  list = Recieved.replace("fumo", "");

  courses = list.split("&");

  for (let i = 0; i < courses.length; i++) {
    courses[i] = courses[i].replace("jedi", "");
  }
}

var qrcode = courses.join("\n");

console.log(qrcode);
console.log(qrcode.length);

new QRCode(document.getElementById("qrcode"), qrcode);

var keys = [];
var array = [];
var unique_term_codes = new Set([]);

fetch("./data.txt")
  .then(function (res) {
    return res.text();
  })
  .then(function (data) {
    var rows = data.split("\n");
    keys = rows[0].split("\t");

    array.length = rows.length - 1;

    for (let index = 1; index < rows.length; index++) {
      array[index - 1] = rows[index].split("\t");
    }

    console.log(array);

    for (let index = 0; index < array.length; index++) {
      var row = array[index];
      // My code assumes that the term code is the 3rd item in every row.
      var term_code = row[2];
      unique_term_codes.add(term_code);
    }

    var Latest_Term_Code = Array.from(unique_term_codes).sort().reverse()[0];

    console.log(Latest_Term_Code);
  });

fetch("./data.json")
  .then((response) => response.json())
  .then((json) => {
    for (let index = 0; index < courses.length; index++) {
      var course = courses[index];
      if (course == "") continue;
      var keys = course.split(",");
      console.log(json[keys[0]][keys[2]][[keys[3]]][[keys[4]]]);
    }
    console.log(json);
  });
