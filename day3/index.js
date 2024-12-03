const fs = require('fs')

const content = fs.readFileSync('./day3/file.data', 'utf-8')

const FUNC = "mul("
const DONT = "don't()"
const DO = "do()"

const isNumber = (digit) => {
    return digit >= '0' && digit <= '9'
}

const cleanState = () => {
    return ({
        funcFound: false,
        commaFound: false,
        first: undefined,
        second: undefined,
    })
}

function calculate() {
    let state = cleanState()

    let sum = 0

    let i = 4
    while (i < content.length) {
        if (state.funcFound) {
            if (isNumber(content[i])) {
                const currentNum = parseInt(content[i])
                if (state.commaFound) {
                    if (state.second === undefined) {
                        state.second = currentNum
                    } else {
                        state.second = state.second * 10 + currentNum
                    }
                } else {
                    if (state.first === undefined) {
                        state.first = currentNum
                    } else {
                        state.first = state.first * 10 + currentNum
                    }
                }
            } else if (content[i] === ',' && state.first !== undefined) {
                state.commaFound = true
            } else if (content[i] === ')' && state.first !== undefined && state.second !== undefined) {
                sum += state.first * state.second
                state = cleanState()
                i++
                continue
            } else {
                state = cleanState()
                i++
                continue
            }
        } else if (content.substring(i - 4, i) === FUNC) {
            state.funcFound = true
            continue
        }
        i++
    }
    return sum
}

// part 1 solution
console.log(calculate())

function calculate2() {
    let state = cleanState()

    let shouldAdd = true
    let sum = 0

    let i = 4
    while (i < content.length) {
        if (content.substring(i - DO.length, i) === DO) {
            shouldAdd = true
        } else if (content.substring(i - DONT.length, i) === DONT) {
            shouldAdd = false
        } else if (state.funcFound) {
            if (isNumber(content[i])) {
                const currentNum = parseInt(content[i])
                if (state.commaFound) {
                    if (state.second === undefined) {
                        state.second = currentNum
                    } else {
                        state.second = state.second * 10 + currentNum
                    }
                } else {
                    if (state.first === undefined) {
                        state.first = currentNum
                    } else {
                        state.first = state.first * 10 + currentNum
                    }
                }
            } else if (content[i] === ',' && state.first !== undefined) {
                state.commaFound = true
            } else if (content[i] === ')' && state.first !== undefined && state.second !== undefined) {
                if (shouldAdd) {
                    sum += state.first * state.second
                }
                state = cleanState()
                i++
                continue
            } else {
                state = cleanState()
                i++
                continue
            }
        } else if (content.substring(i - FUNC.length, i) === FUNC) {
            state.funcFound = true
            continue
        }
        i++
    }
    return sum
}

// part 2 solution
console.log(calculate2())