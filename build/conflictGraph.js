"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConflictGraph = exports.NodesCollection = void 0;
/**
 * NodesCollection class: it manages a collection of nodes, allowing to get the final Lucky nodes having the right to be part of the Lottery exctraction
 */
class NodesCollection {
    constructor(nodes = []) {
        this.nodes = nodes;
        // no statements required
    }
    addNode(node) {
        this.nodes.push(node);
    }
    getNodeById(id) {
        return this.nodes.find(node => node.id === id);
    }
    get_lucky_nodes(nodes, cnodes) {
        // get the final nodes having the right to do the lottery extraction. 
        let lucky_nodes = [];
        let final_nodes = [];
        //add nodes without dependencies
        nodes.forEach(e => { if (!e.dependencies)
            lucky_nodes.push(e.id); });
        //add nodes coming from the conflict graph's optimal solution
        cnodes.forEach(e => lucky_nodes.push(e));
        lucky_nodes.forEach(nodeId => final_nodes.push(this.getNodeById(nodeId)));
        return final_nodes;
    }
}
exports.NodesCollection = NodesCollection;
/**
 * Conflict Graph from nodes: creates a CG for nodes having dependencies
 */
class ConflictGraph {
    constructor(nNodes) {
        this.makeCGfromNodes = (nodes) => {
            const graph = new Map();
            //const conflict: ID[] = [];
            for (const n of nodes) {
                if (n.dependencies) {
                    console.log('node id: ', n.id, 'dependecies: ', n.dependencies);
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
