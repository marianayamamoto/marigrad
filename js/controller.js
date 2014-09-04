var app = angular.module('promari', []);

app.controller('MainController', function ($scope,$http) {
  $http.get('periodos.json').success(function(data) {
    $scope.periodos = data;
    $http.get('disciplinas2.json').success(function(data) {
    	$scope.disciplinas = data;
    	angular.forEach($scope.periodos, function(value, key){
    		var periodo = key;
        $scope.periodos[periodo].toggleShow = true;
        $scope.periodos[periodo].checkAll = false;
    		angular.forEach($scope.periodos[periodo].disciplinas, function(value, key){
    			var codDisciplina = value;
    			var posDisciplina = key;
	    		//console.log($scope.disciplinas.disciplinas);
	    		angular.forEach($scope.disciplinas.disciplinas, function(value, key){
    				//var codDisciplina = value;
    				if(value.codigo == codDisciplina){
    					$scope.periodos[periodo].disciplinas[posDisciplina] = value;
              if(value.estagio)
                $scope.periodos[periodo].disciplinas[posDisciplina].estagio = true;
              else
                $scope.periodos[periodo].disciplinas[posDisciplina].estagio = false;
    				}
		    		
		    	});	
	    	});	
    	});
  	});
  });

  $scope.creditosObrigatorios = 0;
  $scope.creditosHumCompl = 0;
  $scope.creditosProfiss = 0;
  $scope.horasAtivCompl = 0;
  $scope.creditosEstagio = 0;

  $scope.recalcularCreditos = function($event,creditos){
    var checked = $event.target.checked;
    var elemClass = angular.element($event.target)[0].className;
    if(elemClass.indexOf("cbperfil") > -1){
      var children = angular.element($event.srcElement.parentElement.lastElementChild.children);
      angular.forEach(children,function(value,key){
        var child = angular.element(value.children);
        var childChecked = child[0].checked;
        var childClass = child[0].className;
        var childCredits = parseInt(child[0].dataset.creditos);
        if(checked){
          if(!childChecked){
            if(childClass.indexOf("obrigatorias") > -1){
              if(childClass.indexOf("estagio") > -1)
                $scope.creditosEstagio += childCredits;
              else
                $scope.creditosObrigatorios += childCredits;
            }else if(childClass.indexOf("opthumanascompl") > -1){
              $scope.creditosHumCompl += childCredits;
            }else if(childClass.indexOf("optprofissionalizante") > -1){
              $scope.creditosProfiss += childCredits;
            }else if(childClass.indexOf("ativcomplementar") > -1){
              $scope.horasAtivCompl += childCredits;
            }
          }
        }else{
          if(childChecked){
            if(childClass.indexOf("obrigatorias") > -1){
              if(childClass.indexOf("estagio") > -1)
                $scope.creditosEstagio -= childCredits;
              else
                $scope.creditosObrigatorios -= childCredits;
            }else if(childClass.indexOf("opthumanascompl") > -1){
              $scope.creditosHumCompl -= childCredits;
            }else if(childClass.indexOf("optprofissionalizante") > -1){
              $scope.creditosProfiss -= childCredits;
            }else if(childClass.indexOf("ativcomplementar") > -1){
              $scope.horasAtivCompl -= childCredits;
            }
          }
        }
      });
    }else if(elemClass.indexOf("obrigatorias") > -1){
      if(elemClass.indexOf("estagio") > -1){
        if(checked){
          $scope.creditosEstagio += creditos;
        }else
          $scope.creditosEstagio -= creditos;
      }
      else{
        if(checked){
          $scope.creditosObrigatorios += creditos;
        }else
          $scope.creditosObrigatorios -= creditos;  
      }      
    }else if(elemClass.indexOf("opthumanascompl") > -1){
      if(checked){
        $scope.creditosHumCompl += creditos;
      }else
        $scope.creditosHumCompl -= creditos;

    }else if(elemClass.indexOf("optprofissionalizante") > -1){
      if(checked){
        $scope.creditosProfiss += creditos;
      }else
        $scope.creditosProfiss -= creditos;
    }else if(elemClass.indexOf("ativcomplementar") > -1){
      if(checked){
        $scope.horasAtivCompl += creditos;
      }else
        $scope.horasAtivCompl -= creditos;
    }
  }
});