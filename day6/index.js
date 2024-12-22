const fs = require("fs")

const content = fs.readFileSync('./day6/file.data', 'UTF-8')

const initialState = {
    walls: [],
    direction: 0, // Directions 0 - up, 1 - right, 2 - down, 3 - left
    guardian: {},
    height: 0,
    width: 0,
}

content.split('\n').map((v, r) => {
    initialState.height = Math.max(initialState.height, r + 1)
    v.split('').forEach((obj, c) => {
        initialState.width = Math.max(initialState.width, c + 1)
        if (obj === '#') {
            initialState.walls.push({ r, c })
        }
        if (obj === '^') {
            initialState.guardian = { r, c }
        }
    })
})

console.log(initialState)

function arePointsSame(p1, p2) {
    return p1.r === p2.r && p1.c === p2.c
}

function isOutOfBounds(position, width, height) {
    return (
        position.r >= height ||
        position.r < 0 ||
        position.c >= width ||
        position.c < 0
    )
}

let loopCounter = 0

function nextStep(state, steps = []) {
    let stepsCopy = [...steps]
    const { direction, guardian, walls, width, height } = state
    let nextPosition = { r: guardian.r, c: guardian.c }
    if (direction === 0) {
        nextPosition.r -= 1
    } else if (direction === 1) {
        nextPosition.c += 1
    } else if (direction === 2) {
        nextPosition.r += 1
    } else if (direction === 3) {
        nextPosition.c -= 1
    }
    nextPosition.direction = direction
    if (isOutOfBounds(nextPosition, width, height)) {
        return steps
    }
    if (walls.find((w) => arePointsSame(w, nextPosition))) {
        return nextStep({ ...state, direction: (direction + 1) % 4 }, steps)
    }

    state.guardian = { r: nextPosition.r, c: nextPosition.c }

    let sameStep = steps.find((s) => arePointsSame(s, nextPosition))
    if (!sameStep) {
        stepsCopy.push({ ...nextPosition })
    } else {
        if (sameStep.direction === nextPosition.direction) {
            loopCounter++
            return steps
        }
    }
    return nextStep(state, stepsCopy)
}

const steps = nextStep({ ...initialState }, [
    { ...initialState.guardian, direction: initialState.direction },
])

// part 1 solution
console.log(steps.length)

for (const s of steps) {
    const stateCopy = {...initialState, walls: [...initialState.walls, {r: s.r, c: s.c}]}
    try {
        nextStep(stateCopy)
    } catch (e) {
        console.error(e)
    }
}

// part 2 solution
console.log(loopCounter)

