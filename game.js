const FLOOR_HEIGHT = 48;
const JUMP_FORCE = 800;
const SPEED = 480;

// initialize context
kaboom();

setBackground(141, 183, 255);

// load assets
loadSprite("bean", "https://kaboomjs.com/sprites/bean.png");

scene("game", () => {
    // define gravity
    setGravity(2400);

    // add a game object to screen
    const player = add([
        // list of components
        sprite("bean"),
        pos(80, 40),
        area(),
        body(),
    ]);  

    // floor
    add([
        rect(width(), FLOOR_HEIGHT),
        outline(4),
        pos(0, height()),
        anchor("botleft"),
        area(),
        body({ isStatic: true }),
        color(132, 101, 236),
    ]);

    function jump() {
        if (player.isGrounded()) {
            player.jump(JUMP_FORCE);
        }
    }

    // jump when user press space
    onKeyPress("w", jump);
    onClick(jump);

    function spawnTree() {
        // add tree obj
        add([
            rect(48, rand(32, 96)),
            area(),
            outline(4),
            pos(width(), height() - FLOOR_HEIGHT),
            anchor("botleft"),
            color(238, 70, 0),
            move(LEFT, SPEED),
            "tree",
        ]);

        // wait a random amount of time to spawn next tree
        wait(rand(0.5, 1.5), spawnTree);
    }

    // start spawning trees
    spawnTree();

    // lose if player collides with any game obj with tag "tree"
    player.onCollide("tree", () => {
        // go to "lose" scene and pass the score
        go("lose", score);
        burp();
        addKaboom(player.pos);
    });

    // keep track of score
    let score = 0;

    const scoreLabel = add([
        text(score),
        pos(12, 12),
    ]);

    // increment score every frame
    onUpdate(() => {
        score++;
        scoreLabel.text = score;
    });
});

scene("lose", (score) => {
    add([
        sprite("bean"),
        pos(width() / 2, height() / 2 - 80),
        scale(2),
        anchor("center"),
    ]);

    add([
        text(score),
        pos(width() / 2, height() / 2 + 80),
        scale(2),
        anchor("center"),
    ]);

    onKeyPress("space", () => go("game"));
    onClick(() => go("game"));
});

go("game");

// Ensure the canvas is focused when the game starts
document.querySelector("canvas").focus();
