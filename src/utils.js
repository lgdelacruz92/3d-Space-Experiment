export const map = (input, input_start, input_end, output_start, output_end) => {
    return output_start + ((output_end - output_start) / (input_end - input_start)) * (input - input_start)
}


export const randomVec = () => {
    return { x: map(Math.random(), 0, 1, -0.1, 0.1),
        y: map(Math.random(), 0, 1, -0.1, 0.1),
        z: map(Math.random(), 0, 1, -0.1, 0.1) 
    }
}