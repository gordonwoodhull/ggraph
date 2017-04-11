describe('graph_pattern', function() {
    var graph;

    function get_key(n) {
        return n.key();
    }
    describe('adcdefg', function() {
        beforeEach(function() {
            graph = metagraph.pattern(metagraph.graph_pattern())({
                Graph: {},
                Node: [
                    {key: 'a'},
                    {key: 'b'},
                    {key: 'c', value: {n: 17}},
                    {key: 'd'}
                ],
                Edge: [
                    {key: 'e', value: {source: 'a', target: 'b'}},
                    {key: 'f', value: {source: 'a', target: 'c', n: 42}},
                    {key: 'g', value: {source: 'c', target: 'd'}}
                ]
            }).root('Graph');
        });
        it('has nodes a,b,c,d', function() {
            expect(graph.nodes().map(get_key)).toEqual(['a','b','c','d']);
        });
        it('has edges e,f,g', function() {
            expect(graph.edges().map(get_key)).toEqual(['e','f','g']);
        });
        it('nodes b,c have graph', function() {
            expect(graph.node('b').graph()).toBe(graph);
            expect(graph.node('c').graph()).toBe(graph);
        });
        it('edges e,f have graph', function() {
            expect(graph.edge('e').graph()).toBe(graph);
            expect(graph.edge('f').graph()).toBe(graph);
        });
        it('a has outs e,f', function() {
            expect(graph.node('a').outs().map(get_key)).toEqual(['e','f']);
        });
        it('c has out g', function() {
            expect(graph.node('c').outs().map(get_key)).toEqual(['g']);
        });
        it('a has no ins', function() {
            expect(graph.node('a').ins()).toEqual([]);
        });
        it('d has no outs', function() {
            expect(graph.node('d').outs()).toEqual([]);
        });
        it('b has in e', function() {
            expect(graph.node('b').ins().map(get_key)).toEqual(['e']);
        });
        it('f has source a', function() {
            expect(graph.edge('f').source().key()).toEqual('a');
        });
        it('g has target d', function() {
            expect(graph.edge('g').target().key()).toEqual('d');
        });
        it('node c has data', function() {
            expect(graph.node('c').value().n).toEqual(17);
        });
        it('edge f has data', function() {
            expect(graph.edge('f').value().n).toEqual(42);
        });
    });
    describe('two graphs with one pattern', function() {
        var pattern, graph1, graph2;
        beforeEach(function() {
            pattern = metagraph.pattern(metagraph.graph_pattern());
            graph1 = pattern({
                Graph: {},
                Node: [
                    {key: 'a'},
                    {key: 'b'},
                    {key: 'c', value: {n: 17}}
                ],
                Edge: [
                    {key: 'e', value: {source: 'a', target: 'b'}},
                    {key: 'f', value: {source: 'b', target: 'c', n: 42}}
                ]
            }).root('Graph');
            graph2 = pattern({
                Graph: {},
                Node: [
                    {key: 'A'},
                    {key: 'B'},
                    {key: 'C', value: {n: -17}}
                ],
                Edge: [
                    {key: 'E', value: {source: 'A', target: 'B'}},
                    {key: 'F', value: {source: 'B', target: 'C', n: -42}}
                ]
            }).root('Graph');
        });
        it('have their own nodes', function() {
            expect(graph1.nodes().map(get_key)).toEqual(['a','b','c']);
            expect(graph2.nodes().map(get_key)).toEqual(['A','B','C']);
        });
        it('have their own edges', function() {
            expect(graph1.edges().map(get_key)).toEqual(['e','f']);
            expect(graph2.edges().map(get_key)).toEqual(['E','F']);
        });
        it('nodes have their own graphs', function() {
            expect(graph1.node('b').graph()).toBe(graph1);
            expect(graph1.node('c').graph()).toBe(graph1);
            expect(graph2.node('B').graph()).toBe(graph2);
            expect(graph2.node('C').graph()).toBe(graph2);
        });
        it('edges have their own graphs', function() {
            expect(graph1.edge('e').graph()).toBe(graph1);
            expect(graph1.edge('f').graph()).toBe(graph1);
            expect(graph2.edge('E').graph()).toBe(graph2);
            expect(graph2.edge('F').graph()).toBe(graph2);
        });
        it('nodes have their own out-edges', function() {
            expect(graph1.node('a').outs().map(get_key)).toEqual(['e']);
            expect(graph2.node('A').outs().map(get_key)).toEqual(['E']);
            expect(graph1.node('b').outs().map(get_key)).toEqual(['f']);
            expect(graph2.node('B').outs().map(get_key)).toEqual(['F']);
        });
        it('nodes have their own in-edges', function() {
            expect(graph1.node('b').ins().map(get_key)).toEqual(['e']);
            expect(graph2.node('B').ins().map(get_key)).toEqual(['E']);
            expect(graph1.node('c').ins().map(get_key)).toEqual(['f']);
            expect(graph2.node('C').ins().map(get_key)).toEqual(['F']);
        });
        it('edges have their own sources', function() {
            expect(graph1.edge('e').source().key()).toEqual('a');
            expect(graph2.edge('E').source().key()).toEqual('A');
        });
        it('edges have their own targets', function() {
            expect(graph1.edge('f').target().key()).toEqual('c');
            expect(graph2.edge('F').target().key()).toEqual('C');
        });
        it('nodes have their own data', function() {
            expect(graph1.node('c').value().n).toEqual(17);
            expect(graph2.node('C').value().n).toEqual(-17);
        });
        it('edges have their own data', function() {
            expect(graph1.edge('f').value().n).toEqual(42);
            expect(graph2.edge('F').value().n).toEqual(-42);
        });
    });
});
