# mazer

## Setup

```
npm i
node index.js
```

or

```
npm i
npm run devStart
```

Then press `ctrl + S` (save) in `index.js`.



## Available generators

* `labyrinthos.mazes.AldousBroder`
* `labyrinthos.mazes.BinaryTree`
* `labyrinthos.mazes.CellularAutomata`
* `labyrinthos.mazes.EllersAlgorithm`
* `labyrinthos.mazes.GrowingTree`
* `labyrinthos.mazes.RecursiveBacktrack`
* `labyrinthos.mazes.RecursiveDivision`
* `labyrinthos.mazes.ThomasHunter`
* `labyrinthos.mazes.BeattieSchoberth`
* `labyrinthos.mazes.Metroidvania`

### Empty map

``` js
(map,_) => map.fill(0)
```



## Available generator options

### CellularAutomata

* `wallChance` : 0.45
* `iterations` : 4
* `neighborThreshold` : 4

### ThomasHunter

* `roomCount`
* `roomMinWidth`
* `roomMaxWidth`
* `roomMinHeight`
* `roomMaxHeight`

### BeattieSchoberth

* `roomHeight`
* `roomWidth`

### Metroidvania

* `retries` : 4




## Example options

``` js
{
    mapWidth: 10,
    mapHeight: 10,
    seed: Math.floor(Math.random()*999999999),
    generator: (map,_) => map.fill(0),
    generatorOptions: {},
    filter: null,
    numberOfTasks: 20,
    onlyUniqueTasks: true,
    numberOfAgents: 0,
}
```

``` js
{
    mapWidth: 40,
    mapHeight: 15,
    seed: 12,
    generator: labyrinthos.mazes.CellularAutomata,
    generatorOptions: {wallChance:0.3, iterations:2, neighborThreshold:3},
    filter: ['.', '#'],
    numberOfTasks: 20,
    onlyUniqueTasks: true,
    numberOfAgents: 0,
}
```

``` js
{
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
```
