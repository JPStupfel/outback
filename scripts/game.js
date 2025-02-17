import { jump, spawnEnemy, spawnTree } from './game.util.js'; // Import methods from game.util.js

// Constants for game settings
const FLOOR_HEIGHT = 48; // Height of the floor
const JUMP_FORCE = 1000; // Force applied when the player jumps
const BOOST_FORCE = 1000; // Force applied when the player boosts in the air
const SPEED = 300; // Speed of the enemies
const BACKGROUND_SPEED = 100; // Speed for background trees

// Initialize Kaboom context
kaboom();

// Set background color
setBackground(141, 183, 255);

// Load assets (sprites)
loadSprite("bean", "https://kaboomjs.com/sprites/bean.png");
loadSprite("snake", "./assets/snake.png"); // Load custom player sprite
loadSprite("chaz", "./assets/Chaz_Hunt.webp"); 
loadSprite("koala", "./assets/koala.webp");
loadSprite("lizard", "./assets/lizard.webp");
loadSprite("spider", "./assets/spider.jpeg");

// Define the main game scene
scene("game", () => {
    // Set gravity for the game
    setGravity(2000);

    // Add the floor to the game
    add([
        rect(width(), FLOOR_HEIGHT),
        outline(4),
        pos(0, height()),
        anchor("botleft"),
        area(),
        body({ isStatic: true }),
        color(132, 101, 236),
    ]);

    // Add the player to the game
    const player = add([
        sprite("snake"), // Use custom player sprite
        pos(80, 40),
        area(),
        body(),
        scale(0.5), // Scale the sprite to half its original size
    ]);

    // Bind jump function to space key and mouse click
    onKeyPress("space", () => jump(player, JUMP_FORCE, BOOST_FORCE));
    onClick(() => jump(player, JUMP_FORCE, BOOST_FORCE));

    // Array of enemy sprite names
    const enemySprites = ["chaz", "koala", "lizard", "spider"];

    // Start spawning enemies and trees
    spawnEnemy(enemySprites, FLOOR_HEIGHT, SPEED);
    spawnTree(FLOOR_HEIGHT, BACKGROUND_SPEED);

    // Handle collision with enemies
    player.onCollide("enemy", () => {
        go("lose", score); // Go to the lose scene and pass the score
        burp(); // Play a sound effect
        addKaboom(player.pos); // Add explosion effect
    });

    // Keep track of the score
    let score = 0;

    // Add score label to the game
    const scoreLabel = add([
        text(score),
        pos(12, 12),
    ]);

    // Increment score every frame
    onUpdate(() => {
        score++;
        scoreLabel.text = score;
    });
});

// Define the lose scene
scene("lose", (score) => {
    // Add player sprite to the lose scene
    add([
        sprite("bean"),
        pos(width() / 2, height() / 2 - 80),
        scale(2),
        anchor("center"),
    ]);

    // Display the score in the lose scene
    add([
        text(score),
        pos(width() / 2, height() / 2 + 80),
        scale(2),       
        anchor("center"),
    ]);

    // Restart the game when space key is pressed or mouse is clicked
    onKeyPress("space", () => go("game"));
    onClick(() => go("game"));
});

// Start the game
go("game");

// Ensure the canvas is focused when the game starts
document.querySelector("canvas").focus();
