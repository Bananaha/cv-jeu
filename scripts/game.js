function Game () {
  var canvas = document.getElementById('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - 40;
  var ctx = canvas.getContext('2d');
  var fps = 40;
  var fpsInterval = 1000/fps;
  var lastDrawDate = Date.now();
  var canvasHeight = canvas.height;
  var canvasWidth = canvas.width;
  var allAmmos;
  var ennemies;
  var bosses;
  var player;
  var ennemiesCounter;
  var gameStage;
  var createBoss;
  var newScore;
  var ennemiesByStage = 10;

  var BOSS_MAXY = canvasWidth;
  var SPEED = 20;

  var background = new Background({
    canvasWidth: canvasWidth,
    canvasHeight: canvasHeight,
    context: ctx,
  });

  this.getSize = function () {
    return {
      canvasHeight: canvasHeight,
      canvasWidth: canvasWidth
    }
  };
  // Affiche le score du joueur
  function drawText (x, y, text, fontSize, color) {
    ctx.font = fontSize + 'px Satisfy';
    ctx.textAlign = 'left';
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
  };
  // Affiche les vies du joueur
  function drawLives (source, size) {
    var playerLives = 3;
    for (var i = 0; i < playerLives; i++) {
      ctx.drawImage(gameImages.heartEmpty.src, 30 * i + 30, 30, size, size);
      if(player.life > i) {
        ctx.drawImage(gameImages.heartFull.src, 30 * i + 30, 30, size, size);
      }
    };
  };

  // Gestion de la collision
  function checkCollision (element1, element2) {
    var distanceX = element1.x - element2.x;
    var distanceY = element1.y - element2.y;
    var distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    return distance <= element1.radius + element2.radius;
  }
  function handleCollision (checkedElement, elements) {
    elements.forEach(function (element) {
      var isColliding = checkCollision(element, checkedElement);
      if (isColliding) {
        element.removeLife(checkedElement);
        checkedElement.removeLife(element);
      }
    });
  };
  function handleListCollision (elements1, elements2) {
    elements1.forEach(function (element) {
      handleCollision(element, elements2);
    })
  };
  // Générer le joueur
  function createPlayer () {
    return new Player({
      context: ctx,
      canvasHeight: canvasHeight,
      canvasWidth: canvasWidth,
      speed: SPEED / 2,
      allAmmos: allAmmos,
      launchAmmo: launchAmmo,
      image: gameImages.unicorn
    });
  };

  // Générer des ennemis
  function createEnnemies (date, speedCoeff) {
    // si aucun ennemie n'a été créé, créer un ennemi sinon comparer la date de la dernière frame à la date de création du dernier ennemi pour en générer un nouveau
    if (ennemies.length === 0 || date - ennemies[ennemies.length - 1].creationDate > 800) {
      ennemiesCounter++;
      ennemies.push(new Ennemy(speedCoeff, {
        ctx: ctx,
        canvasHeight: canvasHeight,
        canvasWidth: canvasWidth,
        speed: SPEED,
        newScore: newScore,
        gameStage: gameStage
      }));
    }
  };
  // Générateur de munitions
  function launchAmmo (array, x, y, direction, date, delay, shooter) {
    if (!date || Date.now() - date >= delay) {
      date = Date.now();
      array.push(new Ammo(x, y, direction, {
        ctx: ctx,
        speed: SPEED,
        shotCircle: gameImages.shotCircle.src,
        shotRainbow: gameImages.shotRainbow.src,
        parent: shooter
      }));
    }
    return date;
  };
  // Vider les tableaux ennemis, ammos & bosses des objets hors canvas ou avec life === 0
  function withoutDeads (array) {
    return array.filter(function (element) {
      return element.life > 0;
    });
  };

  function draw () {
    var currentDate = Date.now();

    // Gestion des fps
    if (hasRequestAnimationFrame && currentDate - lastDrawDate < fpsInterval) {
      requestAnimation(draw);
      return
    }
    
    lastDrawDate = currentDate;
    
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    // Rendu du Background
    background.render(currentDate);

    //Si le jeu n'est pas lancé, relancer draw
    if (!started) {
      requestAnimation(draw);
      return
    }
    // Gérer la collision player vs Ennemis
    handleCollision(player, ennemies);
    // Gérer la collision player vs ammo ennemis
    handleCollision(player, allAmmos.boss);
    // Gérer la collision munitions vs Ennemies
    handleListCollision(allAmmos.player, ennemies);
    // Gérer la collission munitions vs Boss
    if (bosses.length > 0) {
      handleListCollision(allAmmos.player, bosses);
    };
    // les munitions et ennemies disparaissent dès qu'ils quittent le canvas ou lorsqu'il y a collision.
    allAmmos.player = withoutDeads(allAmmos.player);
    ennemies = withoutDeads(ennemies);
    allAmmos.boss = withoutDeads(allAmmos.boss);
    // // le boss disparait dès que sa vie est à 0 et les ennemies sont créés à nouveau.
    bosses = withoutDeads(bosses);
    // Tant que le joueur a au moins 1 vie, le joueur et les munitions sont générées
    if (player.life >= 1) {
      allAmmos.player.forEach(function (ammo) {
        ammo.render();
      });
      player.render();
    } else {
      // dès que le joueur est éliminé, les munitions sont supprimées.
      allAmmos.player = [];
    }
    // le boss apparait après x ennemis générés
    if (ennemiesCounter % ennemiesByStage === 0 && ennemiesCounter > 0) {
      // on fait apparaitre le boss
      if (createBoss === false) {
        var shotSpeed = 400;
        if (ennemiesCounter >= 20) {
          shotSpeed = 150;
        } else if (ennemiesCounter >= 15) {
          shotSpeed = 200;
        } else if (ennemiesCounter >= 10) {
          shotSpeed = 300;
        }
        bosses.push(new Boss({
          shotSpeed: shotSpeed,
          rank: gameStage,
          onDead: function(bossLevel) {
            // Message de fin et parties débloquées générées par la mort des boss
            switch (bossLevel) {
              case 1:
                partsUnlocked.push(skillsPart);
                result = textMessage.lvl1.endMessage;
                showNotification(textMessage.lvl1.notificationText);
                break;
              case 2:
                partsUnlocked.push(degreesPart);
                result = textMessage.lvl2.endMessage;
                showNotification(textMessage.lvl2.notificationText);
                break;
              case 3:
                partsUnlocked.push(experiencesPart);
                result = textMessage.lvl3.endMessage;
                showNotification(textMessage.lvl3.notificationText);
                break;
              case 4:
                partsUnlocked.push(likesPart);
                result = textMessage.lvl4.endMessage;
                showNotification(textMessage.lvl4.notificationText);
                break;
              default:
                result = textMessage.lvl0.endMessage;
                break;
            }
            gameStage++;
          },
          ctx: ctx,
          canvasHeight: canvasHeight,
          canvasWidth: canvasWidth,
          speed: SPEED,
          BOSS_MAXY: BOSS_MAXY,
          allAmmos: allAmmos,
          launchAmmo: launchAmmo,
          newScore: newScore
        }));
        createBoss = true;
      }
    }
 
    // Lorsque le joueur n'a plus de vie ou que le jeu est terminé, permettre l'accès au cv ou au redemarrage du jeu
    if (player.life <= 0 || (gameStage === 5 && bosses.length === 0)) {
      showEndModal({
        canvasWidth: canvasWidth,
        canvasHeight: canvasHeight,
        newScore: newScore,
        text: result
      });
      started = false;
      requestAnimation(draw);
      return;
    }

    // dès que le palier est atteint, on arrête la production d'ennemis mais on continue le rendu des ennemis déjà générés.
    if (bosses.length === 0) {
      createEnnemies(lastDrawDate, gameStage);
      createBoss = false;
    } else {
      bosses.forEach(function (boss) {
        boss.render();
      });
    }
    allAmmos.boss.forEach(function (ammo) {
      ammo.render();
    });
    ennemies.forEach(function (ennemy) {
      ennemy.render();
    });

    // Affiche le score et la nombre de vies de la partie en cours
    drawText(30, canvasHeight - 30, newScore.score, 40, 'white');
    drawLives(gameImages.heartFull, 20);
    requestAnimation(draw);
  };
  // réinitialisation des variables du jeu
  this.start = function () {
    allAmmos = {
      player: [],
      boss: []
    };
    ennemies = [];
    bosses = [];
    ennemiesCounter = 0;

    gameStage = 1;
    createBoss = undefined;

    index = 0;
    partsUnlocked = [];
    newScore = {
      score: 0
    };
    player = createPlayer();
    started = true;
  };

  draw();
};
