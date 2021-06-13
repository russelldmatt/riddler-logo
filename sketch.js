// At a high level, every time the user clicks we draw that points and
// then add it to two arrays, [to_reflect_horizontal] and
// [to_reflect_radian] which hold points that need to be reflected
// across the horizontal line and 1 radian line, respectively.

// Then, on each frame, we take one we take one point off the
// [to_reflect_horizontal] and [to_reflect_radian] arrays and reflect
// them across the horizontal and 1 radian line, respectively.
to_reflect_horizontal = [];
to_reflect_radian = [];

function setup() {
  createCanvas(640, 640);
  angleMode(RADIANS);
  strokeWeight(8);
  translate(320, 320);
  scale(1, -1);
  stroke("green");
  point(0, 0);
  // draw lines of symmetry
  strokeWeight(2);
  stroke("gray");
  dx = width / 2;
  line(-dx, 0, dx, 0);
  h = tan(1) * dx;
  line(-dx, -h, dx, h);
  // set stroke color for reflected points
  strokeWeight(5);
  stroke("black");
}

function myrotate([x, y], theta) {
  let x_ = x * cos(theta) - y * sin(theta);
  let y_ = x * sin(theta) + y * cos(theta);
  return [x_, y_];
}

function rotate_horizontal([x, y]) {
  return [x, -y];
}

function rotate_radian([x, y]) {
  [x, y] = myrotate([x, y], -1);
  [x, y] = myrotate([x, -y], 1);
  return [x, y];
}

function draw() {
  translate(width / 2, height / 2);
  scale(1, -1);
  if (to_reflect_horizontal.length > 0) {
    [x, y] = rotate_horizontal(to_reflect_horizontal.shift());
    point(x, y);
    to_reflect_radian.push([x, y]);
  }
  if (to_reflect_radian.length > 0) {
    [x, y] = to_reflect_radian.shift();
    [x, y] = rotate_radian([x, y]);
    point(x, y);
    to_reflect_horizontal.push([x, y]);
  }
}

function mouseClicked() {
  x = mouseX - width / 2;
  y = -(mouseY - height / 2);
  point(x, y);
  let p = [x, y];

  to_reflect_horizontal.push(p);
  to_reflect_radian.push(p);
}
