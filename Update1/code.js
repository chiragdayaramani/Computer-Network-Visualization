var cy = cytoscape({
    container: document.getElementById('cy'),

    boxSelectionEnabled: false,
    autounselectify: true,

    style: cytoscape.stylesheet()
        .selector('node')
        .style({
            'content': 'data(id)'
        })
        .selector('edge')
        .style({
            'curve-style': 'bezier',
            'target-arrow-shape': 'triangle',
            'width': 4,
            'line-color': '#ddd',
            'target-arrow-color': '#ddd'
        })
        .selector('.highlighted')
        .style({
            'background-color': '#61bffc',
            'line-color': '#61bffc',
            'target-arrow-color': '#61bffc',
            'transition-property': 'background-color, line-color, target-arrow-color',
            'transition-duration': '0.5s'
        }),

    elements: {
        nodes: [
            { data: { id: '0' } },
            { data: { id: '1' } },
            { data: { id: '2' } },
            { data: { id: '3' } },
            { data: { id: '4' } },
            { data: { id: '5' } }
        ],

        edges: [
            { data: { id: '0"1', weight: 1, source: '0', target: '1' } },
            { data: { id: '0"2', weight: 1, source: '0', target: '2' } },
            { data: { id: '1"2', weight: 1, source: '1', target: '2' } },
            { data: { id: '1"3', weight: 1, source: '1', target: '3' } },
            { data: { id: '2"4', weight: 1, source: '2', target: '4' } },
            { data: { id: '2"1', weight: 1, source: '2', target: '1' } },
            { data: { id: '3"5', weight: 1, source: '3', target: '5' } },
            { data: { id: '3"2', weight: 1, source: '3', target: '2' } },
            { data: { id: '4"3', weight: 1, source: '4', target: '3' } },
            { data: { id: '4"5', weight: 1, source: '4', target: '5' } },
            
        ]
    },

    layout: {
        name: 'breadthfirst',
        directed: true,
        roots: '#a',
        padding: 10
    }
});

var bfs = cy.elements().bfs('#a', function () { }, true);

var i = 0;
var highlightNextEle = function () {
    if (i < bfs.path.length) {
        bfs.path[i].addClass('highlighted');

        i++;
        setTimeout(highlightNextEle, 1000);
    }
};

// kick off first highlight
highlightNextEle();
