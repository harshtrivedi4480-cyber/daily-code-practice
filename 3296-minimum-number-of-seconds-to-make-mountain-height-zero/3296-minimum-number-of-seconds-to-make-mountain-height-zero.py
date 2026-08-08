class Solution:
    def minNumberOfSeconds(self, mountainHeight: int, workerTimes: List[int]) -> int:
        # [ (total+curTime, workerTime, times) ]
        pq = []
        for workerTime in workerTimes:
            totalNxt = 0+workerTime
            cur = (totalNxt, workerTime, 1)
            pq.append(cur)
        heapify(pq)

        for _ in range(mountainHeight):
            totalNxt, workerTime, times = heappop(pq)
            times+=1
            totalNxt+=workerTime*times
            new = (totalNxt, workerTime, times)
            heappush(pq, new)

        res = 0
        for totalNxt, workerTime, times in pq:
            res = max(res, totalNxt-workerTime*times)
        return res