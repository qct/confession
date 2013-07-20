var cluster = require('cluster');
if (cluster.isMaster){
  //fork a worker to run the main program
  for(var i = 0;i<4;i++){
  	var worker=cluster.fork();
  }
}else{
  //Run main progrm
  require('./app.js');
  console.log('worker is running');
}
cluster.on('death',function(worker){
  //if the worker died,fork a new worker
  console.log('worker ' + worker.pid + ' died.restart ...');
  cluster.fork();
});
