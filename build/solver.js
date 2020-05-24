"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recursive_cg_solve = void 0;
const pass = () => { return 0; };
exports.recursive_cg_solve = (cg, utilities, n) => {
    var _a;
    let nodes_conf_n = [];
    const init_CGnodes = [...cg.keys()]; //initial nodes
    console.log('Initial conflict nodes: ', init_CGnodes);
    const testedNode = n.toString();
    console.log('Tested node: ', testedNode);
    // calculate utilities of consflict nodes
    const u = (_a = utilities.get(testedNode)) !== null && _a !== void 0 ? _a : pass(); //utility test node
    //let u_conf = 0
    //nodes_conf_n.forEach(e => u_conf += utilities.get(e))
    console.log(`Utility node ${n}: ${u}`);
    let nodes_deleted = [];
    if (cg.has(testedNode)) {
        const nodes_conf_set = cg.get(testedNode);
        nodes_conf_set === null || nodes_conf_set === void 0 ? void 0 : nodes_conf_set.forEach(e => e.forEach(s => nodes_conf_n.push(s)));
        nodes_conf_n.forEach(e => console.log(`Node in conflict with ${n.toString()}: ${e}`));
        const n_conflicts = nodes_conf_n.length;
        console.log('number of conflits: ', n_conflicts);
        let u_conf = 0;
        nodes_conf_n.forEach(e => { var _a; return u_conf += (_a = utilities.get(e)) !== null && _a !== void 0 ? _a : pass(); });
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
                return exports.recursive_cg_solve(cg, utilities, n);
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
                return exports.recursive_cg_solve(cg, utilities, n);
            }
            else {
                return cg;
            }
        }
    }
    else {
        n += 1;
        if (n <= init_CGnodes.length) {
            console.log('Recursive');
            console.log('Remained nodes: ', cg);
            return exports.recursive_cg_solve(cg, utilities, n);
        }
        else {
            return cg;
        }
    }
};
