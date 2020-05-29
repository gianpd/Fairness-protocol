"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConflictGraph = void 0;
/**
 * Conflict Graph from nodes: creates a CG for nodes having dependencies
 */
class ConflictGraph {
    constructor(nNodes) {
        this.makeCGfromNodes = (nodes) => {
            const graph = new Map();
            //const conflict: ID[] = [];
            for (const n of nodes) {
                console.log('node id: ', n.id, 'dependecies: ', n.dependencies);
                if (n.dependencies) {
                    const dependecies = [];
                    n.dependencies.forEach(e => e.forEach(s => dependecies.push(s)));
                    const Udependecies = [...new Set([...dependecies])]; //Do an array with unique dependencies coming from different Boards
                    graph.set(n.id, new Set([Udependecies]));
                }
            }
            return graph;
        };
        this.get_utilities = (nodes) => {
            let utilities = new Map();
            //nodes.forEach(n => utilities.push(n.utility))
            nodes.forEach(n => utilities.set(n.id, n.utility));
            return utilities;
        };
        this.nNodes = nNodes;
    }
    get nVertex() {
        return this.nNodes;
    }
    set nVertex(value) {
        if (value < 0) {
            value = 0;
        }
        this.nNodes = value;
    }
}
exports.ConflictGraph = ConflictGraph;
