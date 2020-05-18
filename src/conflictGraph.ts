import { readSync } from "fs";

type ID = string;

export type Node = {
    id: ID;
    start: Date;
    utility: number;
    balance: number;
    //board: number[];
    resourceId: ID;
    dependencies?: ID[];

}

export type Graph = Map<ID, Set<ID>>;

/**
 * Graph from nodes: 
 */

 export const makeGraphFromNodes = (nodes: Node[]): Graph => {
     const graph: Graph = new Map();
     const resources = new Map<ID, Node[]>();
     
     for (const n of nodes) {
         const nodesForResource = resources.get(n.resourceId) ?? [];
         nodesForResource.push(n);
         resources.set(n.resourceId, nodesForResource);

         graph.set(n.id,  new Set(n.dependencies ?? []));
     }

     for (const nodesForResource of resources.values()) {
         // sort by position
         nodesForResource.sort((a,b) => a.utility - b.utility);

         // 
         let prevNodes: Node | undefined;
         for (const node of nodesForResource) {
             if (prevNodes) {
                 graph.get(prevNodes.id)?.add(node.id);
             }
             prevNodes = node;
         }
     }

     return graph;

 };

 export let nodes: Node[] = [
     {
        id: '0',
        start: new Date('2020-01-01'),
        utility: Math.random()*10,
        balance: Math.random()*1000,
        resourceId: 'Alice'
    },

    {
        id: '1',
        start: new Date('2020-01-02'),
        utility: Math.random()*10,
        balance: Math.random()*1000,
        resourceId: 'Alice',
        dependencies: ['0']
    },

    {
        id: '2',
        start: new Date('2020-01-02'),
        utility: Math.random()*10,
        balance: Math.random()*1000,
        resourceId: 'Bob',
        dependencies: ['1', '0']
    },

    {
        id: '3',
        start: new Date('2020-01-02'),
        utility: Math.random()*10,
        balance: Math.random()*1000,
        resourceId: 'Carlo',
        //dependencies: ['0']
    },

    {
        id: '4',
        start: new Date('2020-01-02'),
        utility: Math.random()*10,
        balance: Math.random()*1000,
        resourceId: 'Bob',
        dependencies: ['0', '2']
    }
 ]