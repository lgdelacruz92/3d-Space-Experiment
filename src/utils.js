export const map = (input, input_start, input_end, output_start, output_end) => {
    return output_start + ((output_end - output_start) / (input_end - input_start)) * (input - input_start)
}


export const randomVec = () => {
    return { x: map(Math.random(), 0, 1, -0.1, 0.1),
        y: map(Math.random(), 0, 1, -0.1, 0.1),
        z: map(Math.random(), 0, 1, -0.1, 0.1) 
    }
}

export const dist = (p1, p2) => {
    const x_sq = (p1.x - p2.x) * (p1.x - p2.x);
    const y_sq = (p1.y - p2.y) * (p1.y - p2.y);
    const z_sq = (p1.z - p2.z) * (p1.z - p2.z);
    return Math.sqrt(x_sq + y_sq + z_sq);
}