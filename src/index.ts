import { Node, ConflictGraph, NodesCollection } from "./conflictGraph";
import { recursive_cg_solve, mwis_dp } from './solver'
import { doExtraction } from './board'

import hasha  from 'hasha'


let board1 = Date.now()
let board2 = board1 + Date.now() + Math.random()
let borard3 = board2 + Date.now() + Math.random()

// Init nodes
let nodes: Node[] = [
    {
       id: '0',
       start: new Date('2020-01-01'),
       utility: 100,
       balance: Math.random()*1000,
       dependencies: new Map([
           [board1, ['1']],
           [borard3, ['1', '4']]
       ]),
       tickets: new Set()
   },

   {
       id: '1',
       start: new Date('2020-01-02'),
       utility: 70,
       balance: Math.random()*1000,
       dependencies: new Map([
           [board1, ['0']],
           [borard3, ['0', '4']]
       ]),
       tickets: new Set()
   },

   {
       id: '2',
       start: new Date('2020-01-02'),
       utility: 560,
       balance: Math.random()*1000,
       dependencies: new Map([
           [board2, ['3', '4']]
       ]),
       tickets: new Set()
   },

   {
       id: '3',
       start: new Date('2020-01-02'),
       utility: 580,
       balance: Math.random()*1000,
       dependencies: new Map([
           [board2, ['2', '4']]
       ]),
       tickets: new Set()
   },

   {
       id: '4',
       start: new Date('2020-01-02'),
       utility: 100,
       balance: Math.random()*1000,
       dependencies: new Map([
           [board2, ['2', '3']],
           [borard3, ['0', '1']]
           ]),
      tickets: new Set()
   },

   {
     id: '5',
     start: new Date('2020-01-05'),
     utility: 450,
     balance: Math.random()*1000,
     tickets: new Set()
    }
]

// Init Collection of nodes
let nodeCollection = new NodesCollection(nodes)



// Init CG object
let CG = new ConflictGraph(nodes.length)
// Get Utilities from nodes
const utilities = CG.get_utilities(nodes)
console.log('utilities: ', utilities)
console.log('First CG:')
const graph = CG.makeCGfromNodes(nodes);
console.log('Conflict Graph:', graph)
console.log('Second CG:')
const graph_1 = CG.makeCGfromNodes(nodes);
console.log('===== Start solver =====')
const [opt_sol, opt_graph] = mwis_dp(graph, utilities)
console.log(' MWIS Dynamic Programming Solution: ', opt_sol)
console.log(' MWIS Dynamic Programming Optimal Graph: ', opt_graph)
console.log('===== Recursive algorithm started =====')
const start = new Date().getTime()
const cg = recursive_cg_solve(graph_1, utilities, 0)
const elapsed = new Date().getTime() - start
console.log('Recursive solution: ', cg, 'Elapsed time: ', elapsed, '[ms]')


//Get final Lucky nodes
const lucky_nodes = nodeCollection.get_lucky_nodes(nodes, opt_sol)
console.log('Final Lucky Nodes: ', lucky_nodes)

//Simulate Lottery Extraction

const hash: string = hasha('Initial hash', {algorithm: 'sha256'})

doExtraction(lucky_nodes, hash)

console.log('Final Lucky Nodes & their tickets: ', lucky_nodes)

lucky_nodes.forEach(node => console.log(`number of tickets for node ${node.id}, with utility=${node.utility} gets ${[...node.tickets.values()].length} tickets (${Math.round(([...node.tickets.values()].length/1000)*100)} % of MaxNumberOfTickets)`))
