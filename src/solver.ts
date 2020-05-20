import {Graph, makeCGfromNodes, get_utilities } from './conflictGraph'
import { any } from '@tensorflow/tfjs'


export const recursive_cg_solve = (cg: Graph, utilities: number[], n: number): Graph|undefined => {

    const init_CGnodes = [...cg.keys()] 
    console.log('Initial conflict nodes: ', init_CGnodes)
    const u = utilities[parseFloat(init_CGnodes[n])]
    console.log(`Utilities of ${init_CGnodes[n]}: ${u}`)
    const nodes_conf_n = cg.get(n.toString())

    let nodes_deleted: any = []

       

    if ( cg.has(n.toString())) {
        const nodes_conf_n = cg.get(n.toString())
    }
        nodes_conf_n?.forEach(e => console.log(`Nodes in conflict with ${n}: ${e}`))
        const n_conflicts = nodes_conf_n?.size
        console.log('number of conflits: ', n_conflicts)
        //initialize the total utility of the nodes in conflict with n
        let ut_conf = 0
        //compute the total utility of the conflict nodes of n
        if (nodes_conf_n) {
            for (let c of nodes_conf_n) {
                c.forEach(e => ut_conf += utilities[parseFloat(e)])
            }
        }
        console.log('Total utility nodes: ', ut_conf)
        if (n_conflicts) {
            if (ut_conf > u*n_conflicts) {
            //remove node n from the final solution
            cg.delete(n.toString())
            nodes_deleted.push(n)  //take memory for final solution
            nodes_deleted.forEach(e => console.log(`nodes deleted: ${e}`))
            cg.forEach(e => console.log(`Nodes in CG: ${e}`))
            n += 1
            if ( n <= init_CGnodes.length) {
                console.log('Recursive')
                console.log('cosa resta di cg: ', cg)
                return recursive_cg_solve(cg, utilities, n)
            }
            else {
                return cg 
            }
        }
        else {
            // do not exclude node n, so delete others
            if (nodes_conf_n) {
                for (let c of nodes_conf_n) {
                    c.forEach(e => cg.delete(e))
                    c.forEach(e => console.log(`Nodes deleted: ${e}`))
                    c.forEach(e => nodes_deleted.push(e))
                    
                }
            }
            nodes_deleted.forEach(e => console.log('LS Nodes deleted: ', e))
            n += 1
            if (n <= init_CGnodes.length) {
                console.log('Recursive')
                console.log('cosa resta di cg: ', cg)
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
            console.log('cosa resta di cg: ', cg)
            return recursive_cg_solve(cg, utilities, n)
        }
        else {
            return cg
        }
    }
}
}