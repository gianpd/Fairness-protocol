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
 * NodesCollection class: it manages a collection of nodes, allowing to get the final Lucky nodes having the right to be part of the Lottery exctraction
 */

export class NodesCollection {

    constructor(public nodes: Node[] = []) {
      // no statements required
    }

    addNode(node: Node) {
        this.nodes.push(node)
    }

    getNodeById(id: string): Node {
        return this.nodes.find(node => node.id === id);
    }
    
    get_lucky_nodes(nodes: Node[], cnodes: Set<string>): Node[] {
        // get the final nodes having the right to do the lottery extraction. 
    
        let lucky_nodes: string[] = []
        let final_nodes: Node[] = []
        
        
        //add nodes without dependencies
        nodes.forEach(e => { if (!e.dependencies) lucky_nodes.push(e.id)})
    
        //add nodes coming from the conflict graph's optimal solution
        cnodes.forEach(e => lucky_nodes.push(e))

        lucky_nodes.forEach(nodeId => final_nodes.push(this.getNodeById(nodeId)))
    
        return final_nodes
    }
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
