// Function to handle player jump
export function jump(player, JUMP_FORCE, BOOST_FORCE) {
    if (player.isGrounded()) {
        player.jump(JUMP_FORCE); // Jump with full force if grounded
    } else if (player.pos.y > 40) {
        player.jump(BOOST_FORCE); // Apply a smaller boost force while in the air
    }
}

// Function to spawn enemies
export function spawnEnemy(enemySprites, FLOOR_HEIGHT, SPEED) {
    const spriteName = choose(enemySprites); // Randomly select a sprite
    const yPos = choose([height() - FLOOR_HEIGHT, height() / 2]); // Randomly choose between ground and halfway up

    // Add enemy object to the game
    add([
        sprite(spriteName), // Use the randomly selected sprite
        area(),
        pos(width(), yPos),
        anchor("botleft"),
        scale(rand(0.3, 0.5)), // Scale the sprite
        move(LEFT, SPEED),
        "enemy",
    ]);

    // Wait a random amount of time to spawn the next enemy
    wait(rand(2.5, 4.5), () => spawnEnemy(enemySprites, FLOOR_HEIGHT, SPEED));
}

// Function to spawn background trees
export function spawnTree(FLOOR_HEIGHT, BACKGROUND_SPEED) {
    // Add brown rectangle to symbolize the tree trunk
    add([
        pos(width(), height() - FLOOR_HEIGHT),
        move(LEFT, BACKGROUND_SPEED),
        rect(48, 48),
        color(139, 69, 19), // Brown color
        anchor("botleft"),
        "tree",
        z(-1), // Ensure it is in the background
    ]);

    // Add green circle on top of the brown rectangle to symbolize the tree foliage
    add([
        pos(width() + 24, height() - FLOOR_HEIGHT - 24 * 2.5), // Adjust position to be on top of the rectangle
        move(LEFT, BACKGROUND_SPEED),
        circle(44),
        color(34, 139, 34), // Green color
        anchor("center"),
        "tree",
        z(-1), // Ensure it is in the background
    ]);

    // Wait a random amount of time to spawn the next tree
    wait(rand(1, 3), () => spawnTree(FLOOR_HEIGHT, BACKGROUND_SPEED));
}
