import labyrinthos from 'labyrinthos';
import * as utils from './utils.js'

const options = {
    mapWidth: 250,
    mapHeight: 100,
    seed: Math.floor(Math.random()*999999999),
    generator: labyrinthos.mazes.Metroidvania,
    generatorOptions: {retries:10},
    filter: null,
    numberOfTasks: 100,
    onlyUniqueTasks: true,
    numberOfAgents: 20,
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
