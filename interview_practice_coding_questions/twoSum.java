package interview_practice_coding_questions;

import java.io.*;
import java.util.HashMap;

class twoSum {
    public static void main(String[] args) {
        int[] nums = { 2, 7, 11, 15 };
        int target = 9;
        int[] result = calculate(nums, target);
        System.out.println(result[0] + " " + result[1]);
    }

    public static int[] calculate(int[] nums, int target) {
        HashMap<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        return new int[] {};

    }

}