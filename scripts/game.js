function Game () {
  var canvas = document.getElementById('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - 80;
  var ctx = canvas.getContext('2d');

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
  var started = false;
  var result = textMessage.lvl0;

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
    ctx.font = fontSize + 'px Roboto';
    ctx.textAlign = 'left';
    ctx.fillStyle = colors.text;
    ctx.fillText(text, x, y);
  };
  // Affiche les vies du joueur
  function drawLives (source, size) {
    for (var i = 0; i < player.life; i++) {
      ctx.drawImage(gameImages.heartFull, 30 * i + 10, 45, size, size);
    };
  };

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
      image: IMG.unicorn
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
        random: random,
        newScore: newScore,
        image: {
          ennemyBlue: IMG.ennemyBlue,
          ennemyPink: IMG.ennemyPink,
          ennemyBrown: IMG.ennemyBrown,
          ennemyYellow: IMG.ennemyYellow
        },
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
        shotCircle: IMG.shotCircle,
        shotRainbow: IMG.shotRainbow,
        parent: shooter
      }));
    }
    return date;
  };
  // Vider les tableaux ennemis, ammos & bosses des objets hors canvas ou avec life === 0
  function withoutDeads (array) {
    return array.filter(function (element) {
      return element.x <= canvasWidth + element.radius && element.x >= -element.radius && element.life > 0;
    });
  };

  function draw () {
    var lastFrameDate = Date.now();
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    background.render();
    if (!started) {
      window.requestAnimationFrame(draw);
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
    if (ennemiesCounter === 5 || ennemiesCounter === 10 || ennemiesCounter === 15 || ennemiesCounter === 20) {
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
          onDead(gameStage) {
            switch (gameStage) {
              case 1:
                partsUnlocked.push(skillsPart);
                result = textMessage.lvl1;
                break;
              case 2:
                partsUnlocked.push(degreesPart);
                result = textMessage.lvl2;
                break;
              case 3:
                partsUnlocked.push(experiencesPart);
                result = textMessage.lvl3;
                break;
              case 4:
                partsUnlocked.push(likesPart);
                result = textMessage.lvl4;
                break;
              default:
                result = textMessage.lvl0;
                break;
            }
          },
          ctx: ctx,
          canvasHeight: canvasHeight,
          canvasWidth: canvasWidth,
          speed: SPEED,
          BOSS_MAXY: BOSS_MAXY,
          allAmmos: allAmmos,
          random: random,
          launchAmmo: launchAmmo,
          newScore: newScore
        }));
        gameStage++;
        createBoss = true;
      }
    }
    // dès que le palier est atteint, on arrête la production d'ennemis mais on continue le rendu des ennemis déjà générés.
    if (bosses.length === 0) {
      createEnnemies(lastFrameDate, gameStage);
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
    drawText(10, 30, 'Score: ' + newScore.score, 16, colors.text);
    drawLives(IMG.heartFull, 20);

    if (player.life <= 0 || (gameStage === 5 && bosses.length === 0)) {
      showEndModal({
        canvasWidth: canvasWidth,
        canvasHeight: canvasHeight,
        newScore: newScore,
        text: result
      });
      started = false;
    }
    window.requestAnimationFrame(draw);
  };

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
