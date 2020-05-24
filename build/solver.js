"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mwis_dp = exports.recursive_cg_solve = void 0;
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
exports.mwis_dp = (cg, utilities) => {
    const nVertex = [...cg.keys()].length;
    const vertexUtility = [];
    vertexUtility.push(0);
    for (let value of utilities.values()) {
        vertexUtility.push(value);
    }
    // the following code evaluates the maximum weight independent set of the graph using the
    // dynamic programming technique
    // this array will be used to perform the bottom-up computation
    let maxSetComputation = [];
    maxSetComputation.push(0);
    maxSetComputation.push(vertexUtility[1]);
    for (let i = 2; i < nVertex + 1; ++i) {
        maxSetComputation.push(Math.max(maxSetComputation[i - 1], maxSetComputation[i - 2] +
            vertexUtility[i]));
    }
    let i = nVertex;
    let optimalVertex = [];
    while (i > 1) {
        if (maxSetComputation[i - 2] + vertexUtility[i] > maxSetComputation[i - 1]) {
            optimalVertex.push(i);
            i -= 2;
            if (i == 1) {
                optimalVertex.push(i);
                break;
            }
        }
        else {
            i--;
        }
        return optimalVertex;
    }
};
