const fs = require('fs')

const content = fs.readFileSync('./day2/file.data', 'utf-8')

const reports = []
content.split('\n').forEach((line) => {
    reports.push(line.split(' ').map((e) => parseInt(e)))
})

const absWithSymbol = (value) => [Math.abs(value), value > 0]

const isReportSafeCache = {}

function isReportSafe(report) {
    let order = undefined
    for (let i = 1; i < report.length; i++) {
        const [diff, isPositiv] = absWithSymbol(report[i - 1] - report[i])
        if (order !== undefined && isPositiv !== order) return false
        order = isPositiv
        if (diff < 1 || diff > 3) return false
    }
    return true
}

function checkReportWithCache(report) {
    const cached = isReportSafeCache[report]
    if (cached !== undefined) return cached
    const result = isReportSafe(report)
    isReportSafeCache[report] = result
    return result
}

// part 1 solution
console.log(reports.filter((e) => checkReportWithCache(e)).length)

const arrayWithoutIdx = (array, idx) => [...array].toSpliced(idx, 1)

function isReportSafeWithRetries(report) {
    if (checkReportWithCache(report)) return true
    let order = undefined
    for (let i = 1; i < report.length; i++) {
        const [diff, isPositiv] = absWithSymbol(report[i - 1] - report[i])
        if (
            order === undefined &&
            checkReportWithCache(arrayWithoutIdx(report, 0))
        ) {
            return true
        }
        if (order !== undefined && isPositiv !== order) {
            return (
                checkReportWithCache(arrayWithoutIdx(report, i - 1)) ||
                checkReportWithCache(arrayWithoutIdx(report, i))
            )
        }
        order = isPositiv
        if (diff < 1 || diff > 3) {
            return (
                checkReportWithCache(arrayWithoutIdx(report, i - 1)) ||
                checkReportWithCache(arrayWithoutIdx(report, i))
            )
        }
    }
    return true
}

// part 2 solution
console.log(
    reports.filter((e) => checkReportWithCache(e) || isReportSafeWithRetries(e))
        .length
)
