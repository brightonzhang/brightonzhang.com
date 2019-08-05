title: 排序算法
date: 2016-02-05 10:29:13
catalog: true
updated: 2016-02-05 15:43:09
cover: 
categories:
- 技术
tags: 
- 算法 
- 排序
---

# 冒泡排序 Bubble Sort
冒泡排序重复的遍历要排序的数列，一次比较两个元素，如果两者顺序错误就交换。这样越小（大）大元素会经过交换慢慢“浮”到数列的顶端，故名冒泡排序。

冒泡排序算法运作如下：（从小到大）
1. 比较相邻的元素，如果第一个比第二个大，就交换两个。
2. 对每一对相邻元素作同样的操作，从第一对到最后一对。这步做完之后，最后的元素会是最大的。
3. 针对所有的元素重复以上的步骤，除了最后一个。
4. 持续每次对越来越少的元素重复以上步骤，直到没有任何一对元素需要比较。

C++实现
``` c++
template<typename T>
void bubble_sort(T arr[], int len) {
	int i, j;
	for (i = 0; i < len - 1; i++){
		for (j = 0; j < len - 1 - i; j++){
			if (arr[j] > arr[j + 1]){
				swap(arr[j], arr[j + 1]);
			}
		}
	}
}
```
## 复杂度分析
时间复杂度：O(n^2)
最优时间复杂度:O(n)
平均时间复杂度:O(n^2)
空间复杂度：总共O(n)，需要辅助空间O(1)
***
# 插入排序 Insertion Sort
插入排序是通过构建有序序列，对于未排序元素，在已排序序列中找到相应位置并插入。插入排序应该是平时扑克和麻将中用的最多的。

插入排序算法运作如下：
1. 从第一个元素开始，该元素可以认为已排序。
2. 取下一个元素，在已排序序列中从后向前扫描。
3. 如果该元素大于新元素，将该元素移到下一个位置。
4. 重复步骤3，直到找到已排序的元素小于或等于新元素的位置
5. 将新元素插入到该位置后
6. 重复步骤2～5

C++实现
``` C++
template<typename T> 
void insertion_sort(T arr[], int len) {
	int i, j;
	T temp;
	for (i = 1; i < len; i++) {
 		temp = arr[i];
 		j = i - 1; 
 		for (; j >= 0 && arr[j] > temp; j--)
 			arr[j + 1] = arr[j];
 		arr[j + 1] = temp;
 	}
}
```
## 复杂度分析
时间复杂度：O(n^2)
最优时间复杂度:O(n)
平均时间复杂度:O(n^2)
空间复杂度：总共O(n)，需要辅助空间O(1)

插入排序需要比较操作次数为 (n-1) 到 n(n-1)/2 次。最好情况，已排序，比较 n-1 次即可。最快情况，逆序，需要比较 (n-1) + (n-2) + ... + 1 次。
插入排序的赋值操作次数是比较操作次数加上(n-1)次。
平均来说插入排序算法复杂度为O(n^2)。
因此，插入排序不适合对于数据量较大的排序应用。如果需要排序的数据量很小，如小于千，那么插入排序还是个不错的选择。插入排序在工业级库中也有广泛应用，在STL的sort算法和stblib的qsort算法中，都将插入排序作为快速排序的补充，用于少量元素的排序（通常为8个或以下）。
***
# 选择排序 Selection Sort
选择排序可能是人类思维中最直观的排序，从一堆杂乱的元素中按顺序挑出元素排列。

选择排序运作如下：
1. 在未排序序列中找出最小的元素，存放到排序序列的起始位置。
2. 从剩余未排序元素中找出最小元素，放到已排序序列的末尾。
3. 重复上述步骤，直到所有元素排列完毕。

C++实现
``` C++
template<typename T> 
void selection_sort(T arr[], int len) {
	int i, j, min;
	for (i = 0; i < len - 1; i++) {
		min = i;
		for (j = i + 1; j < len; j++)
			if (arr[min] > arr[j])
				min = j;
		swap(arr[i], arr[min]);
	}
}
```

## 复杂度分析
时间复杂度：O(n^2)
最优时间复杂度:O(n^2)
平均时间复杂度:O(n^2)
空间复杂度：总共O(n)，需要辅助空间O(1)

选择排序的交换操作介于0和(n-1)次之间。最好情况有序，交换0次；最坏情况，逆序，交换n-1次。
选择排序的比较操作为n(n-1)/2次之间。比较次数与初始状态无关，始终是(n-1) + (n-2) + ... + 1次。
选择排序的赋值操作介于0和3(n-1)次之间。

选择排序中的交换次数比冒泡排序较少，由于交换所需的CPU时间比比较所需的多，n值较小时，选择排序比冒泡排序快。

原地操作几乎是选择排序的唯一优点，当空间复杂度要求较高时，可以考虑选择排序；实际适用场合很少。
***
# 鸡尾酒排序 Cocktail Shaker Sort
鸡尾酒排序，即定向冒泡排序，与冒泡排序的不同之处在于排序是以双向在序列中进行的。
冒泡排序是从低到高取比较序列里的每一个元素，而鸡尾酒排序是从低到高然后从高到低。

鸡尾酒排序算法运作如下：（从小到大）
1. 比较相邻的元素，如果第一个比第二个大，就交换两个。
2. 对每一对相邻元素作同样的操作，从第一对到最后一对。这步做完之后，最后的元素会是最大的。
3. 从倒数第二个元素开始，朝前比较每对元素，直到第一个元素。如果前一个元素大于后一个元素，则交换两个。这步完成之后，第一个元素将会是最小的。
4. 针对所有的元素重复以上的步骤，除了最后一个和第一个。
5. 持续每次对越来越少的元素重复以上步骤，直到没有任何一对元素需要比较。

C++实现
``` c++
template<typename T>
void cocktail_sort(T arr[], int len) {
	int j, left = 0, right = len - 1;
	while (left < right) {
		for (j = left; j < right; j++){
			if (arr[j] > arr[j + 1]){
				swap(arr[j], arr[j + 1]);
			}
		}

		right--;

		for (j = right; j > left; j--){
			if (arr[j - 1] > arr[j]){
				swap(arr[j - 1], arr[j]);
			}
		}

		left++;
	}
}
```

## 复杂度分析
时间复杂度：O(n^2)
最优时间复杂度:O(n)
平均时间复杂度:O(n^2)

鸡尾酒排序最糟或是平均所花费的次数都是 O(n^2)，但如果序列在一开始已经大部分排序过的话，会接近 O(n)。
***
# 快速排序 Quicksort
快速排序又称划分交换排序，使用分治法策略把一个序列分为两个子序列。

快速排序运作如下：
1. 从数列中跳出一个元素称为“基准” pivot。
2. 重新排序数列，所有元素比基准值小的摆在基准前，比基准大的放后面（相同的元素可以放任意一边）。该操作结束后，基准就处在数列的中间位置。这个称谓分区partition操作。
3. 递归地recursive把小于基准元素的子序列和大于基准的子序列排序。

C++实现
迭代法
``` c++
struct Range {
	int start, end;
	Range(int s = 0, int e = 0) {start = s, end = e;}
};

template<typename T> 
void quick_sort(T arr[], const int len) {
	if (len <= 0){
		return;
	}

	Range r[len]; 
	int p = 0;

	r[p++] = Range(0, len - 1);

	while (p) {
		Range range = r[--p];

		if(range.start >= range.end){
			continue;
		}

		T mid = arr[range.end];
		int left = range.start, right = range.end - 1;

		while (left < right) {
			while (arr[left] < mid && left < right){
				left++;
			}

			while (arr[right] >= mid && left < right){
				right--;
			}

			std::swap(arr[left], arr[right]);
		}

		if (arr[left] >= arr[range.end]){
			std::swap(arr[left], arr[range.end]);
		}
		else{
			left++;
		}

		r[p++] = Range(range.start, left - 1);
		r[p++] = Range(left + 1, range.end);
	}
}
```

递归法
``` c++
template<typename T>
void quick_sort_recursive(T arr[], int start, int end) {
	if (start >= end){
		return;
	}

	T mid = arr[end];
	int left = start, right = end - 1;

	while (left < right) {
		while (arr[left] < mid && left < right){
			left++;
		}

		while (arr[right] >= mid && left < right){
			right--;
		}

		std::swap(arr[left], arr[right]);
	}

	if (arr[left] >= arr[end]){
		std::swap(arr[left], arr[end]);
	}
	else{
		left++;
	}

	quick_sort_recursive(arr, start, left - 1);
	quick_sort_recursive(arr, left + 1, end);
}

template<typename T> 
void quick_sort(T arr[], int len) {
	quick_sort_recursive(arr, 0, len - 1);
}
```

## 复杂度分析
时间复杂度：O(n^2)
最优时间复杂度:O(n*log(n))
平均时间复杂度:O(n*log(n))
空间复杂度：根据实现的方式不同而不同

在平均状况下，快速排序n个项目需要O(n*log(n))次比较，在最快的情况下需要O(n^2)次比较。事实上，快速排序通常明显比其他O(n*log(n))算法更快，因为它的内部循环可以在大部分架构上很有效率地实现。
***
# 希尔排序 Shellsort
希尔排序，也称递减增量排序算法，是插入排序的一种更高效版本。
希尔排序通过将比较多全部元素分为几个区域来提升插入排序的性能。这样可以让一个元素可以一次性的朝最终位置前进一大步。然后算法仔取越来越小的步长进行排序，算法的最后一步就是普通的插入排序，但到这个时候时，需排序的数据几乎是已排好的了。

将数组列在一个表中并对列排序可以比较好对理解希尔排序。重复这个过程，不过每次用更长的列——更短的行——来进行，最后这个表就只有一列了。
例如，假设对下面的组数进行排序：
[ 13 14 94 33 82 25 59 94 65 23 45 27 73 25 39 10 ]
如果我们以步长为5开始进行排序，我们可以通过将这列表放在有5列的表中来更好地描述算法，这样他们就应该看起来是这样：
13 14 94 33 82
25 59 94 65 23
45 27 73 25 39
10
然后我们对每列进行排序：
10 14 73 25 23
13 27 94 33 39
25 59 94 65 82
45
将上述四行数字，依序接在一起时我们得到：
[ 10 14 73 25 23 13 27 94 33 39 25 59 94 65 82 45 ]
这时10已经移至正确位置了，然后再以3为步长进行排序：
10 14 73
25 23 13
27 94 33
39 25 59
94 65 82
45
排序之后变为：
10 14 13
25 23 33
27 25 59
39 65 73
45 94 82
94
最后以1步长进行排序（此时就是简单的插入排序了）。

C++实现
``` c++
template<typename T> 
void shell_sort(T arr[], int len) {
	int gap, i, j;
	T temp;
	for (gap = len >> 1; gap > 0; gap >>= 1){
		for (i = gap; i < len; i++) {
			temp = arr[i];
			for (j = i - gap; j >= 0 && arr[j] > temp; j -= gap)
				arr[j + gap] = arr[j];
			arr[j + gap] = temp;
		}
	}
}
```

## 复杂度分析
## 步长
步长的选择是希尔排序的重要部分。
Donald Shell最初建议步长选择为 n／2 并且对步长取半直到为1. 这样的步长表现要比O(n^2)类算法（插入排序）更好，但仍有减少平均时间和最差时间的余地。
| 步长序列       | 最快情况下的复杂度|
| ------------- |:--------------:|
| n／(2^i)      | O(n^2)         |
| 2^k - 1       | O(n^(3/2))    |
| 2^i * 3^j     | O(n*log2(n))  |
目前已知的最好步长是由Sedgewick提出的(1, 5, 19, 41, 109...)，该序列的项来自 9 * 4^i - 9 * 2^i + 1和2^(i+2) * ( 2^(i+2) - 3 ) + 1这两个算式。这样研究也表明：比较时是希尔排序中的主要操作，而不是交换。用这样的步长序列的希尔排序比插入排序要快，甚至在小数组中比快速排序和堆排序还快，但是在涉及大量数据时希尔排序还是比快速排序慢。

***
# 堆排序 Heapsort
堆排序是利用堆这种数据结构设计的排序算法。堆积是一个近似完全二叉树的结构，并同时满足堆积的性质：即子结点和键值或索引总是小于或大于它的父节点。

## 堆节点的访问
通常堆是通过一维数组来实现的：
* 父节点i的左子节点在位置(2*i+1);
* 父节点i的右子节点在位置(2*i+2);
* 子节点i的父节点在位置floor((i-1)/2);

## 堆的操作
在堆的数据结构中，堆中的最大值总是在根节点。堆中定义以下几种操作：
* 最大堆调整 Max Heapify：将堆堆末端子节点作为调整，使得子节点永远小于父节点
* 创建最大堆 Build Max Heap：将堆所有数据重新排序
* 堆排序 Heapsort：移除位在第一个数据的根节点，并做最大堆调整堆递归运算。

C++实现
``` c++
void max_heapify(int arr[], int start, int end) {
	int dad = start;
	int son = dad * 2 + 1;
	while (son <= end) { 
		if (son + 1 <= end && arr[son] < arr[son + 1]){
			son++;
		}

		if (arr[dad] > arr[son]){
			return;
		}
		else {
			swap(arr[dad], arr[son]);
			dad = son;
			son = dad * 2 + 1;
		}
	}
}

void heap_sort(int arr[], int len) {
	for (int i = len / 2 - 1; i >= 0; i--){
		max_heapify(arr, i, len - 1);
	}

	for (int i = len - 1; i > 0; i--) {
		swap(arr[0], arr[i]);
		max_heapify(arr, 0, i - 1);
	}
}
```
## 复杂度分析
时间复杂度：O(n*log(n))
最优时间复杂度:O(n*log(n))
平均时间复杂度:O(n*log(n))
空间复杂度：总共O(n)，需要辅助空间O(1)

***
# 归并排序
归并排序是创建在归并操作上的一种有效的排序算法，该算法是采用分治法 Divide and Conquer 的一个典型应用。
归并操作merge，是指将两个已经排序的序列合并成一个序列的操作。

归并排序运作如下：
迭代法
1. 申请空间，使其大小为两个已经排序序列之和，该空间用来存放合并后的序列
2. 设定两个指针，最初位置分别为两个已经排序序列的起始位置
3. 比较两个指针所指向的元素，选择相对小的元素放入到合并空间，并移动指针到下一位置
4. 重复步骤3直到某一指针到达序列尾
5. 将另一序列剩下的所有元素直接复制到合并序列尾

递归法（假设序列共有n个元素）：
1. 将序列每相邻两个数字进行归并操作，形成floor(n/2)个序列，排序后每个序列包含两个元素
2. 将上述序列再次归并，形成floor(n/4)个序列，每个序列包含四个元素
3. 重复步骤2，直到所有元素排序完毕

C++实现
迭代实现
``` c++
template<typename T>
void merge_sort(T arr[], int len) {
	T* a = arr;
	T* b = new T[len];
	for (int seg = 1; seg < len; seg += seg) {
		for (int start = 0; start < len; start += seg + seg) {
			int low = start, mid = min(start + seg, len), high = min(start + seg + seg, len);
			int k = low;
			int start1 = low, end1 = mid;
			int start2 = mid, end2 = high;
			while (start1 < end1 && start2 < end2){
				b[k++] = a[start1] < a[start2] ? a[start1++] : a[start2++];
			}

			while (start1 < end1){
				b[k++] = a[start1++];
			}

			while (start2 < end2){
				b[k++] = a[start2++];
			}
		}

		T* temp = a;
		a = b;
		b = temp;
	}

	if (a != arr) {
		for (int i = 0; i < len; i++){
			b[i] = a[i];
		}

		b = a;
	}

	delete[] b;
}
```

递归实现
``` c++
template<typename T>
void merge_sort_recursive(T arr[], T reg[], int start, int end) {
	if (start >= end){
		return;
	}

	int len = end - start, mid = (len >> 1) + start;
	int start1 = start, end1 = mid;
	int start2 = mid + 1, end2 = end;

	merge_sort_recursive(arr, reg, start1, end1);
	merge_sort_recursive(arr, reg, start2, end2);

	int k = start;
	while (start1 <= end1 && start2 <= end2){
		reg[k++] = arr[start1] < arr[start2] ? arr[start1++] : arr[start2++];
	}

	while (start1 <= end1){
		reg[k++] = arr[start1++];
	}

	while (start2 <= end2){
		reg[k++] = arr[start2++];
	}

	for (k = start; k <= end; k++){
		arr[k] = reg[k];
	}
}

template<typename T>
void merge_sort(T arr[], const int len) {
	T reg[len];
	merge_sort_recursive(arr, reg, 0, len - 1);
}
```

## 复杂度分析
时间复杂度：O(n*log(n))
最优时间复杂度:O(n)
平均时间复杂度:O(n*log(n))
空间复杂度:O(n)
***
# 简单比较
名称|数据对象|稳定性|时间复杂度(平均/最坏)|额外空间复杂度|描述|
---|:-----:|:---:|:-----------------:|:-----------:|---|
冒泡排序|数组|Y|O(n^2)|O(1)|（无序区，有序区）。从无序区通过交换找出最大元素放到有序区前端。|
选择排序|数组/链表|N/Y|O(n^2)|O(1)|（有序区，无序区）。在无序区里找一个最小的元素跟在有序区的后面。对数组：比较得多，换得少。|
插入排序|数组/链表|Y|O(n^2)|O(1)|（有序区，无序区）。把无序区的第一个元素插入到有序区的合适的位置。对数组：比较得少，换得多。|
堆排序|数组|N|O(n*log(n))|O(1)|（最大堆，有序区）。从堆顶把根卸出来放在有序区之前，再恢复堆。|
归并排序|数组/链表|Y|O(n*log(n))/O(n*log2(n))|O(1)/O(n)+O(\log n)(如果不是从下到上),O(1)|把数据分为两段，从两段中逐个选最小的元素移入新数据段的末尾。可从上到下或从下到上进行。|
快速排序|数组|N|O(n*log(n))/O(n^2)|O(log(n))|（小数，基准元素，大数）。在区间中随机挑选一个元素作基准，将小于基准的元素放在基准之前，大于基准的元素放在基准之后，再分别对小数区与大数区进行排序。|
希尔排序|数组|N|O(n*log2(n))/O(n^2)|O(1)|每一轮按照事先决定的间隔进行插入排序，间隔会依次缩小，最后一次一定要是1。|
计数排序|数组/链表|Y|O(n+m)|O(n+m)|统计小于等于该元素值的元素的个数i，于是该元素就放在目标数组的索引i位（i≥0）。|
桶排序|数组/链表|Y|O(m)|O(m)|将值为i的元素放入i号桶，最后依次把桶里的元素倒出来。|
基数排序|数组/链表|Y|O(k*n)/O(n^2)||一种多关键字的排序算法，可用桶排序实现。|    

⚠️排序算法的稳定性：稳定排序算法会让相等键值的记录维持原有的相对次序。
