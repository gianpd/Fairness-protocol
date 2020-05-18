import { readSync } from "fs";

type ID = string;
type BoardMap = Map<number, ID[]>

export type Node = {
    id: ID;
    start: Date;
    utility: number;
    balance: number;
    dependencies?: BoardMap

}

export type Graph = Map<ID, ID[][]>;

/**
 * Conflict Graph from nodes: creates a CG for nodes having dependencies
 */

 export const makeCGfromNodes = (nodes: Node[]): Graph => {
     const graph: Graph = new Map();
     //const resources = new Map<ID, Node[]>();
     const conflict: ID[][] = []
     
     for (const n of nodes) {
         console.log('node id: ', n.id, 'dependecies: ', n.dependencies)
         if (n.dependencies) {
            for ( const d of n.dependencies.values() ) {
                conflict.push(d)
                //graph.set(n.id,  d);
            }
            graph.set(n.id,  conflict);
         }
      }
      return graph;
    };

