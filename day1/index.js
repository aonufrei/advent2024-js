const fs = require('fs')

const data = fs.readFileSync('./day1/file.data', 'utf-8')
const left = []
const right = []
data.split('\n').forEach((line) => {
    const ldata = line
        .split(' ')
        .filter((it) => it !== '')
        .map((it) => parseInt(it))
    left.push(ldata[0])
    right.push(ldata[1])
})

left.sort((f, s) => f - s)
right.sort((f, s) => f - s)

let diff = left.reduce((acc, curr, idx) => acc + Math.abs(curr - right[idx]), 0)

// part 1 solution
console.log(diff)

const dict = new Map(left.map(it => [it, 0]))
right.forEach(it => {
    if (dict.has(it)) {
        dict.set(it, dict.get(it) + 1)
    }
})

let sim = 0
dict.forEach((v, k) => sim += v * k)

// part 2 solution
console.log(sim)