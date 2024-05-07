package main

import (
	"fmt"
	"math/rand"
	"time"
)

// bubbleSort ð������
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


// selectionSort ѡ������
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

// insertionSort ��������
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


// shellSort ϣ������
func shellSort(arr []int) []int {
    length := len(arr)
    gap := 1
    for gap < gap/3 {
        gap = gap*3 + 1
    }
    for gap > 0 {
        for i := gap; i < length; i++ {
            temp := arr[i]
            j := i - gap
            for j >= 0 && arr[j] > temp {
                arr[j+gap] = arr[j]
                j -= gap
            }
            arr[j+gap] = temp
        }
        gap = gap / 3
    }
    return arr
}

// mergeSort �鲢����
func mergeSort(arr []int) []int {
    length := len(arr)
    if length < 2 {
        return arr
    }
    middle := length / 2
    left := arr[0:middle]
    right := arr[middle:]
    return merge(mergeSort(left), mergeSort(right))
}

// merge �鲢�ݹ鴦����
func merge(left []int, right []int) []int {
    var result []int
    for len(left) != 0 && len(right) != 0 {
        if left[0] <= right[0] {
            result = append(result, left[0])
            left = left[1:]
        } else {
            result = append(result, right[0])
            right = right[1:]
        }
    }
    for len(left) != 0 {
        result = append(result, left[0])
        left = left[1:]
    }
    for len(right) != 0 {
        result = append(result, right[0])
        right = right[1:]
    }
    return result
}

// quickSort ��������
func quickSort(arr []int) []int {
    return _quickSort(arr, 0, len(arr)-1)
}
func _quickSort(arr []int, left, right int) []int {
    if left < right {
        partitionIndex := partition(arr, left, right)
        _quickSort(arr, left, partitionIndex-1)
        _quickSort(arr, partitionIndex+1, right)
    }
    return arr
}
func partition(arr []int, left, right int) int {
    pivot := left
    index := pivot + 1
    for i := index; i <= right; i++ {
        if arr[i] < arr[pivot] {
            swap(arr, i, index)
            index += 1
        }
    }
    swap(arr, pivot, index-1)
    return index - 1
}
// �������򽻻�, �����򽻻�
func swap(arr []int, i, j int) {
    arr[i], arr[j] = arr[j], arr[i]
}


func heapSort(arr []int) []int {
    arrLen := len(arr)
    buildMaxHeap(arr, arrLen)
    for i := arrLen - 1; i >= 0; i-- {
        swap(arr, 0, i)
        arrLen -= 1
        heapify(arr, 0, arrLen)
    }
    return arr
}
func buildMaxHeap(arr []int, arrLen int) {
    for i := arrLen / 2; i >= 0; i-- {
        heapify(arr, i, arrLen)
    }
}
func heapify(arr []int, i, arrLen int) {
    left := 2*i + 1
    right := 2*i + 2
    largest := i
    if left < arrLen && arr[left] > arr[largest] {
        largest = left
    }
    if right < arrLen && arr[right] > arr[largest] {
        largest = right
    }
    if largest != i {
        swap(arr, i, largest)
        heapify(arr, largest, arrLen)
    }
}


// countingSort ��������
func countingSort(arr []int, maxValue int) []int {
    bucketLen := maxValue + 1
    bucket := make([]int, bucketLen) // ��ʼΪ0������
    sortedIndex := 0
    length := len(arr)
    for i := 0; i < length; i++ {
        bucket[arr[i]] += 1
    }
    for j := 0; j < bucketLen; j++ {
        for bucket[j] > 0 {
            arr[sortedIndex] = j
            sortedIndex += 1
            bucket[j] -= 1
        }
    }
    return arr
}


func main() {

}