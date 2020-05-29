"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const conflictGraph_1 = require("./conflictGraph");
const solver_1 = require("./solver");
const board_1 = require("./board");
const hasha_1 = __importDefault(require("hasha"));
let board1 = Date.now();
let board2 = board1 + Date.now() + Math.random();
let borard3 = board2 + Date.now() + Math.random();
// Init nodes
let nodes = [
    {
        id: '0',
        start: new Date('2020-01-01'),
        utility: 100,
        balance: Math.random() * 1000,
        dependencies: new Map([
            [board1, ['1']],
            [borard3, ['1', '4']]
        ]),
        tickets: []
    },
    {
        id: '1',
        start: new Date('2020-01-02'),
        utility: 70,
        balance: Math.random() * 1000,
        dependencies: new Map([
            [board1, ['0']],
            [borard3, ['0', '4']]
        ]),
        tickets: []
    },
    {
        id: '2',
        start: new Date('2020-01-02'),
        utility: 560,
        balance: Math.random() * 1000,
        dependencies: new Map([
            [board2, ['3', '4']]
        ]),
        tickets: []
    },
    {
        id: '3',
        start: new Date('2020-01-02'),
        utility: 580,
        balance: Math.random() * 1000,
        dependencies: new Map([
            [board2, ['2', '4']]
        ]),
        tickets: []
    },
    {
        id: '4',
        start: new Date('2020-01-02'),
        utility: 100,
        balance: Math.random() * 1000,
        dependencies: new Map([
            [board2, ['2', '3']],
            [borard3, ['0', '1']]
        ]),
        tickets: []
    },
    {
        id: '5',
        start: new Date('2020-01-05'),
        utility: 450,
        balance: Math.random() * 1000,
        tickets: []
    }
];
// Init Collection of nodes
let nodeCollection = new conflictGraph_1.NodesCollection(nodes);
// Init CG object
let CG = new conflictGraph_1.ConflictGraph(nodes.length);
// Get Utilities from nodes
const utilities = CG.get_utilities(nodes);
console.log('utilities: ', utilities);
console.log('First CG:');
const graph = CG.makeCGfromNodes(nodes);
console.log('Conflict Graph:', graph);
console.log('Second CG:');
const graph_1 = CG.makeCGfromNodes(nodes);
console.log('===== Start solver =====');
const [opt_sol, opt_graph] = solver_1.mwis_dp(graph, utilities);
console.log(' MWIS Dynamic Programming Solution: ', opt_sol);
console.log(' MWIS Dynamic Programming Optimal Graph: ', opt_graph);
console.log('===== Recursive algorithm started =====');
const start = new Date().getTime();
const cg = solver_1.recursive_cg_solve(graph_1, utilities, 0);
const elapsed = new Date().getTime() - start;
console.log('Recursive solution: ', cg, 'Elapsed time: ', elapsed, '[ms]');
//Get final Lucky nodes
const lucky_nodes = nodeCollection.get_lucky_nodes(nodes, opt_sol);
console.log('Final Lucky Nodes: ', lucky_nodes);
//Simulate Lottery Extraction
const hash = hasha_1.default('Initial hash', { algorithm: 'sha256' });
board_1.doExtraction(lucky_nodes, hash);
console.log('Final Lucky Nodes & their tickets: ', lucky_nodes);
lucky_nodes.forEach(node => console.log(`number of tickets for node ${node.id}, with utility=${node.utility}: ${node.tickets.length}`));
