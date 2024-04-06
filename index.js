import labyrinthos from 'labyrinthos';
import * as utils from './utils.js'

/*
GENERATORS:

labyrinthos.mazes.
    AldousBroder
    BinaryTree
    CellularAutomata
    EllersAlgorithm
    GrowingTree
    RecursiveBacktrack
    RecursiveDivision
    ThomasHunter
    BeattieSchoberth
    Metroidvania

FOR EMPTY MAP:
(map,_) => map.fill(0)

*/



const options = {
    mapWidth: 150,
    mapHeight: 100,
    seed: Math.floor(Math.random()*999999999),
    generator: labyrinthos.mazes.Metroidvania,
    generatorOptions: {retries:10}, // generatorOptions: {}
    filter: null,
    numberOfTasks: 2000,
    onlyUniqueTasks: false,
    numberOfAgents: 40,
}

console.log('generatorOptions: ', options)

utils.setSeed(options.seed)

utils.createConfig(options.numberOfAgents)


utils.createMap(options.mapWidth, options.mapHeight)
utils.setGeneratorFunction(options.generator)
utils.setFilter(options.filter)
utils.setGeneratorOptions(options.generatorOptions)
utils.generateMap()


utils.generateTasks(options.numberOfTasks, options.onlyUniqueTasks)
utils.generateAgents(options.numberOfAgents)



/*
GENERATOR OPTIONS

CellularAutomata
    options.wallChance || 0.45
    options.iterations || 4
    options.neighborThreshold || 4
ThomasHunter
    options.roomCount
    options.roomMinWidth
    options.roomMaxWidth
    options.roomMinHeight
    options.roomMinHeight
BeattieSchoberth
    options.roomHeight
    options.roomWidth
Metroidvania
    options.retries || 4 (4 is a safe number, 5-8 is fine, 10 can start to pause slower systems)
*/

/*
EXAMPLE

options = {
    mapWidth: 150,
    mapHeight: 100,
    seed: Math.floor(Math.random()*999999999),
    generator: labyrinthos.mazes.Metroidvania,
    generatorOptions: {retries:10}, // generatorOptions: {}
    filter: null,
    numberOfTasks: 2000,
    onlyUniqueTasks: false,
    numberOfAgents: 40,
}

options = {
    mapWidth: 160,
    mapHeight: 20,
    seed: 12,
    generator: labyrinthos.mazes.CellularAutomata,
    generatorOptions: {wallChance:0.3,iterations:2,neighborThreshold:3},
    filter: null,
    numberOfTasks: 2000,
    onlyUniqueTasks: false,
    numberOfAgents: 40,
}
*/