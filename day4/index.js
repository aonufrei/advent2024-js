const fs = require('fs')

const content = fs.readFileSync('./day4/file.data', 'utf-8')
const matrix = content.split('\n').map((e) => e.split(''))

// Looks for patterns in the matrix
function lookForPattern(patternMatrix, matrix) {
    const matrixR = matrix.length
    const matrixC = matrix[0].length
    const patternR = patternMatrix.length
    const patternC = patternMatrix[0].length
    let occurences = 0
    for (let r = 0; r < matrixR; r++) {
        for (let c = 0; c < matrixC; c++) {
            let occurres = true
            for (let y = 0; y < patternR; y++) {
                if (occurres === false) break
                for (let x = 0; x < patternC; x++) {
                    if (patternMatrix[y][x] === '.') continue
                    if (
                        r + y >= matrixR ||
                        c + x >= matrixC ||
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

const XMASPatterns = [
    [['X', 'M', 'A', 'S']],
    [['S', 'A', 'M', 'X']],
    [['X'], ['M'], ['A'], ['S']],
    [['S'], ['A'], ['M'], ['X']],
    [
        ['.', '.', '.', 'X'],
        ['.', '.', 'M', '.'],
        ['.', 'A', '.', '.'],
        ['S', '.', '.', '.'],
    ],
    [
        ['X', '.', '.', '.'],
        ['.', 'M', '.', '.'],
        ['.', '.', 'A', '.'],
        ['.', '.', '.', 'S'],
    ],
    [
        ['.', '.', '.', 'S'],
        ['.', '.', 'A', '.'],
        ['.', 'M', '.', '.'],
        ['X', '.', '.', '.'],
    ],
    [
        ['S', '.', '.', '.'],
        ['.', 'A', '.', '.'],
        ['.', '.', 'M', '.'],
        ['.', '.', '.', 'X'],
    ],
]

const occurences = XMASPatterns.map((p) => lookForPattern(p, matrix)).reduce(
    (acc, curr) => acc + curr,
    0
)

// part 1 solution
console.log(occurences)

const MASPatterns = [
    [
        ['M', '.', 'S'],
        ['.', 'A', '.'],
        ['M', '.', 'S'],
    ],
    [
        ['M', '.', 'M'],
        ['.', 'A', '.'],
        ['S', '.', 'S'],
    ],
    [
        ['S', '.', 'M'],
        ['.', 'A', '.'],
        ['S', '.', 'M'],
    ],
    [
        ['S', '.', 'S'],
        ['.', 'A', '.'],
        ['M', '.', 'M'],
    ],
]

const occ = MASPatterns
    .map((p) => lookForPattern(p, matrix))
    .reduce((acc, curr) => acc + curr, 0)

// part 2 solution
console.log(occ) // 1890
