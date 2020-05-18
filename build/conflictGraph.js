"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCGfromNodes = void 0;
/**
 * Conflict Graph from nodes: creates a CG for nodes having dependencies
 */
exports.makeCGfromNodes = (nodes) => {
    const graph = new Map();
    //const conflict: ID[] = [];
    for (const n of nodes) {
        console.log('node id: ', n.id, 'dependecies: ', n.dependencies);
        if (n.dependencies) {
            graph.set(n.id, new Set([...n.dependencies.values()]));
        }
    }
    return graph;
};
