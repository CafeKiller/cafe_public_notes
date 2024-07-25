// 冒泡排序
class BubblingSort {

    fun sort(arr: Array<Int>) {
        val size = arr.size

        // until 是一个范围操作符，用于创建一个半开区间（即不包括上限的区间）。
        // .. 创建的是闭区间（包括上限和下限）。
        for (i in 0 until size -1) {
            for (j in 0 until  size - i -1) {
                if (arr[j] > arr[j +1]) {
                    val temp = arr[j]
                    arr[j] = arr[j + 1]
                    arr[j +1] = temp
                }
            }
        }
    }

}

// 堆排序
class HeapSort {

    fun sort(arr: IntArray) {

        val size = arr.size

        // 构建最大堆
        for(i in (size / 2) - 1 downTo 0) {
            heapify(arr, size, i)
        }

        // 一个个从堆顶取出元素
        for(i in size - 1 downTo 1) { // downTo 是 Kotlin 标准库中的一个扩展函数，用于在循环中从某个值递减到另一个值。
            // 将当前的根节点与末尾元素交换，即将当前最大元素放到数组末尾
            swap(arr, 0, 1)

            // 调整剩余堆结构
            heapify(arr, i, 0)
        }

    }

    fun heapify(arr: IntArray, n: Int, i: Int) {

        var maxIdx = i
        var left = 2 * i +1
        var right = 2 * i +2

        if(left < n && arr[left] > arr[maxIdx]) maxIdx = left

        if(right < n && arr[right]> arr[maxIdx]) maxIdx = right

        if(maxIdx != i) {
            swap(arr, i, maxIdx)
            heapify(arr, n, maxIdx)
        }

    }

    fun swap(arr: IntArray, i: Int, j: Int) {
        val temp = arr[i]
        arr[i] = arr[j]
        arr[j] = temp
    }

}

// 希尔排序
class HellSortK {

    fun sort(arr: IntArray): IntArray {

        val size = arr.size
        var gap = size / 2

        while (gap > 0) {
            for(i in gap until size) {
                var j = i
                while(j >= gap && arr[j - gap] > arr[j]) {
                    val temp = arr[j - gap]
                    arr[j - gap] = arr[j]
                    arr[j] = temp
                    j -= gap
                }
            }

            gap /= 2
        }

        return arr

    }

}

// 插入排序
class InsertSort {

    fun sort(arr: IntArray) {

        val size = arr.size

        for(i in 1 until size) {
            var temp = arr[i]
            var j = i -1

            while( j >= 0 && arr[j] > temp ) {
                arr[j+1] = arr[j]
                j -= 1
            }
            arr[j + 1] = temp
        }
    }

}


// 归并排序
class MergeSortK {

    fun sort(arr: IntArray): IntArray {

        if(arr.size <= 1) return arr

        val middle = arr.size /2

        // arr.slice 是 Kotlin 标准库中的一个扩展函数，用于从数组或列表中提取子序列。这个函数允许你通过指定一个范围或一组索引来获取数组或列表的子集。
        val left = arr.slice(0 until middle)
        val right = arr.slice(middle until arr.size)

        return merge(sort(left.toIntArray()), sort(right.toIntArray()))
    }

    fun merge(left: IntArray, right: IntArray): IntArray {

        // mutableListOf 是 Kotlin 标准库中的一个函数，用于创建一个可变的列表。在 Kotlin 中，列表是一种有序的集合，可以包含重复的元素。
        // 与不可变列表（如 listOf）不同，可变列表允许添加、删除和修改元素。
        val result = mutableListOf<Int>()
        var leftIdx = 0
        var rightIdx = 0

        while(leftIdx < left.size && rightIdx < right.size) {
            if(left[leftIdx] <= right[rightIdx]) {
                result.add(left[leftIdx++])
            } else {
                result.add(right[rightIdx++])
            }
        }

        while(leftIdx < left.size) {
            result.add(left[leftIdx++])
        }

        while(rightIdx < right.size) {
            result.add(right[rightIdx])
        }

        return result.toIntArray()
    }

}

// 快速排序
class QuickSortK {

    fun quickSort(arr: IntArray, low: Int, high: Int) {
        if(low < high) {
            val pivotIndex = partition(arr, low, high)
            quickSort(arr, low, pivotIndex - 1)
            quickSort(arr, pivotIndex +1, high)
        }
    }

    fun partition(arr: IntArray, low: Int, high: Int): Int {
        val pivot = arr[high]
        var i = low -1

        for (j in low..<high) {
            if(arr[j] < pivot) {
                i++
                swap(arr, i, j)
            }
        }

        swap(arr, i+1, high)
        return i + 1
    }

    fun swap(array: IntArray, i: Int, j: Int) {
        val temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }

}


import java.util.Arrays

// 基数排序算法
class RadixSortK {

    // 思想：将所有待比较数值统一为同样的数位长度， 数位较短的数前面补零。 然后， 从最低位开始， 依次进行一次排序。这样从最低位排序一直到最高位排序完成以后, 数列就变成一个有序序列。

    // 基数排序函数
    fun radixSort(array: IntArray) {

        /*
        * array.maxOrNull 方法的作用是返回数组中的最大值，如果数组为空，则返回null。
        *
        * maxOrNull()方法内部会遍历数组中的每个元素，并将其与当前已知的最大值进行比较。
        * 如果当前元素大于已知的最大值，那么就更新最大值。遍历结束后，返回最大值，如果数组为空，则返回null。
        * */

        // 找到数组中的最大值
        var max: Int = Arrays.stream(array).max().orElse(0)
        // 计算以十为底的log（最大值）
        var exp = 1

        // 循环次数等于以十为底的log（最大值）加1
        while (max / exp > 0) {

            val output = Array(10) { IntArray(array.size) }
            for (i in array.indices) {
                val digit = (array[i] / exp) % 10
                output[digit][output[digit].lastIndex - i] = array[i]
            }

            var j = 0
            for (i in output.indices) {
                for (k in output[i].indices) {
                    if (output[i][k] != 0) {
                        array[j++] = output[i][k]
                    }
                }
            }

            exp *= 10
        }

    }

    fun run(arr: IntArray) {
        RadixSortK().radixSort(arr)
    }
}


// 选择排序
class SelectSortK {

    fun sort(arr: IntArray) {

        val size = arr.size

        for (i in 0 until size -1) {

            var minIdx = i

            for (j in i + 1 until size) {
                if (arr[j] < arr[minIdx]) {
                    minIdx = j
                }
            }

            if(minIdx != i) {
                val temp = arr[i]
                arr[i] = arr[minIdx]
                arr[minIdx] = temp
            }
        }

    }

}