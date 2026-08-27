var survivedRobotsHealths = function(positions, healths, directions) {
    const n = positions.length;

    const robots = [];

    for (let i = 0; i < n; i++) {
        robots.push({
            pos: positions[i],
            health: healths[i],
            dir: directions[i],
            index: i
        });
    }

    // Sort by position
    robots.sort((a, b) => a.pos - b.pos);

    // Stack contains only R robots
    const stack = [];

    // Surviving robots
    const survivors = [];

    for (const robot of robots) {

        if (robot.dir === 'R') {
            stack.push(robot);
            continue;
        }

        // Current robot is moving Left
        let alive = true;

        while (stack.length > 0 && alive) {

            const right = stack[stack.length - 1];

            if (right.health < robot.health) {
                // Right robot dies
                stack.pop();

                // Left robot loses 1 health
                robot.health--;
            }
            else if (right.health > robot.health) {
                // Left robot dies
                right.health--;
                alive = false;
            }
            else {
                // Both die
                stack.pop();
                alive = false;
            }
        }

        // If L robot survived all collisions
        if (alive) {
            survivors.push(robot);
        }
    }

    // All remaining R robots are survivors
    for (const robot of stack) {
        survivors.push(robot);
    }

    // Original input order
    survivors.sort((a, b) => a.index - b.index);

    return survivors.map(robot => robot.health);
};