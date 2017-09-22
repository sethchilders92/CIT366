function Set() {


	this.intersection = function(listA, listB) {

        if (listA === null || listB === null) {
            return null;
        }

	    var resultList = [];

	    for (var i =0; i < listA.length; i++) {
	   		var nextValue = listA[i];

	   		for (var j = 0; j < listB.length; j++) {
	   			if (listB[j] === nextValue) {
	   				resultList.push(listB[j]);
	   				break;
				}
			}
	    }

	   return resultList;
	}


	this.union = function(listA, listB) {

        if (listA === null || listB === null) {
            return null;
        }

	    var resultList = [];

	    var tempA = this.relativeComplement(listA, listB);
	    resultList = tempA.concat(listB);

	    return resultList;
	}




	this.relativeComplement = function(listA, listB) {

		if (listA === null || listB === null) {
            return null;
        }

        var resultList = listA.slice(0);

	    var intersect = this.intersection(listA, listB);

	    for (var i=0; i < intersect.length; i++) {
		   for (var j=0; j < listA.length; j++) {
		   		if (intersect[i] === listA[j]) {
                	var index = resultList.indexOf(listA[j]);
                	if (index > -1) {
                    	resultList.splice(index, 1);
					}
					break;
            	}
		   }
	   }
        return resultList;
	}



	this.symmetricDifference = function(listA, listB) {

		if (listA === null || listB === null) {
            return null;
        }

	    var resultList = [];

	    var tempA = this.relativeComplement(listA, listB);
	    var tempB = this.relativeComplement(listB, listA);

	    resultList = tempA.concat(tempB);

	    return resultList;
	}


}
