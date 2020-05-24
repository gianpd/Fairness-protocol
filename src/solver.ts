import {Graph, makeCGfromNodes, get_utilities } from './conflictGraph'
import { util } from '@tensorflow/tfjs'

const pass = (): number => {return 0}



export const recursive_cg_solve = (cg: Graph, utilities: Map<string, number>, n: number): Graph|undefined => {

    const init_CGnodes = [...cg.keys()] //initial nodes

    if ( cg.has(n.toString())) {
        let nodes_conf_n: string[] = []
        console.log('Initial conflict nodes: ', init_CGnodes)
        const testedNode = n.toString()
        console.log('Tested node: ', testedNode)
        // calculate utilities of consflict nodes
        const u = utilities.get(testedNode) ?? pass() //utility test node
        //let u_conf = 0
        //nodes_conf_n.forEach(e => u_conf += utilities.get(e))
        console.log(`Utility node ${n}: ${u}`)
        let nodes_deleted: string[] = []
        const nodes_conf_set = cg.get(testedNode)
        nodes_conf_set?.forEach(e => e.forEach( s => nodes_conf_n.push(s)))
        
        nodes_conf_n.forEach(e => console.log(`Node in conflict with ${n.toString()}: ${e}`))
        const n_conflicts = nodes_conf_n.length
        console.log('number of conflits: ', n_conflicts)

        let u_conf = 0
        nodes_conf_n.forEach(e => u_conf += utilities.get(e) ?? pass())
        console.log(`Total utility conflict nodes: ${u_conf}`)
        if (u_conf > u*n_conflicts) {
            cg.delete(testedNode)
            nodes_deleted.push(testedNode)  //take memory for final solution
            nodes_deleted.forEach(e => console.log(`nodes deleted: ${e}`))
           //cg.forEach(e => console.log(`Nodes in CG: ${e}`))
            n += 1
            if ( n <= init_CGnodes.length) {
                console.log('Recursive')
                console.log('Remained nodes: ', cg)
                return recursive_cg_solve(cg, utilities, n)
            }
            else {
                return cg 
                }
        }
        
        else {
            // do not exclude node n, so delete others
            for (let c of nodes_conf_n) {
                cg.delete(c)
                nodes_deleted.push(c)
            }
            nodes_deleted.forEach(e => console.log('Nodes deleted: ', e))
            n += 1
            if (n <= init_CGnodes.length) {
                console.log('Recursive')
                console.log('Remained nodes: ', cg)
                return recursive_cg_solve(cg, utilities, n)
            }
            else {
                return cg
            }
        }
    }
    else {
        console.log(`node ${n} already excluded...`)
        n += 1
        if (n <= init_CGnodes.length) {
            console.log('Recursive')
            console.log('Remained nodes: ', cg)
            return recursive_cg_solve(cg, utilities, n)
        }
        else {
            return cg
        }
    }
}



export const mwis_dp = (cg: Graph, utilities: Map<string, number>): string[] => {
/**
* A Dynamic Programming heuristic algorithm for solving:
max. sum_i[(a_i)*x_i)]
s.t  x_i + x_j <= 1 if (i,j) in CF, where CF is the Conflict Graph for the problem.
* 
* complexity O(n) where n is the number of nodes in the CG
*/

    // global variables
   const nVertex = [...cg.keys()].length
   console.log('nVertex: ', nVertex)
   const opt_sol: string[] = []


   for (let i=0; i < nVertex; i++) {
       if (cg.has(i.toString())) {
           const conf_nodes = cg.get(i.toString()) //conflict nodes of i
           console.log('conflict nodes: ', conf_nodes)
           const u_tot: number[] = []
           u_tot.push(utilities.get(i.toString()) ?? pass())
           // fill u_tot with total utilities
           conf_nodes?.forEach(e =>  e.forEach(s => u_tot.push(utilities.get(s) ?? pass())))
           console.log('u_tot: ', u_tot)
           // max utility
           const max_u = Math.max(...u_tot)
           console.log('max utility: ', max_u)
           // get node with utility equal to max_u
           const opt_node = [...utilities.keys()].find(key => utilities.get(key) == max_u)
           console.log('opt_node: ', opt_node)
           opt_sol.push(opt_node ?? pass().toString())
           conf_nodes?.delete(opt_sol)
           conf_nodes?.forEach(e => e.forEach(s => cg.delete(s)))
        }
        
    }

   return opt_sol

}


