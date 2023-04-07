//Constants
const divItems = document.getElementById('items-div');
const addBtn = document.getElementById('btn-add');
const input = document.getElementById('item-input');
const dropdownItem = document.getElementsByClassName('dropdown-item');
const dropdownMenu = document.getElementById('dropdown-menu');
const noTextAlert = document.getElementById('alert-notext');
const alertMsg = document.getElementById('alert-msg');
const navbarToggleBtn = document.getElementById('navbar-toggle-btn');
const toggleIcon = document.getElementById('toggle-icon');
const ADD_TIME_LIMIT = 2000;
const LIMIT_NR_CHARACTERS = 201;


let lastItemTimestamp = 0;

function alertMustSignUp(){
    setTimeout(() => {
        alertMsg.innerHTML = 'In order to save your list you must register!(Not Available)';
        $(noTextAlert).css({'display':'block'});
        $(noTextAlert).addClass('animate__animated  animate__fadeInLeftBig');
        $(noTextAlert).click(()=>{
            $(noTextAlert).css({'display':'none'});
        })
    }, 5000);
}

function alertNoText(){
    alertMsg.innerHTML = 'You must type something!';
    $(noTextAlert).css({'display':'block'});
    $(noTextAlert).addClass('animate__animated animate__fadeInLeftBig');
    setTimeout(() => {
        $(noTextAlert).fadeOut('slow');
        $(noTextAlert).removeClass('animate__animated   animate__fadeInLeftBig');
    }, 3000);
}

function alertPriority(){
    alertMsg.innerHTML = 'You must set priority!';
    $(noTextAlert).css({'display':'block'});
    $(noTextAlert).addClass('animate__animated animate__fadeInLeftBig');
    setTimeout(() => {
        $(noTextAlert).fadeOut('slow');
        $(noTextAlert).removeClass('animate__animated   animate__fadeInLeftBig');
    }, 3000);
}

function alertTooFast(){
    alertMsg.innerHTML = 'Please wait before adding another task to the list!';
    $(noTextAlert).css({'display':'block'});
    $(noTextAlert).addClass('animate__animated animate__fadeInLeftBig');
    setTimeout(() => {
        $(noTextAlert).fadeOut('slow');
        $(noTextAlert).removeClass('animate__animated   animate__fadeInLeftBig');
    }, 3000);
}

function priorityNotSet(){
    alertPriority();
    $(dropdownMenu).addClass('animate__animated animate__flash');
    setTimeout(() => {
        $(dropdownMenu).removeClass('animate__animated animate__flash');
    }, 1000);
}

function tooManyChars(){
    alertMsg.innerHTML = 'Sorry, your input exceeds the maximum length of characters';
    $(noTextAlert).css({'display':'block'});
    $(noTextAlert).addClass('animate__animated animate__fadeInLeftBig');
    setTimeout(() => {
        $(noTextAlert).fadeOut('slow');
        $(noTextAlert).removeClass('animate__animated   animate__fadeInLeftBig');
    }, 3000);
}
alertMustSignUp();
function addItem(){

    const currentTime = new Date().getTime();

    //Check if input value is empty and show alert message
    if(input.value.trim() === ''){
       alertNoText();
       return;
    }

    //Check if priority is set and show alert message if not
    if(dropdownMenu.innerHTML === 'Priority'){
        priorityNotSet();
        return;
    }

    //Check if user is adding items too fast and alert if so
    if (currentTime - lastItemTimestamp < ADD_TIME_LIMIT) {
        alertTooFast();
        return;
    }

    //Check if # of characters exeeds the limit
    if(input.value.length >= LIMIT_NR_CHARACTERS){
        tooManyChars();
        return;
    }

    //Create DOM elements
    let itemContainer = document.createElement('div');
    let itemText = document.createElement('p');
    let deleteItem = document.createElement('span');
    let checkedItem = document.createElement('span');
    let moveIcon = document.createElement('i');
    let impIcon = document.createElement('i');
    let impIcon2 = document.createElement('i');
    
   
     

    //Values for created elements
    checkedItem.innerText = '✓';
    itemText.innerText = input.value;
    deleteItem.innerText = '✕';


    //Reset input value
    input.value = '';



   
    //DOM elements append
    divItems.appendChild(itemContainer);
    itemContainer.appendChild(moveIcon); 
    itemContainer.appendChild(checkedItem);
    itemContainer.appendChild(impIcon);
    if(dropdownMenu.innerHTML === 'Critical'){
        impIcon2.className = 'fa-solid fa-exclamation';
        impIcon2.style.paddingLeft = '';
        impIcon2.style.color = 'red';
        itemContainer.appendChild(impIcon2);
    }
    itemContainer.appendChild(itemText);
    itemContainer.appendChild(deleteItem);



       
        // //Items container styles
        itemContainer.classList = 'd-flex anim';
        itemContainer.style.backgroundColor = '#918981'; 
        itemContainer.style.outline = 'none';
        itemContainer.style.alignItems = 'center';
        itemContainer.style.position = 'relative';
        itemContainer.style.transition = 'background-color .25s';

   
        
        //Importance icon class and styles
        impIcon.className = 'fa-solid fa-exclamation';
        impIcon.style.paddingLeft = '10px';
        impIcon.style.paddingRight = '10px';
    

        //Checked symbol styles
        checkedItem.style.padding = '10px';
        checkedItem.style.display = 'none';
        checkedItem.style.color = 'lime';
        
    
        //Item text styles
        itemText.style.padding = '10px';
        itemText.style.margin = '0';   
        itemText.style.width = '80%';
        itemText.style.textAlign = 'justify';
        itemText.style.overflowWrap = 'anywhere';

        //i element(moveIcon) class and styles
        moveIcon.classList = 'fa-solid fa-arrows-up-down move-item'
        moveIcon.style.visibility = 'visible';
        moveIcon.style.padding = '10px';
        moveIcon.style.lineHeight = `${itemContainer.lineHeight}px`;
        moveIcon.style.cursor = 'move';

        
        
        //Delete symbol styles
        deleteItem.style.width = '10%';
        deleteItem.classList = 'text-center delete-item';
        deleteItem.style.outline = 'none';
        deleteItem.style.height = `${itemContainer.offsetHeight}px`;
        deleteItem.style.lineHeight  = deleteItem.style.height;
        deleteItem.style.verticalAlign = 'center';

    lastItemTimestamp = currentTime;

    //Item importance background
    if(dropdownMenu.innerText === 'Important'){
       itemText.style.color = '#FFCA2C';
       impIcon.style.color = '#FFCA2C';
    }else if(dropdownMenu.innerText === 'Critical'){
        itemText.style.color = '#ff0000';
        impIcon.style.color = '#ff0000';
    }else{
        impIcon.style.display = 'none';
    }
    
    //Item background on hover
    itemContainer.addEventListener("mouseover", function(){
        itemContainer.style.backgroundColor = 'darkgray';  
        
    });

    itemContainer.addEventListener("mouseout", function(){
        itemContainer.style.backgroundColor = '#918981';  
    });


    //Move items
    $(function() {  
        $(divItems).sortable({
            handle: 'i'
        });
        $(itemContainer).mouseover(function(){
            $(this).removeClass('anim');
        })
     });  


    
    //Toggle checked and line-through
    $(itemText).click(function(e) {
        $(this).toggleClass('stroked');
        $(checkedItem).toggle('slow');
        });


    //Delete item from list
    deleteItem.addEventListener('click', function(){
        $(itemContainer).addClass('anim-delete');
        setTimeout(() => {
            itemContainer.remove();
        }, 500);
        
    });
    


}

//Add item on enter
input.addEventListener('keydown', function(e){
    if(e.key === 'Enter'){
            setTimeout(() => {
                addItem();
               }, 400);
    }
})


//Importance 
function importance(){
    $(dropdownItem).click(function(){
        dropdownMenu.innerText = this.innerText;
        $(dropdownMenu).removeClass('btn-dark');
        if(this.innerText === 'Normal'){
            if($(dropdownMenu).hasClass('btn-warning')){
                $(dropdownMenu).removeClass('btn-warning');
                $(dropdownMenu).addClass('btn-light');
            }else if($(dropdownMenu).hasClass('btn-danger')){
                $(dropdownMenu).removeClass('btn-danger');
                $(dropdownMenu).addClass('btn-light');
            }else{
                $(dropdownMenu).addClass('btn-light');
            }
        }else if(this.innerText === 'Important'){
            if($(dropdownMenu).hasClass('btn-light')){
                $(dropdownMenu).removeClass('btn-light');
                $(dropdownMenu).addClass('btn-warning');
            }else if($(dropdownMenu).hasClass('btn-danger')){
                $(dropdownMenu).removeClass('btn-danger');
                $(dropdownMenu).addClass('btn-warning');
            }else{
                $(dropdownMenu).addClass('btn-warning');
            }
        }else if(this.innerText === 'Critical'){
            if($(dropdownMenu).hasClass('btn-light')){
                $(dropdownMenu).removeClass('btn-light');
                $(dropdownMenu).addClass('btn-danger');
            }else if($(dropdownMenu).hasClass('btn-warning')){
                $(dropdownMenu).removeClass('btn-warning');
                $(dropdownMenu).addClass('btn-danger');
            }else{
                $(dropdownMenu).addClass('btn-danger');
            }  
        }
    })
}

//Function to toggle menu icon and animation
function menuToggle(){
    toggleIcon.style.width = '18px';
    $(toggleIcon).addClass('animate__animated');
        if($(toggleIcon).hasClass('fa-solid fa-bars')){
            $(toggleIcon).removeClass('fa-solid fa-bars');
            $(toggleIcon).addClass('fa-solid fa-xmark animate__flipInY');
            toggleIcon.addEventListener('animationend', () => {
                $(toggleIcon).removeClass('animate__flipInY')
            })
        }else if($(toggleIcon).hasClass('fa-solid fa-xmark')){
            $(toggleIcon).removeClass('fa-solid fa-xmark');
            $(toggleIcon).addClass('fa-solid fa-bars animate__flipInY');
            toggleIcon.addEventListener('animationend', () => {
                $(toggleIcon).removeClass('animate__flipInY')
            });
        }
}