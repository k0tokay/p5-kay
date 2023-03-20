let t = 0;
let steps = 0;
let x = [0,0];
let v = [0,0];
let size = [400,400];
function setup() {
  createCanvas(size[0], size[1]);
  background(255);
  stroke(0);
  noFill();
}
//let roots = [[12/13,-5/13],[0,1],[-3/5,-4/5]];
//let roots = [[12/13,-5/13],[0,1]];
let roots = [[0,0],[1,0],[0,1]];
// 複素変数のn次方程式でニュートン法をやる
let f = x => cm(...roots.map(ri => sub(x, ri)));
let df = x => con(...roots.map(ri => cv(f(x), sub(x, ri))));
let g = x => (len(df(x))>1e-1 ? sub(x, cv(f(x), df(x))) : con(x, 1e-1, [random(-1,1),random(-1,1)]));
function rep(f,n,x) {
  if (n === 1) {
    return f(x);
  } else {
    return f(rep(f,n-1,x));
  }
}
let g_noise = x => con(rep(g,1,x), 1*random(0,1)**3, [random(-1,1),random(-1,1)]);

function draw() {
  v = rep(g_noise,1,v);
  let xm = x;
  x = con(x,3,v);
  line(xm[0], xm[1], x[0], x[1]);
  for (let i=0; i<2; i++) {
    x[i] = (x[i]+size[i])%size[i];
  }
  steps++;
}
