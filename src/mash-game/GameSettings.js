const easyGameSettings = {
    emergeInterval : 1000,
    vanishInterval : 1000,
    lives : 10,
}
const normalGameSettings = {
    emergeInterval : 400,
    vanishInterval : 800,
    lives : 5,
}
const hardGameSettings = {
    emergeInterval : 250,
    vanishInterval : 750,
    lives : 3
}

export const gameSettings = {
    easy : easyGameSettings,
    normal : normalGameSettings,
    hard : hardGameSettings,
}
export const boardSizes = {
    small : 3,
    large : 5,
}