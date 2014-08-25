var app = angular.module('promari', []);

app.controller('MainController', function ($scope,$http) {
  $http.get('periodos.json').success(function(data) {
    $scope.periodos = data;
    $http.get('disciplinas.json').success(function(data) {
    	$scope.disciplinas = data;
    	angular.forEach($scope.periodos, function(value, key){
    		var periodo = key;
    		//console.log(value);
    		angular.forEach($scope.periodos[periodo].disciplinas, function(value, key){
    			var codDisciplina = value;
    			var posDisciplina = key;
	    		//console.log($scope.disciplinas.disciplinas);
	    		angular.forEach($scope.disciplinas.disciplinas, function(value, key){
    				//var codDisciplina = value;
    				if(value.codigo == codDisciplina){
    					$scope.periodos[periodo].disciplinas[posDisciplina] = value;
    				}
		    		
		    	});	
	    	});	
    	});
  	});
  });

  $scope.creditosObrigatorios = 0;
  $scope.creditosHumCompl = 0;
  $scope.creditosProfiss = 0;

  $scope.atualizaCreditos = function($event, tipo, creditos){
  	if(tipo == "obrigatorias"){
  		if($event.target.checked){
	  		$scope.creditosObrigatorios += creditos;
	  	}else
	  		$scope.creditosObrigatorios -= creditos;
  	}else if(tipo == "opthumanascompl"){
  		if($event.target.checked){
	  		$scope.creditosHumCompl += creditos;
	  	}else
	  		$scope.creditosHumCompl -= creditos;

  	}else if(tipo == "optprofissionalizate"){
  		if($event.target.checked){
	  		$scope.creditosProfiss += creditos;
	  	}else
	  		$scope.creditosProfiss -= creditos;
  	}
  }
  
});