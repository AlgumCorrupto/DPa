

module.exports = {
    //NOTA mostrar 11 resultados da query 
    focus(query, focusedId=null) {
        let top;
        let qtd = 11;
        let focusedIndex;
        let response = [];

        if(focusedId == null ) {
            top = 0;
        } else {
            for(let i = 0; i < query.rowCount; i++) {
                console.log(query.rowCount)
                if(query.rows[i].playerid == focusedId) {
                    focusedIndex = i;
                    break;
                }
            }
    
            if((top = focusedIndex - 5) < 0) {
                top = 0
            }
            console.log(top)
        }

        for(let i = top; i <= qtd + top; i++) {
            if(i > (query.rowCount - 1)) {
                break;
            }
            response.push(query.rows[i])
        }


        response.offset = top;

        return response
    }
}