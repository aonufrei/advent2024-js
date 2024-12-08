const fs = require('fs')

const query = 'XMAS'

const content = fs.readFileSync('./day4/file.data', 'utf-8')

let hlines = []

content.split('\n').forEach((e) => hlines.push(e))

let vlines = []
for (let i = 0; i < hlines[0].length; i++) {
    let vline = ''
    hlines.forEach((e) => (vline += e.at(i)))
    vlines.push(vline)
}

let d1lines = []
for (let i = 0; i < hlines[0].length; i++) {
    let line = ''
    let r = i
    let c = 0
    while (c >= 0 && r >= 0) {
        line += hlines[r][c]
        r -= 1
        c += 1
    }
    if (line.length >= query.length) d1lines.push(line)
}

d1lines.pop()

for (let i = 0; i < vlines.length; i++) {
    let line = ''
    let r = hlines.length - 1
    let c = vlines.length - 1 - i
    while (c < vlines.length && r >= 0) {
        line += hlines[r].at(c)
        r -= 1
        c += 1
    }
    if (line.length >= query.length) d1lines.push(line)
}

let d2lines = []

for (let i = 0; i < hlines.length; i++) {
    let line = ''
    let r = i
    let c = vlines.length - 1
    while (c >= 0 && r >= 0) {
        line += hlines[r][c]
        r -= 1
        c -= 1
    }
    if (line.length >= query.length) d2lines.push(line)
}

d2lines.pop()

for (let i = 0; i < vlines.length; i++) {
    let line = ''
    let r = hlines.length - 1
    let c = i
    while (c >= 0 && r >= 0) {
        line += hlines[r].at(c)
        r -= 1
        c -= 1
    }
    if (line.length >= query.length) d2lines.push(line)
}

const lines = [...hlines, ...vlines, ...d1lines, ...d2lines].sort()

function findSequence(line, query) {
    let count = 0
    findings = []
    for (let i = 0; i < line.length - query.length + 1; i++) {
        if (line.substring(i, i + query.length) === query) {
            findings.push(i)
            count++
        }
    }
    // console.log(`${line} ===> ${findings}`)
    return count
}

const reversedQuery = query.split('').reverse().join('')
const occurences = lines
    .map((l) => findSequence(l, query) + findSequence(l, reversedQuery))
    .reduce((acc, v) => acc + v, 0)

// part 1 solution
console.log(occurences)

function lookForPattern(patternMatrix, matrix) {
    let occurences = 0
    const matrixSize = matrix.length
    const patternSize = patternMatrix.length
    for (let r = 0; r < matrixSize; r++) {
        for (let c = 0; c < matrixSize; c++) {
            let occurres = true
            for (let y = 0; y < patternSize; y++) {
                if (occurres === false) break
                for (let x = 0; x < patternSize; x++) {
                    if (patternMatrix[y][x] === '.') continue
                    if (
                        r + y >= matrixSize ||
                        c + x >= matrixSize ||
                        matrix[r + y][c + x] !== patternMatrix[y][x]
                    ) {
                        occurres = false
                        break
                    }
                }
            }
            if (occurres) {
                occurences += 1
            }
        }
    }
    return occurences
}

const matrix = content.split("\n").map(e => e.split(""))

const pattern = [
    ['M', '.', 'S'],
    ['.', 'A', '.'],
    ['M', '.', 'S'],
]

const pattern1 = [
    ['M', '.', 'M'],
    ['.', 'A', '.'],
    ['S', '.', 'S'],
]

const pattern2 = [
    ['S', '.', 'M'],
    ['.', 'A', '.'],
    ['S', '.', 'M'],
]

const pattern3 = [
    ['S', '.', 'S'],
    ['.', 'A', '.'],
    ['M', '.', 'M'],
]

const occ = [pattern, pattern1, pattern2, pattern3].map(p => lookForPattern(p, matrix)).reduce((acc, curr) => acc + curr, 0)

// part 2 solution
console.log(occ) // 1890


