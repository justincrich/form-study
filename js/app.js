
 document.addEventListener("DOMContentLoaded",(e)=>{
   //SETUP ON LOAD
   /*UC1: SELECT "NAME" INPUT FIELD ON LOAD*/
   //select name input when page is loaded
   document.getElementById('name').focus();
   let activities = new Activities();

   /*UC2: ADD INPUT DYNAMICALLY ON "OTHER"*/
   //Insert field when 'other' is selected from dropdown
   title.addEventListener('change',(e)=>{
     const basicFieldset = document.getElementsByClassName('basicFieldset')[0];
     let titleLabel;
     let titleInput;
     //get selected value
     let selection = e.currentTarget.options[e.currentTarget.selectedIndex].text;
     if(selection === 'Other'){
       //only add a other field if there's not already one on the DOM
       if(!document.getElementById('titleLabel')){
         //create+add label
         titleLabel = document.createElement('label');
         titleLabel.setAttribute('for','titleInput');
         titleLabel.setAttribute('id','titleLabel');
         titleLabel.innerHTML = 'Other';
         basicFieldset.appendChild(titleLabel);

         //create+add input
         titleInput = document.createElement('input');
         titleInput.setAttribute('id','titleInput');
         titleInput.setAttribute('placeholder','Your Job Role')
         basicFieldset.appendChild(titleInput);
       }
     }else{

       titleLabel = document.getElementById('titleLabel');
       titleInput = document.getElementById('titleInput');
       if(titleLabel){
         //remove input+label when a different option is selected
         basicFieldset.removeChild(titleLabel);
         basicFieldset.removeChild(titleInput);
       }
     }
   });

   /*UC3: T-SHIRT INFO LOGIC*/
   //basic shirt info
   const getShirts = (id)=>{
     const shirts = {
       1:{
         name:"Theme - JS Puns",
         sizes:['s','m','l','xl'],
         colors:['cornflowerblue', 'darkslategrey', 'gold']
       },
       2:{
         name:"Theme - I ♥ JS",
         sizes:['s','m','l','xl'],
         colors:['tomato', 'steelblue', 'dimgrey']
       }
     };
     return shirts[id];
   }
   //logic to dynamically set dropdown info
   const designDropdown = document.getElementById('design');
   designDropdown.addEventListener('change',(e)=>{
     const colorDropdown = document.getElementById('color');
     const sizeDropdown = document.getElementById('size');
     let selection = getShirts(e.currentTarget.selectedIndex);

     //Show the right colors for the available design
     Array.from(colorDropdown.children).forEach((element,index,arr)=>{
       //if(element.getAttribute('value'))
       if(selection===undefined){
         element.style.display = '';
       }else{
         //show appropriate shirt colors
         let color = element.getAttribute('value');
         if(selection.colors.indexOf(color) === -1){
           //console.log('hide');
           colorDropdown.children[index].style.display = 'none';
         }else{
           //console.log('show');
           colorDropdown.children[index].style.display = '';
         }
       }
     });

   });

   /*UC4: ACTIVITY REGISTRATION LOGIC*/
   const activityRegistration = document.getElementsByClassName('activities')[0];

   activityRegistration.addEventListener('click',(e)=>{
    //add or remove checked class to the event queue
     if(e.target.type === 'checkbox'){
       let classSelected = e.target.name;
       if(e.target.checked){
         activities.attending.push(classSelected);

       }else{
         activities.attending.splice(activities.attending.indexOf(classSelected),1);
       }
       let event = activities.classes[classSelected];
       let options = Array.from(activityRegistration.children);
       options.shift();//remove legend

       //iterate through unselected classes and disable if they overlap
       options.forEach((child,index,arr)=>{
         //check against regestered classes with Activities method checkAvailability
         canAdd = activities.checkAvailability(activities.classes[child.firstElementChild.name]);
         if(canAdd){
           child.firstElementChild.disabled = false;
         }else{
           child.firstElementChild.disabled = true;
         }
       });

     }
   });

   /*UC: 5 Payment info processing section*/
   const paymentDropdown = document.getElementById('payment');
   //sets payment value to credit card by default
   paymentDropdown.value = 'credit-card';
   togglePayment(paymentDropdown.value);
   //listen for change in payment dropdown
   paymentDropdown.addEventListener('change',(e)=>{
     togglePayment(e.target.value);
   });

   /*UC: 6 Misc Form Validation*/
  //toggle required whenever item is clicked
  const btn = document.getElementById('submitButton');
  btn.addEventListener('click',(e)=>{
    e.preventDefault();
    //validate name input exists
    const name = document.getElementById('name');
    let nameValid = validate(name);
    //validate email input
    const mail = document.getElementById('mail');
    let mailValid = validate(mail);
    const act = document.getElementById('activities');
    let actValid = validate(act);
    const pay = document.getElementById('paymentFieldset');
    let payValid = validate(pay);
    console.log('pay valid', payValid);


  });



 });





 /*PAGE RESOURCES*/


 class Activities {
   constructor(){
     this.classes = {
       all:{
         title:'Main Conference',
         price:200,
         startTime:new Date('9/4/2017 9:00 AM'),
         endTime:new Date('9/4/2017 12:00 PM')
       },
       js_frameworks:{
         title:'JavaScript Frameworks Workshop',
         price:100,
         startTime:new Date('9/5/2017 9:00 AM'),
         endTime:new Date('9/5/2017 12:00 PM')
       },
       js_libs:{
         title:'JavaScript Libraries Workshop',
         price:100,
         startTime:new Date('9/5/2017 1:00 PM'),
         endTime:new Date('9/5/2017 4:00 PM')
       },
       express:{
         title:'Express Workshop',
         price:100,
         startTime:new Date('9/5/2017 9:00 AM'),
         endTime:new Date('9/5/2017 12:00 PM')
       },
       node:{
         title:'Node.js Workshop',
         price:100,
         startTime:new Date('9/5/2017 1:00 PM'),
         endTime:new Date('9/5/2017 4:00 PM')
       },
       build_tools:{
         title:'Build tools Workshop',
         price:100,
         startTime:new Date('9/6/2017 9:00 AM'),
         endTime:new Date('9/6/2017 12:00 PM')
       },
       npm:{
         title:'npm Workshop',
         price:100,
         startTime:new Date('9/6/2017 1:00 PM'),
         endTime:new Date('9/6/2017 4:00 PM')
       }
     };
     this.attending = [];

     //Function that tests if events overlap, if they do it returns TRUE if not returns FALSE
     this.checkAvailability = (event)=>{
       //makes sure the start is after the end time
       //return false if classes overlap
       let canGo = true;
       this.attending.forEach((element,index,arr)=>{
         if(event.title != this.classes[element].title && event.startTime<this.classes[element].endTime && event.endTime>this.classes[element].startTime){
           canGo = false;
         }
       });

       return canGo;
     };
    }

 }

 let togglePayment = (type)=>{
   const paymentTypes = document.getElementsByClassName('paymentTypes');
   Array.from(paymentTypes).forEach(element=>{
     if(element.id === type){
       element.style.display = 'inherit';
     }else{
       element.style.display = 'none';
     }
   });
 }

 let validate = (element)=>{

   switch(element.id){
     case 'name':{
       if(element.value === ''){
         document.getElementsByClassName('nameError')[0].style.display='block';
         return false
       }else{
         document.getElementsByClassName('nameError')[0].style.display='none';
         return true;
       }
     }
     break;
     case 'mail':{
       let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
       let formatvalid = re.test(element.value);
       let nullValid = false;

       if(element.value === ''){
         nullValid = true
       }
       console.log('is null',nullValid);
       console.log('mail',formatvalid);
       if(nullValid){
         document.getElementsByClassName('emailError')[0].innerHTML="No value entered, please provide an email.";
         document.getElementsByClassName('emailError')[0].style.display='block';
         return false;
       }else if (formatvalid === false){
         document.getElementsByClassName('emailError')[0].innerHTML="Please enter a correctly formatted email address.";
         document.getElementsByClassName('emailError')[0].style.display='block';
         return false;
       }else{
         document.getElementsByClassName('emailError')[0].style.display='none';
         return true;
       }
     }
     break;
     case 'activities':{
       element.getElementsByTagName('input');
       let checks = element.getElementsByTagName('input');
       let valid = false;
       Array.from(checks).forEach(check=>{
         if(check.checked){
           valid = true;
         }
       });
       if(valid===false){
         document.getElementsByClassName('activityError')[0].style.display='block';
       }else{
         document.getElementsByClassName('activityError')[0].style.display='none';
       }
       return valid;
     }
     break;
     case 'paymentFieldset':{
       let inputs = element.getElementsByTagName('input');
       let valid = true;
       Array.from(inputs).forEach(input=>{
         if(isNaN(input.value) === true){
           valid = false;
         }
       });
       if(valid===false){
         document.getElementsByClassName('creditCardError')[0].style.display='block';
       }else{
         document.getElementsByClassName('creditCardError')[0].style.display='none';
       }
       return valid;
     }
     break;
     default:{
       console.log('none');
     }
   }
 }
