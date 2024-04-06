import labyrinthos from 'labyrinthos';
import fs from 'fs';
import Srand from 'seeded-rand';

let map = null
let seed = 42
let mapFilter = ['.', '@']
let generatorFunction = (map,_) => map.fill(0)
let options = {}

let config = null

export function createMap(width, height){
    map = new labyrinthos.TileMap({
        width: width,
        height: height
    })
    map.fill(1)
    map.seed(seed)
    map.defaultRogueLike = mapFilter
}

export function createConfig(numberOfAgents){
    config = {
        "mapFile": "map.map",
        "agentFile": "agents.agents",
        "teamSize": numberOfAgents,
        "taskFile": "tasks.tasks",
        "numTasksReveal": 1,
        "taskAssignmentStrategy": "roundrobin"
    }
    
    //write config file
    fs.mkdir("./out", () => {})
    const configFileWriter = fs.createWriteStream('out/config.json')
    configFileWriter.write(JSON.stringify(config, null, " "))
    configFileWriter.close()
}

export function generateMap(){
    generatorFunction(map, options)

    const mapFileWriter = fs.createWriteStream(`out/${config.mapFile}`)
    mapFileWriter.write('type octile\n')
    mapFileWriter.write(`height ${map.height}\n`)
    mapFileWriter.write(`width ${map.width}\n`)
    mapFileWriter.write('map\n')
    mapFileWriter.write(map.mask()[0])
    mapFileWriter.close()
}

export function generateTasks(numberOfTasks, onlyUniqueTasks){
    const tasks = new Set()
    const taskArr = []

    for(let i=0;i<numberOfTasks;i++){
        let x, y
        do{
            [x, y] = getRandomCoordinate()
        } while(map.getTileAt(x,y) == 1 ||
                    ( onlyUniqueTasks && tasks.has(XYtoInt(x,y)) )
                )
        
        tasks.add(XYtoInt(x, y))
        taskArr.push(XYtoInt(x, y))
    }

    //write tasks to file
    const taskFileWriter = fs.createWriteStream(`out/${config.taskFile}`)
    taskFileWriter.write(`${numberOfTasks}\n`)
    taskFileWriter.write(taskArr.join('\n'))
    taskFileWriter.close()
}

export function generateAgents(numberOfAgents){
    const agents = new Set()

    for(let i=0;i<numberOfAgents;i++){
        let x, y
        do{
            [x, y] = getRandomCoordinate()
        } while( map.getTileAt(x,y) == 1 || agents.has(XYtoInt(x,y)) )
        
        agents.add(XYtoInt(x,y))
    }

    //write agents to file
    const agentFileWriter = fs.createWriteStream(`out/${config.agentFile}`)
    agentFileWriter.write(`${numberOfAgents}\n`)
    agentFileWriter.write(Array.from(agents).join('\n'))
    agentFileWriter.close()
}

export const setSeed = n => {
    seed = n
    Srand.seed(seed)
    map?.seed(seed)
}

export const setFilter = (arr=null) => {
    if(arr===null || arr===undefined)
        mapFilter =
            (generatorFunction == labyrinthos.mazes.ThomasHunter) ? ['.', '.', '@'] :
            (generatorFunction == labyrinthos.mazes.BeattieSchoberth ||
                generatorFunction == labyrinthos.mazes.Metroidvania ) ? ['.', '@', '.'] :
            ['.', '@'];
    else
        mapFilter = arr
    map.defaultRogueLike = mapFilter
}

export const setGeneratorFunction = genfun => {
    generatorFunction = genfun
}

export const setGeneratorOptions = generatorOptions => {
    options = generatorOptions || {}
}


const getRandomCoordinate = () => [
    Srand.intInRange(0, map.width-1),
    Srand.intInRange(0, map.height-1)
]

const XYtoInt = (x,y) => y*map?.width+x