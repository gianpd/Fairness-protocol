export type ID = string;
export type BoardMap = Map<number, ID[]>
export type Graph = Map<ID, Set<ID[]>>;

export interface Node  {
    readonly id: ID;
    readonly start: Date;
    readonly utility: number;
    readonly balance: number;
    readonly dependencies?: BoardMap;
    
}



/**
 * Conflict Graph from nodes: creates a CG for nodes having dependencies
 */
export class ConflictGraph  {
    private nNodes: number;
    

    constructor(nNodes: number) {
        this.nNodes = nNodes
        
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

    makeCGfromNodes = (nodes: Node[]): Graph => {
        const graph: Graph = new Map();
        //const conflict: ID[] = [];
        
        for (const n of nodes) {
            if (n.dependencies) {
                console.log('node id: ', n.id, 'dependecies: ', n.dependencies)
                const dependecies: string[] = []
                n.dependencies.forEach(e => e.forEach(s => dependecies.push(s)))
                const Udependecies = [...new Set([...dependecies])]  //Do an array with unique dependencies coming from different Boards
                graph.set(n.id, new Set([Udependecies]))
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


