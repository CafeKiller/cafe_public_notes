package main

import (
	"fmt"
	"math/rand"
	"time"
)

// bubbleSort √∞≈›≈≈–Ú
func bubbleSort(arr []int) []int {
    length := len(arr)
    for i := 0; i < length; i++ {
        for j := 0; j < length-1-i; j++ {
            if arr[j] > arr[j+1] {
                arr[j], arr[j+1] = arr[j+1], arr[j]
            }
        }
    }
    return arr
}


// selectionSort —°‘Ò≈≈–Ú
func selectionSort(arr []int) []int {
    length := len(arr)
    for i := 0; i < length-1; i++ {
        min := i
        for j := i + 1; j < length; j++ {
            if arr[min] > arr[j] {
                min = j
            }
        }
        arr[i], arr[min] = arr[min], arr[i]
    }
    return arr
}

// insertionSort ≤Â»Î≈≈–Ú
func insertionSort(arr []int) []int {
    for i := range arr {
        preIndex := i - 1
        current := arr[i]
        for preIndex >= 0 && arr[preIndex] > current {
            arr[preIndex+1] = arr[preIndex]
            preIndex -= 1
        }
        arr[preIndex+1] = current
    }
    return arr
}

func main() {

}