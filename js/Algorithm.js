function Algorithm() {
}
var NO_ROUTE = 9999;
var NO_ROUTE_STR = 'No Route';

Algorithm.prototype.printAM = function(adjMat, nodes, output){
  var HTML = "<table >";
  for(var i=0 ; i< adjMat.length;i++){
    var tempHtml='';
    var tempHtml0="<td align=center >"+"</td>";
    // var str = "";
    for(var j=0 ; j< adjMat[i].length; j++){
      var distanceVal = (Number(adjMat[i][j])==9999 && output == true)? 'No Route' : adjMat[i][j];
      if(j==0){
        tempHtml += "<td align=center style='font-weight:bold'>"+(nodes?nodes[i].name:i)+"</td>"+"<td align=center>"+distanceVal+"</td>";
      }else{
        tempHtml += "<td align=center>"+distanceVal+"</td>";
      }
      if(i==0){
        tempHtml0 += "<td align=center style='font-weight:bold'>"+(nodes?nodes[j].name:j)+"</td>";
      }
    }
    if(i==0){
      HTML +="<tr>"+ tempHtml0 +"</tr>";
    }
    HTML +="<tr>"+ tempHtml +"</tr>";
  }
  HTML += "</table>";
  return HTML;
}

Algorithm.prototype.createPrintOutput = function(dataset, outputDiv, inputDiv, document){
  var inputHtml =    "<div align='center'> Input Adjancy matrix"+this.printAM(this.createAdjMat(dataset), dataset.nodes)+"</div>";
  var outputHtml =   "<div align='center'> Shortest Path Matrix</div>"+ "<div align='center'>  To Stations "+this.printAM(this.createShortPathAdjMatrix(dataset), dataset.nodes, true)+"</div><div>Y Axis - From Station</div>";
  inputDiv.innerHTML =    inputHtml ;
  outputDiv.innerHTML =   outputHtml;
  this.printAllResults(dataset, document);
}


Algorithm.prototype.printAllResults = function(dataset, document){
  var _1ResultsDiv = document.getElementById("1Results");
  var _2ResultsDiv = document.getElementById("2Results");
  var _3ResultsDiv = document.getElementById("3Results");
  var _4ResultsDiv = document.getElementById("4Results");
  var _5ResultsDiv = document.getElementById("5Results");
  var _6ResultsDiv = document.getElementById("6Results");
  var _7ResultsDiv = document.getElementById("7Results");
  var _8ResultsDiv = document.getElementById("8Results");
  var _9ResultsDiv = document.getElementById("9Results");
  var _10ResultsDiv = document.getElementById("10Results");

  var shortestPathMat = this.shortestPathPair(this.createAdjMat(dataset));
   var _1Res = distanceByAdjMatixPath(shortestPathMat, [0,1,2]);
   _1ResultsDiv.innerHTML =     "<div align='left'>  Distances of Route A-B-C ="+_1Res+"</div>" ;

   // var _2Res = this.findDistanceByPath('AD', dataset.nodes, shortestPathMat);
   var _2Res = distanceByAdjMatixPath(shortestPathMat, [0,3]);
   _2ResultsDiv.innerHTML =     "<div align='left'>  Distances of Route A-D ="+_2Res+"</div>" ;

   var _3Res = distanceByAdjMatixPath(shortestPathMat, [0,3,2]);
   _3ResultsDiv.innerHTML =     "<div align='left'>  Distances of Route A-D-C ="+_3Res+"</div>" ;

    var _4Res = distanceByAdjMatixPath(shortestPathMat, [0,4,1,2,3]);
    _4ResultsDiv.innerHTML =     "<div align='left'>  Distances of Route A-E-B-C-D  ="+_4Res+"</div>" ;

    var _5Res = distanceByAdjMatixPath(shortestPathMat, [0,4,3]);
    _5ResultsDiv.innerHTML =     "<div align='left'>  Distances of Route A-E-D   ="+_5Res+"</div>" ;

    // var _6Res = distanceByAdjMatixPath(shortestPathMat, [0,2]);
    var _6Res = this.findDistanceByPath('AC', dataset.nodes, shortestPathMat)
    _6ResultsDiv.innerHTML =     "<div align='left'>  The length of the shortest route (in terms of distance to travel) from A to C  ="+_6Res+"</div>" ;

    // var _7Res = distanceByAdjMatixPath(shortestPathMat, [1,1]);
    var _7Res = this.findDistanceByPath('BB', dataset.nodes, shortestPathMat)
    _7ResultsDiv.innerHTML =     "<div align='left'>  The length of the shortest route (in terms of distance to travel) from B to B  ="+_7Res+"</div>" ;

    var _8Res = this.findAllPathMax3StopsById(dataset, 2, 2).toString();
    _8ResultsDiv.innerHTML =     "<div align='left'>  The number of trips starting at C and ending at C with a maximum of 3 stops  ="+_8Res+"</div>" ;

    var _9Res = this.findAllPathExact4ById( dataset, 0, 2).toString();
    _9ResultsDiv.innerHTML =     "<div align='left'>  The number of trips starting at A and ending at C with exactly 4 stops ="+_9Res+"</div>" ;

    var _10Res = this.findAllPathLessThan50ById( dataset, 2, 2).toString();
    _10ResultsDiv.innerHTML =     "<div align='left'>  The number of different routes from C to C with a distance of less than 50  ="+_10Res+"</div>" ;
}


Algorithm.prototype.createAdjMat = function(dataset){
   var size = dataset.nodes.length;
   var   adjMat = [...Array(size)].map(x=>Array(size).fill(9999));

    for(var k=0 ; k< dataset.edges.length; k++){
      adjMat[dataset.edges[k].source][dataset.edges[k].target] = Number(dataset.edges[k].label);
    }
    return adjMat;
}


Algorithm.prototype.findDistanceByPath = function(path, nodes, adjMat){
  var distance =0;
  if(path!=null && path!=undefined && path.length>1){
      for(var i=0; i < path.length-1 ; i++){
        var src = findIndexByNodeName(nodes, path.charAt(i));
        var dest = findIndexByNodeName(nodes, path.charAt(i+1));
        if(adjMat[src][dest]==NO_ROUTE){
          return NO_ROUTE_STR;
        }
        distance = distance +adjMat[src][dest];
      }
  }
  return distance;
}

function findIndexByNodeName(nodes, value){
    return nodes.map(function(e) { return e.name; }).indexOf(value);
}

Algorithm.prototype.createShortPathAdjMatrix = function(dataset){
    return this.shortestPathPair(this.createAdjMat(dataset));
}


Algorithm.prototype.shortestPathPair = function(graph){
  var size = graph.length;
  var dist = [...Array(size)].map(x=>Array(size).fill(9999));
  var i, j, k;

        for (i = 0; i < size; i++)
            for (j = 0; j < size; j++)
                dist[i][j] = graph[i][j];

    for (k = 0; k < size; k++)
    {
        for (i = 0; i < size; i++)
        {
            for (j = 0; j < size; j++)
            {
               var shortPath =  Number(dist[i][k]) + Number(dist[k][j]);
               // var shortLoop3 =  Number(dist[k][i])+Number(dist[i][j]) + Number(dist[j][k]);
               // prevent cycle of length 2
                if(shortPath < dist[i][j]){
                  dist[i][j] = shortPath;
                  // console.log(' '+i+' '+j+' => '+shortPath);
                }
                // else if (shortLoop3 < dist[k][k]){
                //   // allow cycle of length greater than 2
                //   dist[k][k] = shortLoop3;
                //   console.log('LOOP  '+i+' '+j+' '+k+' '+i+' => '+shortLoop3);
                // }
            }
        }
    }

    return dist;
}


Algorithm.prototype.findAllPathMax3Stops = function(dataset, currentNode,  endNode){
  var src = findIndexByNodeName(dataset.nodes, currentNode);
  var dest = findIndexByNodeName(dataset.nodes, endNode);

  return this.findAllPathMax3StopsById(dataset, src,  dest);
}

Algorithm.prototype.findAllPathMax3StopsById = function(dataset, src,  dest){

  var adjmat = this.createAdjMat(dataset);

  var fullPath = []
  printAllPathsUtilMax3(dataset.nodes, adjmat, src, src, dest,  [], fullPath);
  console.log('printAllPathsUtilMax3 '+src+' - '+dest+' -> ');
  // console.log('printAllPathsUtilMax3 '+currentNode+' - '+endNode+' -> ');
  console.log(fullPath );
  return fullPath;
}



function printAllPathsUtilMax3(nodes, graph, first, src, dest,  localPathList, fullPath) {

    if (localPathList.length <= 3 &&  src == dest){
        var strVal =nodes[first].name;
        for(var k=0 ; k< localPathList.length ; k++){
          strVal += '->'+ nodes[localPathList[k]].name;
        }
        if(localPathList.length>0){
          fullPath.push(strVal);
        }
    }

    for (var i = 0; i < graph[src].length; i += 1) {
          if (graph[src][i] != NO_ROUTE && localPathList.length < 4) {
                localPathList.push(i);
                printAllPathsUtilMax3(nodes, graph, first, i, dest,  localPathList, fullPath);
                removeElementByVal(localPathList, i);
            }
      }
  }


Algorithm.prototype.findAllPathExact4 = function(dataset, currentNode,  endNode){
  var src = findIndexByNodeName(dataset.nodes, currentNode);
  var dest = findIndexByNodeName(dataset.nodes, endNode);
  return this.findAllPathExact4ById(dataset, src,  dest);
}

Algorithm.prototype.findAllPathExact4ById = function(dataset, src,  dest){

  var adjmat = this.createAdjMat(dataset);

  var fullPath = []
  printAllPathsUtilExact4(dataset.nodes, adjmat, src, src, dest,  [], fullPath);
  console.log('findAllPathExact4 '+src+' - '+dest+' -> ');
  // console.log('findAllPathExact4 '+currentNode+' - '+endNode+' -> ');
  console.log(fullPath );
  return fullPath;
}


function printAllPathsUtilExact4(nodes, graph, first, src, dest,  localPathList, fullPath) {
    if (localPathList.length == 4 &&  src == dest){
        var strVal =nodes[first].name;
        for(var k=0 ; k< localPathList.length ; k++){
          strVal += '->'+ nodes[localPathList[k]].name;
        }
        fullPath.push(strVal);
    }

    for (var i = 0; i < graph[src].length; i += 1) {
          if (graph[src][i] != NO_ROUTE && localPathList.length < 5) {
                localPathList.push(i);
                printAllPathsUtilExact4(nodes, graph, first, i, dest,  localPathList, fullPath);
                removeElementByVal(localPathList, i);
            }
      }
  }


  Algorithm.prototype.findAllPathLessThan50 = function(dataset, currentNode,  endNode){
    var src = findIndexByNodeName(dataset.nodes, currentNode);
    var dest = findIndexByNodeName(dataset.nodes, endNode);
    return this.findAllPathLessThan50ById(dataset, src,  dest);
  }


  Algorithm.prototype.findAllPathLessThan50ById = function(dataset, src,  dest){
    var adjmat = this.createAdjMat(dataset);

    var fullPath = []
    printAllPathsUtilDist50(dataset.nodes, adjmat, src, src, dest,  [], fullPath);
    console.log('findAllPathLessThan50 '+src+' - '+dest+' -> ');
    console.log(fullPath );
    return fullPath;
  }


  function printAllPathsUtilDist50(nodes, graph, first, src, dest,  localPathList, fullPath) {
      if (src == dest){
          var newLocalPath = [first].concat(localPathList);
          var distance = distanceByAdjMatixPath(graph, newLocalPath);
          if(distance<50){
            var strVal =nodes[first].name;
            for(var k=0 ; k< localPathList.length ; k++){
              strVal += '->'+ nodes[localPathList[k]].name;
            }
            fullPath.push(strVal);
          }
      }

      for (var i = 0; i < graph[src].length; i += 1) {
            if (graph[src][i] != NO_ROUTE && localPathList.length < 5) {
                  localPathList.push(i);
                  printAllPathsUtilDist50(nodes, graph, first, i, dest,  localPathList, fullPath);
                  removeElementByVal(localPathList, i);
              }
        }
    }

    function distanceByAdjMatixPath(graph, localPathList) {
      var distance = 0;
      for(var k=0 ; k< localPathList.length-1 ; k++){
        var st = localPathList[k];
        var en = localPathList[k+1];
        distance += graph[st][en];
      }
      return distance;
    }


function removeElementByVal(arr, val){
  for(var i = 0; i < arr.length; i++) {
    if(arr[i] == val) {
      arr.splice(i, 1);
      break;
    }
  }
}
