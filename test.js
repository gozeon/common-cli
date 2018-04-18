let a = new Map();
a.set('a', 3);
a.set('b', 4);
a.set('c', 5);

a.forEach((value, key, map) =>{
  console.log(value);
});
