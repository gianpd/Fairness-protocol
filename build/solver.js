"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mwis_dp = exports.recursive_cg_solve = void 0;
function recursive_cg_solve(cg, utilities, n) {
    var _a;
    const init_CGnodes = [...cg.keys()]; //initial nodes
    if (cg.has(n.toString())) {
        let nodes_conf_n = [];
        console.log('Initial conflict nodes: ', init_CGnodes);
        const testedNode = n.toString();
        console.log('Tested node: ', testedNode);
        // calculate utilities of consflict nodes
        const u = (_a = utilities.get(testedNode)) !== null && _a !== void 0 ? _a : 0; //utility test node
        //let u_conf = 0
        //nodes_conf_n.forEach(e => u_conf += utilities.get(e))
        console.log(`Utility node ${n}: ${u}`);
        let nodes_deleted = [];
        const nodes_conf_set = cg.get(testedNode);
        nodes_conf_set === null || nodes_conf_set === void 0 ? void 0 : nodes_conf_set.forEach(e => e.forEach(s => nodes_conf_n.push(s)));
        nodes_conf_n.forEach(e => console.log(`Node in conflict with ${n.toString()}: ${e}`));
        const n_conflicts = nodes_conf_n.length;
        console.log('number of conflits: ', n_conflicts);
        let u_conf = 0;
        nodes_conf_n.forEach(e => { var _a; return u_conf += (_a = utilities.get(e)) !== null && _a !== void 0 ? _a : 0; });
        console.log(`Total utility conflict nodes: ${u_conf}`);
        if (u_conf > u * n_conflicts) {
            cg.delete(testedNode);
            nodes_deleted.push(testedNode); //take memory for final solution
            nodes_deleted.forEach(e => console.log(`nodes deleted: ${e}`));
            //cg.forEach(e => console.log(`Nodes in CG: ${e}`))
            n += 1;
            if (n <= init_CGnodes.length) {
                console.log('Recursive');
                console.log('Remained nodes: ', cg);
                return recursive_cg_solve(cg, utilities, n);
            }
            else {
                return cg;
            }
        }
        else {
            // do not exclude node n, so delete others
            for (let c of nodes_conf_n) {
                cg.delete(c);
                nodes_deleted.push(c);
            }
            nodes_deleted.forEach(e => console.log('Nodes deleted: ', e));
            n += 1;
            if (n <= init_CGnodes.length) {
                console.log('Recursive');
                console.log('Remained nodes: ', cg);
                return recursive_cg_solve(cg, utilities, n);
            }
            else {
                return cg;
            }
        }
    }
    else {
        console.log(`node ${n} already excluded...`);
        n += 1;
        if (n <= init_CGnodes.length) {
            console.log('Recursive');
            console.log('Remained nodes: ', cg);
            return recursive_cg_solve(cg, utilities, n);
        }
        else {
            return cg;
        }
    }
}
exports.recursive_cg_solve = recursive_cg_solve;
function mwis_dp(cg, utilities) {
    /**
    * A Dynamic Programming heuristic algorithm for solving:
    max. sum_i[(a_i)*x_i)]
    s.t  x_i + x_j <= 1 if (i,j) in CF, where CF is the Conflict Graph for the problem.
    *
    * complexity O(n) where n is the number of nodes in the CG
    */
    var _a, _b;
    // internal global variables initialization
    const start = new Date().getTime();
    const nVertex = [...cg.keys()].length;
    console.log('number of vertex in the initial CG: ', nVertex);
    const opt_sol = new Set(); //Optimal final solution
    for (let i = 0; i < nVertex; i++) {
        if (cg.has(i.toString())) {
            if (opt_sol.has(i.toString())) {
                break;
            }
            console.log('Tested node: ', i);
            const conf_nodes = cg.get(i.toString()); //conflict nodes of i
            console.log('conflict nodes: ', conf_nodes);
            const u_tot = [];
            u_tot.push((_a = utilities.get(i.toString())) !== null && _a !== void 0 ? _a : 0);
            console.log('Utility tested node: ', u_tot);
            // fill u_tot with total utilities
            conf_nodes === null || conf_nodes === void 0 ? void 0 : conf_nodes.forEach(e => e.forEach(s => { var _a; return u_tot.push((_a = utilities.get(s)) !== null && _a !== void 0 ? _a : 0); }));
            console.log('Total utilities: ', u_tot);
            // max utility
            const max_u = Math.max(...u_tot);
            console.log('max utility: ', max_u);
            // get node with utility equal to max_u (TODO: build a method for obtaining a map(id, utility) just for the sub-problem considered)
            const opt_node = (_b = [...utilities.keys()].find(key => utilities.get(key) == max_u)) !== null && _b !== void 0 ? _b : '0'; //get key from value
            console.log('opt_node: ', opt_node);
            opt_sol.add(opt_node);
            //delete not optimal nodes
            if (opt_node != i.toString()) {
                console.log('Delete node: ', i);
                cg.delete(i.toString());
                const nodes_deleted = [];
                conf_nodes === null || conf_nodes === void 0 ? void 0 : conf_nodes.forEach(e => e.forEach(s => { if (s != opt_node)
                    nodes_deleted.push(s); }));
                nodes_deleted.forEach(e => cg.delete(e));
                console.log('Deleted nodes: ', nodes_deleted);
            }
            else {
                const nodes_deleted = [];
                conf_nodes === null || conf_nodes === void 0 ? void 0 : conf_nodes.forEach(e => e.forEach(s => { if (s != opt_node)
                    nodes_deleted.push(s); }));
                nodes_deleted === null || nodes_deleted === void 0 ? void 0 : nodes_deleted.forEach(e => cg.delete(e));
                console.log('Deleted Nodes: ', nodes_deleted);
            }
        }
    }
    const end = new Date().getTime();
    const elapsed = end - start;
    console.log('===== Optimization done ===== \n Elapsed time: ', elapsed, '[ms].');
    return [opt_sol, cg];
}
exports.mwis_dp = mwis_dp;
