describe('Given the Algorithm', function() {
  var sp = new Algorithm();
  var NO_ROUTE = 9999;

  it('Then it contains an shortestPathPair method', function() {
    expect(sp.shortestPathPair).toBeDefined();
  });


  describe('edges for stations of size 3', function() {
     var dataset = {
       edges:[{source:0,target:1,label:5},{source:1,target:2,label:1},{source:0,target:2,label:7}],
       nodes:[{name:'A'},{name:'B'},{name:'C'}]
     };

    var output = sp.createShortPathAdjMatrix(dataset);
    it('Test all the distances are correct ', function() {
      expect(output[0][2]).toBe(6);
      expect(output[0][0]).toBe(NO_ROUTE);
      expect(output[1][0]).toBe(NO_ROUTE);
      expect(output[2][0]).toBe(NO_ROUTE);
      expect(output[2][1]).toBe(NO_ROUTE);
      expect(output[2][2]).toBe(NO_ROUTE);
    });
  });



  describe('edges for stations of size 4', function() {
     var dataset = {
       edges:[
         {source:0,target:1,label:1},{source:1,target:2,label:2},{source:0,target:2,label:3},
         {source:2,target:3,label:2},{source:1,target:3,label:3},{source:0,target:3,label:4},
         {source:3,target:0 ,label:5}
       ],
       nodes:[{name:'A'},{name:'B'},{name:'C'},{name:'D'}]
     };

    var output = sp.createShortPathAdjMatrix(dataset);
    it('Test all the distances are correct ', function() {
      expect(output[0][0]).toBe(9);
      expect(output[0][1]).toBe(1);
      expect(output[0][2]).toBe(3);
      expect(output[0][3]).toBe(4);

      expect(output[1][0]).toBe(8);
      expect(output[1][1]).toBe(9);
      expect(output[1][2]).toBe(2);
      expect(output[1][3]).toBe(3);

      expect(output[2][0]).toBe(7);
      expect(output[2][1]).toBe(8);
      expect(output[2][2]).toBe(10);
      expect(output[2][3]).toBe(2);

      expect(output[3][0]).toBe(5);
      expect(output[3][1]).toBe(6);
      expect(output[3][2]).toBe(8);
      expect(output[3][3]).toBe(9);
    });
  });



  describe('edges for stations of size 5', function() {
    var dataset = {
      edges:[
        {source:0,target:1,label:5},{source:1,target:2,label:4},{source:2,target:3,label:8},
        {source:3,target:2,label:8},{source:3,target:4,label:6},{source:0,target:3,label:5},
        {source:2,target:4 ,label:2},{source:4,target:1,label:3},{source:3,target:0,label:1},
        {source:0,target:4 ,label:7}
      ],
      nodes:[{name:'A'},{name:'B'},{name:'C'},{name:'D'},{name:'E'}]
    };

    var output = sp.createShortPathAdjMatrix(dataset);
    it('Test all the distances are correct ', function() {
      // expect(output[0][0]).toBe(NO_ROUTE);
      expect(output[0][1]).toBe(5);
      expect(output[0][2]).toBe(9);
      expect(output[0][3]).toBe(5);
      expect(output[0][4]).toBe(7);

      expect(output[1][0]).toBe(13);
      expect(output[1][1]).toBe(9);
      expect(output[1][2]).toBe(4);
      expect(output[1][3]).toBe(12);
      expect(output[1][4]).toBe(6);

      expect(output[2][0]).toBe(9);
      expect(output[2][1]).toBe(5);
      expect(output[2][2]).toBe(9);
      expect(output[2][3]).toBe(8);
      expect(output[2][4]).toBe(2);

    });

    it('Test distances of Route A-B-C is correct', function() {
      expect(sp.findDistanceByPath('ABC', dataset.nodes, output)).toBe(9);
    });

    it('Test distances of Route A-D is correct', function() {
      expect(sp.findDistanceByPath('AD', dataset.nodes, output)).toBe(5);
    });

    it('Test distances of Route A-D-C is correct', function() {
      expect(sp.findDistanceByPath('ADC', dataset.nodes, output)).toBe(13);
    });

    it('Test distances of Route A-E-B-C-D is correct ', function() {
      expect(sp.findDistanceByPath('AEBCD', dataset.nodes, output)).toBe(22);
    });

    it('Test distances of Route A-E-D is correct ', function() {
      expect(sp.findDistanceByPath('AED', dataset.nodes, output)).toBe(22);
    });

    it('Test The length of the shortest route (in terms of distance to travel) from A to C is correct ', function() {
      expect(sp.findDistanceByPath('AC', dataset.nodes, output)).toBe(9);
    });

    it('Test The length of the shortest route (in terms of distance to travel) from B to B is correct ', function() {
      expect(sp.findDistanceByPath('BB', dataset.nodes, output)).toBe(9);
    });

    it('The number of trips starting at C and ending at C ', function() {
      expect(sp.findAllPathMax3Stops( dataset, 'C', 'C')).not.toBe(null);
    });

    it('The number of trips starting at C and ending at C ', function() {
      expect(sp.findAllPathExact4( dataset, 'A', 'C')).not.toBe(null);
    });

    it('The number of trips starting at C and ending at C ', function() {
      expect(sp.findAllPathLessThan50( dataset, 'C', 'C')).not.toBe(null);
    });

  });

});
