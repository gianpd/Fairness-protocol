import {Graph, makeCGfromNodes, get_utilities } from './conflictGraph'
import { util } from '@tensorflow/tfjs'

const pass = (): number => {return 0}

export const recursive_cg_solve = (cg: Graph, utilities: Map<string, number>, n: number): Graph|undefined => {

    let nodes_conf_n: string[] = []

    const init_CGnodes = [...cg.keys()] //initial nodes
    console.log('Initial conflict nodes: ', init_CGnodes)
    const testedNode = n.toString()
    console.log('Tested node: ', testedNode)
    // calculate utilities of consflict nodes
    const u = utilities.get(testedNode) ?? pass() //utility test node
    //let u_conf = 0
    //nodes_conf_n.forEach(e => u_conf += utilities.get(e))
    console.log(`Utility node ${n}: ${u}`)

    let nodes_deleted: string[] = []

    if ( cg.has(testedNode)) {
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
