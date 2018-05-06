const myObject = {
  red: "fsaankl",
  blue: "vvvdsv"
};
const colors = {
  red: "vv",
  blue: "fvcsav"
};
// var newObject = Object.keys(myObject).map(color => {
//   const temp = {
//     color,
//     dark: {
//       baseColor: "fshafkaj",
//       fknas: "fsf",
//       primary: colors[color]
//     },
//     light: {
//       fsafajlk: "fsafa",
//       safsafa: "fsafasf",
//       primary: colors[color]
//     }
//   };

//   return temp;
// });

var newObject = Object.keys(myObject).reduce(function(previous, current) {
  // console.log("original prev", previous);
  // previous[current] = myObject[current];
  // console.log("prev", previous);
  // console.log("current", current);

  const temp = {
    [current]: "nice"
  };
  const gemp = Object.assign(previous, temp);
  return gemp;
}, {});

console.log(newObject);
// => { 'a': 1, 'b': 4, 'c': 9 }

console.log(myObject);
// => { 'a': 1, 'b': 2, 'c': 3 }

console.log("my object", myObject);
console.log("new object", newObject);
