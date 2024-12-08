const fs = require('fs')

const content = fs.readFileSync('./day5/file.data', 'utf-8')

const rules = []
const updates = []



content.split('\n').forEach((e) => {
    if (e.includes('|')) {
        rules.push(e.split('|').map((n) => parseInt(n)))
    } else if (e.includes(',')) {
        updates.push(e.split(',').map((n) => parseInt(n)))
    }
})

function isValidUpdate(update) {
    for (let i = 0; i < update.length; i++) {
        const before = []
        const after = []
        rules.forEach(e => {
            if (e[0] === update[i]) before.push(e[1])
            else if (e[1] === update) after.push(e[0])
        })

        for (let x = 0; x < update.length; x++) {
            if (x === i) continue
            if (x < i && before.includes(update[x])) return false
            else if (x > i && after.includes(update[x])) return false
        }
    }
    return true
}

// part 1 solution
console.log(updates.filter(u => isValidUpdate(u)).reduce((acc, curr) => acc + curr[Math.floor(curr.length / 2)], 0))

const incorrectUpdates = updates.filter(u => !isValidUpdate(u))

function fixUpdate(update) {
    for (let i = 0; i < update.length; i++) {
        const before = []
        const after = []
        rules.forEach(e => {
            if (e[0] === update[i]) before.push(e[1])
            else if (e[1] === update) after.push(e[0])
        })

        for (let x = 0; x < update.length; x++) {
            if (x === i) continue
            if (x < i && before.includes(update[x])) {
                [update[x], update[i]] = [update[i], update[x]]
            }
            else if (x > i && after.includes(update[x])) {
                [update[x], update[i]] = [update[i], update[x]]
            }
        }
    }
    return update
}

// part 2 solution
console.log(incorrectUpdates.map(iu => fixUpdate([...iu])).reduce((acc, curr) => acc + curr[Math.floor(curr.length / 2)], 0))