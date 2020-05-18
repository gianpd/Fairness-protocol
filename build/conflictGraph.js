"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCGfromNodes = void 0;
/**
 * Conflict Graph from nodes: creates a CG for nodes having dependencies
 */
exports.makeCGfromNodes = (nodes) => {
    const graph = new Map();
    //const resources = new Map<ID, Node[]>();
    const conflict = [];
    for (const n of nodes) {
        console.log('node id: ', n.id, 'dependecies: ', n.dependencies);
        if (n.dependencies) {
            for (const d of n.dependencies.values()) {
                conflict.push(d);
                //graph.set(n.id,  d);
            }
            graph.set(n.id, conflict);
        }
    }
    return graph;
};
