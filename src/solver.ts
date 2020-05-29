import { Graph, Node } from './conflictGraph'

export function recursive_cg_solve(cg: Graph, utilities: Map<string, number>, n: number): Graph|undefined {

    const init_CGnodes = [...cg.keys()] //initial nodes

    if ( cg.has(n.toString())) {
        let nodes_conf_n: string[] = []
        console.log('Initial conflict nodes: ', init_CGnodes)
        const testedNode = n.toString()
        console.log('Tested node: ', testedNode)
        // calculate utilities of consflict nodes
        const u = utilities.get(testedNode) ?? 0 //utility test node
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
        nodes_conf_n.forEach(e => u_conf += utilities.get(e) ?? 0)
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

export function mwis_dp(cg: Graph, utilities: Map<string, number>): [Set<string>, Graph]  {
/**
* A Dynamic Programming heuristic algorithm for solving:
max. sum_i[(a_i)*x_i)]
s.t  x_i + x_j <= 1 if (i,j) in CF, where CF is the Conflict Graph for the problem.
* 
* complexity O(n) where n is the number of nodes in the CG
*/

    // internal global variables initialization
   const start = new Date().getTime() 
   const nVertex = [...cg.keys()].length
   console.log('number of vertex in the initial CG: ', nVertex)
   const opt_sol: Set<string> = new Set()  //Optimal final solution


   for (let i=0; i < nVertex; i++) {
       if (cg.has(i.toString())) {
           if (opt_sol.has(i.toString())) {
               break
           }
           console.log('Tested node: ', i)
           const conf_nodes = cg.get(i.toString()) //conflict nodes of i
           console.log('conflict nodes: ', conf_nodes)
           const u_tot: number[] = []
           u_tot.push(utilities.get(i.toString()) ?? 0)
           console.log('Utility tested node: ', u_tot)
           // fill u_tot with total utilities
           conf_nodes?.forEach(e =>  e.forEach(s => u_tot.push(utilities.get(s) ?? 0)))
           console.log('Total utilities: ', u_tot)
           // max utility
           const max_u = Math.max(...u_tot)
           console.log('max utility: ', max_u)
           // get node with utility equal to max_u (TODO: build a method for obtaining a map(id, utility) just for the sub-problem considered)
           const opt_node = [...utilities.keys()].find(key => utilities.get(key) == max_u) ?? '0'  //get key from value
           console.log('opt_node: ', opt_node)
           opt_sol.add(opt_node)
          
           //delete not optimal nodes
           if ( opt_node != i.toString()) {
               console.log('Delete node: ', i)
               cg.delete(i.toString())
               const nodes_deleted: string[] = [] 
               conf_nodes?.forEach(e => e.forEach(s => { if ( s != opt_node ) nodes_deleted.push(s)}))
               nodes_deleted.forEach(e => cg.delete(e))
               console.log('Deleted nodes: ', nodes_deleted)
            }
           else {
            const nodes_deleted: string[] = [] 
            conf_nodes?.forEach(e => e.forEach(s => { if ( s != opt_node ) nodes_deleted.push(s)}))
            nodes_deleted?.forEach(e => cg.delete(e))
            console.log('Deleted Nodes: ', nodes_deleted)
           }
        }
        
    }
   const end = new Date().getTime() 
   const elapsed = end - start
   console.log('===== Optimization done ===== \n Elapsed time: ', elapsed, '[ms].')
   return [opt_sol, cg]

}