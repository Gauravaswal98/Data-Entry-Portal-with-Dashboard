function selectedRow(){
                
    var index,
        table = document.getElementById("table");

    for(var i = 1; i < table.rows.length; i++)
    {
        table.rows[i].onclick = function()
        {
             // remove the background from the previous selected row
            if(typeof index !== "undefined"){
               table.rows[index].classList.toggle("selected");
            }
            console.log(typeof index);
            // get the selected row index
            index = this.rowIndex;
            // add class selected to the row
            this.classList.toggle("selected");
            console.log(typeof index);
         };
    }
    
}
selectedRow();