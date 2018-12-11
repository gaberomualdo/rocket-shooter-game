var canvas = document.querySelector("canvas");
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetWidth;

var ctx = canvas.getContext("2d");

var rocket = {
  x: (canvas.width / 2) - 25,
  y: canvas.height - 75,
  health: 100,
  xv: 0
}
var enemy = {
  x: 25,
  y: 25,
  health: 100,
  xv: 1.5
}
var rocket_bullets = [];
var enemy_bullets = [];

var rocket_lost = false;
var enemy_lost = false;

var gameLoop = setInterval(function(){
  document.querySelector("div.enemy_health").setAttribute("style", "width: " + enemy.health + "%;");
  document.querySelector("div.rocket_health").setAttribute("style", "width: " + rocket.health + "%;");

  if(enemy.health == 0 && enemy_lost == false){
    enemy_lost = true;
    setTimeout(function(){
      alert("You Win :)");
      location.reload();
    },250);
  }
  if(rocket.health == 0 && rocket_lost == false){
    rocket_lost = true;
    setTimeout(function(){
      alert("You Lose :(");
      location.reload();
    },250);
  }

  ctx.fillStyle = "#f0f0f0";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(document.querySelector("div.images img.enemy"),enemy.x,enemy.y, 50, 50);
  ctx.drawImage(document.querySelector("div.images img.rocket"),rocket.x,rocket.y, 50, 50);

  rocket_bullets.forEach(function(bullet, bullet_index){
    if(bullet.show) {
      ctx.drawImage(document.querySelector("div.images img.rocket_bullets"),bullet.x,bullet.y, 40, 40);
    }

    var collisionX = ((bullet.x > enemy.x && bullet.x < enemy.x + 50) || (bullet.x + 40 > enemy.x && bullet.x + 40 < enemy.x + 50));
    var collisionY = ((bullet.y > enemy.y && bullet.y < enemy.y + 50) || (bullet.y + 40 > enemy.y && bullet.y + 40 < enemy.y + 50));
    if(collisionX && collisionY && bullet.show) {
      rocket_bullets[bullet_index].show = false;
      enemy.health -= 5;
    }

    bullet.y -= 1.5;
  });
  enemy_bullets.forEach(function(bullet, bullet_index){
    if(bullet.show) {
      ctx.drawImage(document.querySelector("div.images img.enemy_bullets"),bullet.x,bullet.y, 40, 40);
    }

    var collisionX = ((bullet.x > rocket.x && bullet.x < rocket.x + 50) || (bullet.x + 40 > rocket.x && bullet.x + 40 < rocket.x + 50));
    var collisionY = ((bullet.y > rocket.y && bullet.y < rocket.y + 50) || (bullet.y + 40 > rocket.y && bullet.y + 40 < rocket.y + 50));
    if(collisionX && collisionY && bullet.show) {
      enemy_bullets[bullet_index].show = false;
      rocket.health -= 5;
    }

    bullet.y += 1.5;
  });

  rocket.x += rocket.xv;
  if(rocket.x > canvas.width - 75) {
    rocket.x = canvas.width - 75;
  } else if(rocket.x < 25) {
    rocket.x = 25;
  }

  enemy.x += enemy.xv;
  if(enemy.x > canvas.width - 75 || enemy.x < 25) {
    enemy.xv = -enemy.xv;
  }
}, 1);
var enemyBulletLoop = setInterval(function(){
  enemy_bullets.push({
    x: enemy.x + 5,
    y: enemy.y,
    show: true
  });
},625);
document.onkeydown = function(e){
  switch (e.keyCode) {
    case 37:
      rocket.xv = -2;
      break;
    case 39:
      rocket.xv = 2;
      break;
    case 32:
      rocket_bullets.push({
        x: rocket.x + 5,
        y: rocket.y,
        show: true
      })
      break;
    default:
      console.log("Useless Key Down");
  }
}
document.onkeyup = function(e){
  if(e.keyCode == 37 || e.keyCode == 39){
    rocket.xv = 0;
  }else{
    console.log("Useless Key Up");
  }
}
