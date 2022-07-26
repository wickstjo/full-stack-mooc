// RESET CONSOLE EACH RUN
console.clear()

interface Input {
    minimum?: number;
    exactly?: number;
}

// EXTRACT PROCESS ARGS
const extract_args = (input: Input) => {
    
    // DESTRUCTURE ARGS
    const { minimum, exactly } = input;

    // EXTRACT RELEVANT ARGS
    const args = process.argv.slice(2);

    // ENFORCE MIN ARGS LENGTH
    if (minimum && args.length < minimum) {
        throw new Error(`Too few arguments given (min ${ minimum }, given ${ args.length })`);
    }

    // ENFORCE EXACT LENGTH
    if (exactly && args.length !== exactly) {
        throw new Error(`Incorrect number of arguments (expected ${ exactly }, given ${ args.length })`);
    }

    // VERIFY THAT ALL VALUES ARE NUMBERS
    return args.map(item => {
        if (isNaN(Number(item))) {
            throw new Error(`Input args contain strings, which are not allowed.`);
        }

        return Number(item)
    })
}

export {
    extract_args,
}