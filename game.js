kaboom({
    global: true,
    fullscreen: true,
    scale: 2,
    clearColor: [0, 0, 0, 1],
});

loadSprite("player", "https://kaboomjs.com/sprites/bean.png");
loadSprite("obstacle", "https://kaboomjs.com/sprites/coin.png");

scene("game", () => {
    const player = add([
        sprite("player"),
        pos(80, 40),
        body(),
    ]);

    function spawnObstacle() {
        add([
            sprite("obstacle"),
            pos(width(), rand(0, height() - 48)),
            "obstacle",
            { passed: false },
        ]);
    }

    loop(1.5, () => {
        spawnObstacle();
    });

    player.action(() => {
        if (player.pos.y >= height()) {
            go("game");
        }
    });

    keyPress("space", () => {
        if (player.grounded()) {
            player.jump(400);
        }
    });

    action("obstacle", (obstacle) => {
        obstacle.move(-200, 0);
        if (obstacle.pos.x < player.pos.x && !obstacle.passed) {
            obstacle.passed = true;
        }
        if (obstacle.pos.x < -obstacle.width) {
            destroy(obstacle);
        }
    });

    player.collides("obstacle", () => {
        go("game");
    });
});

start("game");
