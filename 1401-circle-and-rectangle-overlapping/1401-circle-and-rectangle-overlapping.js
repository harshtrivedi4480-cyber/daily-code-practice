var checkOverlap = function(radius, xCenter, yCenter, x1, y1, x2, y2) {
    // Find the closest point in the rectangle
    let closestX = Math.max(x1, Math.min(xCenter, x2));
    let closestY = Math.max(y1, Math.min(yCenter, y2));

    // Distance between circle center and closest point
    let dx = xCenter - closestX;
    let dy = yCenter - closestY;

    // Check if point is inside or on the circle
    return dx * dx + dy * dy <= radius * radius;
};