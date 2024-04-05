import labyrinthos from 'labyrinthos';
import fs from 'fs';
import Srand from 'seeded-rand';

/*
interface mazes {
  AldousBroder: MazeGeneratorFunction;
  BinaryTree: MazeGeneratorFunction;
  CellularAutomata: MazeGeneratorFunction;
  EllersAlgorithm: MazeGeneratorFunction;
  GrowingTree: MazeGeneratorFunction;
  RecursiveBacktrack: MazeGeneratorFunction;
  RecursiveDivision: MazeGeneratorFunction;
  ThomasHunter: MazeGeneratorFunction;
  BeattieSchoberth: MazeGeneratorFunction;
  Metroidvania: MazeGeneratorFunction;
}
*/

const generatorFunction = labyrinthos.mazes.BinaryTree;
const options = {}
const mapFilter =
    (generatorFunction == labyrinthos.mazes.ThomasHunter) ? ['.', '.', '@'] :
    (generatorFunction == labyrinthos.mazes.BeattieSchoberth ||
        generatorFunction == labyrinthos.mazes.Metroidvania ) ? ['.', '@', '.'] :
    ['.', '@'];

const seed = Math.floor(Math.random()*999999999)
console.log('seed: ', seed)
Srand.seed(seed)

const numberOfTasks = 200
const onlyUniqueTasks = true
const numberOfAgents = 40

const map = new labyrinthos.TileMap({
    width: 50,
    height: 50
  })

const getRandomCoordinate = () => [
    Srand.intInRange(0, map.width),
    Srand.intInRange(0, map.height)
]

const XYtoInt = (x,y) => y*map.width+x


//initialize map
map.defaultRogueLike = mapFilter

map.seed(seed)
map.fill(1)

//generate map
generatorFunction(map, options);

//create config
const config = {
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

//write map to file
const mapFileWriter = fs.createWriteStream(`out/${config.mapFile}`)
mapFileWriter.write('type octile\n')
mapFileWriter.write(`height ${map.height}\n`)
mapFileWriter.write(`width ${map.width}\n`)
mapFileWriter.write('map\n')
mapFileWriter.write(map.mask()[0])
mapFileWriter.close()

//create tasks
const tasks = new Set()

for(let i=0;i<numberOfTasks;i++){
    let x, y
    do{
        [x, y] = getRandomCoordinate()
    } while(map.getTileAt(x,y) == 1 ||
                ( onlyUniqueTasks && tasks.has(XYtoInt(x,y)) )
            )
    
    tasks.add(XYtoInt(x,y))
}

//write tasks to file
const taskFileWriter = fs.createWriteStream(`out/${config.taskFile}`)
taskFileWriter.write(`${numberOfTasks}\n`)
taskFileWriter.write(Array.from(tasks).join('\n'))
taskFileWriter.close()

//create agents
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
