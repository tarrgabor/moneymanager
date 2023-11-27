function setMaxDate(){
    let date = document.querySelector('#date');
    date.max =  new Date().toISOString().split("T")[0];
}

function getToday(){
    setTimeout(()=>{setMaxDate()}, 500);
}

function addSteps(){

    let date = document.querySelector('#date');
    let money = document.querySelector('#money');

    if (date.value == "" || money.value == 0 ){
        showMessage("Nem adtál meg minden adatot!");
    }
    else{
        axios.get(`${serverURL}/money/userID/eq/${loggedUser.ID}`).then(res=>{
            let vane = false;
            let upID = -1;
            res.data.forEach(item => {
                if (item.date.split('T')[0] == date.value){
                    vane = true;
                    upID = item.ID;
                    return;
                }
            });
            if(vane){
                let data = {
                    money : money.value	
                }
                axios.patch(`${serverURL}/money/ID/eq/${upID}`, data).then((res)=>{
                    alert('A lépésszám módosítva!');
                    date.value = null;
                    money.value = 0;
                });
            }
            else{
                let data = {
                    userID : loggedUser.ID,	
                    date : date.value,	
                    money : money.value	
                }

                axios.post(`${serverURL}/steps`, data).then((res)=>{
                    alert('A lépésszám rögzítve!');
                    date.value = null;
                    money.value = 0;
                });
            }
        })
    }
}

//getToday();
