describe('graph_pattern', function() {
    var graph;

    function get_key(n) {
        return n.key();
    }
    function topologically_sorted(graph, list) {
        var id = list.reduce(function(p, v, i) {
            p[v.key()] = i;
            return p;
        }, {});
        return graph.edges().every(function(e) {
            return id[e.source().key()] < id[e.target().key()];
        });
    }
    describe('adcdefg', function() {
        beforeEach(function() {
            graph = metagraph.pattern(metagraph.graph_pattern())({
                Graph: {},
                Node: [
                    {key: 'a'},
                    {key: 'b'},
                    {key: 'c'},
                    {key: 'd'}
                ],
                Edge: [
                    {key: 'e', value: {source: 'a', target: 'b'}},
                    {key: 'f', value: {source: 'a', target: 'c', n: 42}},
                    {key: 'g', value: {source: 'c', target: 'd'}}
                ]
            }).root('Graph');
        });
        it('is already topologically sorted', function() {
            expect(topologically_sorted(graph, graph.nodes())).toBeTruthy();
        });
        it('and sorting leaves it so', function() {
            expect(topologically_sorted(graph,
                                        metagraph.topological_sort(graph))).toBeTruthy();
        });
    });
    describe('gfedcba', function() {
        beforeEach(function() {
            graph = metagraph.pattern(metagraph.graph_pattern())({
                Graph: {},
                Node: [
                    {key: 'a'},
                    {key: 'b'},
                    {key: 'c'},
                    {key: 'd'}
                ],
                Edge: [
                    {key: 'e', value: {source: 'b', target: 'a'}},
                    {key: 'f', value: {source: 'c', target: 'a'}},
                    {key: 'g', value: {source: 'd', target: 'c'}}
                ]
            }).root('Graph');
        });
        it('is not already topologically sorted', function() {
            expect(topologically_sorted(graph, graph.nodes())).toBeFalsy();
        });
        it('but sorting leaves it so', function() {
            expect(topologically_sorted(graph,
                                        metagraph.topological_sort(graph))).toBeTruthy();
        });
    });
    describe('binary tree', function() {
        beforeEach(function() {
            graph = metagraph.pattern(metagraph.graph_pattern())({
                Graph: {},
                Node: [
                    {key: 0},
                    {key: 1},
                    {key: 2},
                    {key: 3},
                    {key: 4},
                    {key: 5},
                    {key: 6}
                ],
                Edge: [
                    {key: 0, value: {source: 1, target: 0}},
                    {key: 1, value: {source: 1, target: 2}},
                    {key: 2, value: {source: 3, target: 2}},
                    {key: 3, value: {source: 3, target: 5}},
                    {key: 4, value: {source: 5, target: 4}},
                    {key: 5, value: {source: 5, target: 6}}
                ]
            }).root('Graph');
        });
        it('is not already topologically sorted', function() {
            expect(topologically_sorted(graph, graph.nodes())).toBeFalsy();
        });
        it('but sorting leaves it so', function() {
            console.log(metagraph.topological_sort(graph).map(get_key));
            expect(topologically_sorted(graph,
                                        metagraph.topological_sort(graph))).toBeTruthy();
        });
    });
});