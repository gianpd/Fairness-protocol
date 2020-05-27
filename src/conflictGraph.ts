export type ID = string;
export type BoardMap = Map<number, ID[]>
export type Graph = Map<ID, Set<ID[]>>;

export interface Node  {
    readonly id: ID;
    readonly start: Date;
    utility: number;
    balance: number;
    readonly dependencies?: BoardMap;
    
}

//export interface SuperNode extends Node {

//}


/**
 * Conflict Graph from nodes: creates a CG for nodes having dependencies
 */



export class conflictGraph  {
    private nNodes: number;
    private utilities: number[]

    constructor(nNodes: number, utilities: number[]) {
        this.nNodes = nNodes
        this.utilities = utilities
    }

    get nVertex(): number {
        return this.nNodes
    }

    set nVertex(value: number ) {
        if (value < 0) {
            value = 0
        }
        this.nNodes = value;
    }

    get utility(): number[] {
        return this.utilities
    }

    

    makeCGfromNodes = (nodes: Node[]): Graph => {
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
    
       get_utilities = (nodes: Node[]): Map<string, number> => {
        let utilities: Map<string, number> = new Map();
        //nodes.forEach(n => utilities.push(n.utility))
        nodes.forEach(n => utilities.set(n.id, n.utility))
        
        return utilities
    }

}

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