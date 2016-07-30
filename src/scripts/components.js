
const ACTIONS = {
	

	_filterSub: function(arr,att,key){
		
		console.log('Filtered VV')
		
		return arr.filter(
				function(obj){
					
					if(obj.attributes.data[att]===key){
						return true
					}
					else{return false}
					
				}


			)

		
		}
		//////////////////////////////////

		
		 
	
}




	export default ACTIONS