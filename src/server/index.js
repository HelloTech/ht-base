import Express from "express"
import handleRender from "./handle-render"
let index = process.env.NODE_ENV === 'production' ? './build/public/index.html' : './dev/build/public/index.html';

const app = new Express();
console.log(process.env.NODE_ENV);
console.log(process.env.HOST);
console.log(process.env.PORT);
app.use('/assets', Express.static(process.env.NODE_ENV === 'production' ? 'build/public' : 'dev/build'));
// app.set("view engine", "ejs");
// app.engine('.ejs', ejs);
app.get('*', handleRender);
// app.get('*', (req, res) => {
//   res.sendFile('/Users/pdiniz/work/ht-base/dev/build/public/index.html')
// });

app.listen(process.env.PORT, 'localhost', function (err) {
  if (err){
    console.log(err);
  }
  console.log(`\n==> 💻  App-Server(${process.env.NODE_ENV}) listening at ${process.env.HOST}:${process.env.PORT}`)
});
