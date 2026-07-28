int trap(int* height, int heightSize) {
    if (heightSize == 0) return 0;
    
    int left = 0, right = heightSize - 1;
    int leftMax = 0, rightMax = 0;
    int water = 0;
    
    while (left < right) {
        if (height[left] < height[right]) {
            // height[left] < height[right], so the water level on the left
            // is bounded by leftMax, since there's a taller bar somewhere to the right
            if (height[left] >= leftMax) {
                leftMax = height[left];
            } else {
                water += leftMax - height[left];
            }
            left++;
        } else {
            // height[right] <= height[left], so the water level on the right
            // is bounded by rightMax
            if (height[right] >= rightMax) {
                rightMax = height[right];
            } else {
                water += rightMax - height[right];
            }
            right--;
        }
    }
    
    return water;
}