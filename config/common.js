module.exports = {
	showDateYYYYMMDD:function (date) {
		if(!date) {return date;}
	    if(!(date instanceof Date)) {date = this.turnTrueDate(date);}
	    return date.getFullYear()+'-'+(date.getMonth()<9?('0'+(date.getMonth()+1)):date.getMonth()+1)+'-'+(date.getDate()<10?('0'+date.getDate()):date.getDate());	
	},
	showDateYYYYMMDDHHMM:function (date) {
		if(!date) {return date;}
	    if(!(date instanceof Date)) {date = this.turnTrueDate(date);}
	    return date.getFullYear()+'-'+(date.getMonth()<9?('0'+(date.getMonth()+1)):date.getMonth()+1)+'-'+(date.getDate()<10?('0'+date.getDate()):date.getDate())+' '+(date.getHours()<10?('0'+date.getHours()):date.getHours())+':'+(date.getMinutes()<10?('0'+date.getMinutes()):date.getMinutes());
	}
}

