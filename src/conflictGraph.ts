export type ID = string;
export type BoardMap = Map<number, ID[]>

export type Node = {
    id: ID;
    start: Date;
    utility: number;
    balance: number;
    dependencies?: BoardMap

}

export type Graph = Map<ID, Set<ID[]>>;

/**
 * Conflict Graph from nodes: creates a CG for nodes having dependencies
 */

 export const makeCGfromNodes = (nodes: Node[]): Graph => {
     const graph: Graph = new Map();
     //const conflict: ID[] = [];
     
     for (const n of nodes) {
         console.log('node id: ', n.id, 'dependecies: ', n.dependencies)
         if (n.dependencies) {
             graph.set(n.id, new Set([...n.dependencies.values()]))
        }
    }
    
    return graph;
    };


export const get_utilities = (nodes: Node[]): Map<string, number> => {

    let utilities: Map<string, number> = new Map();
    //nodes.forEach(n => utilities.push(n.utility))
    nodes.forEach(n => utilities.set(n.id, n.utility))
    return utilities
}