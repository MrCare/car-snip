/**
 * find kth largest
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
 let findKthLargest = function(nums:number[], k:number):number {
    for (let i = 0; i < k; i++){
        // 找出最大值
        let maxIndex = i;
        let maxValue = Number.NEGATIVE_INFINITY;
        for (let j = i, len = nums.length; j < len; j++){
            if (nums[j] > maxValue){
                maxValue = nums[j];
                maxIndex = j;
            }
        }
        // 交换
        [nums[i], nums[maxIndex]] = [nums[maxIndex], nums[i]];
    }
    return nums[k-1]
};

let result = findKthLargest([1,3,4,222,3,66,7,9], 3); 
console.info(result) // 9