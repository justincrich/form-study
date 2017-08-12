//holds dropdown colors
var holder;
let closet = document.getElementById('color').cloneNode(true);
document.getElementsByClassName('otherInputField')[0].style.display = 'none';
 document.addEventListener("DOMContentLoaded",(e)=>{
   $("#color").val('');
   //SETUP ON LOAD
   /*UC1: SELECT "NAME" INPUT FIELD ON LOAD*/
   //select name input when page is loaded
   document.getElementById('name').focus();


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
       document.getElementsByClassName('otherInputField')[0].style.display = 'block';
     }else{
       document.getElementsByClassName('otherInputField')[0].style.display = 'none';
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
         colors:['cornflowerblue', 'darkslategrey', 'gold'],
         matchingClass:'puns'
       },
       2:{
         name:"Theme - I ♥ JS",
         sizes:['s','m','l','xl'],
         colors:['tomato', 'steelblue', 'dimgrey'],
         matchingClass:'heart'
       }
     };
     return shirts[id];
   }
   //logic to dynamically set dropdown info
   const designDropdown = document.getElementById('design');
   $("#colors-js-puns").hide();
   designDropdown.addEventListener('change',(e)=>{
     const colorDropdown = document.getElementById('color');
     const sizeDropdown = document.getElementById('size');
     colorDropdown.innerHTML = '';

     if(e.currentTarget.selectedIndex===2){
       //handle case where the holder already has heart type shirts

        Array.from(closet.getElementsByClassName('heart')).forEach(element=>{
            console.log(element);
           colorDropdown.appendChild(element.cloneNode(true));
        });
        $("#colors-js-puns").show();
     }else if (e.currentTarget.selectedIndex===1){
       //handle case where the holder already has pun type shirts

       //save heart class colors
      //  $('.puns').show();
      //  $('.heart').hide();
      Array.from(closet.getElementsByClassName('puns')).forEach(element=>{
          console.log(element);
         colorDropdown.appendChild(element.cloneNode(true));
      });
      $("#colors-js-puns").show();
     }else{
       $("#colors-js-puns").hide();
     }


   });

   /*UC4: ACTIVITY REGISTRATION LOGIC*/
   let activities = new Activities();
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
       options.shift();//remove error
       //iterate through unselected classes and disable if they overlap
       options.forEach((child,index,arr)=>{
         console.log(child);
         //check against regestered classes with Activities method checkAvailability
         canAdd = activities.checkAvailability(activities.classes[child.firstElementChild.name]);
         if(canAdd){
           child.firstElementChild.disabled = false;
         }else{
           child.firstElementChild.disabled = true;
         }
       });
       //sum up total for activities and display
       let sum = 0;
       activities.attending.forEach(activity=>{
         sum+=activities.classes[activity].price;
       });
       document.getElementById('activityAmount').innerHTML = sum;
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
  // const btn = document.getElementById('submitButton');
  // btn.addEventListener('click',(e)=>{
  //
  //
  //
  //
  // });



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
      //  element.style.display = 'inherit';
      $(element).show();
     }else{
      //  element.style.display = 'none';
      $(element).hide();
     }
   });
 }

function validateForm() {

  //validate name input exists
  const name = document.getElementById('name');
  let nameValid = checkInput(name);

  //validate email input
  const mail = document.getElementById('mail');
  let mailValid = checkInput(mail);

  const act = document.getElementById('activities');
  let actValid = checkInput(act);

  const pay = document.getElementById('paymentFieldset');
  let payValid = checkInput(pay);

  const jobTitle = document.getElementById('title');
  console.log(jobTitle);
  let titleValid = checkInput(jobTitle);

  //check all validation before allowing form to continue
  console.log('pay valid?',payValid);
  if(nameValid && mailValid && actValid && payValid && titleValid){
    return true;
  }else{
    return false;
  }




  console.log('pay valid', payValid);
}

 let checkInput = (element)=>{

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
       document.getElementsByClassName('creditCardError')[0].innerHTML = '';
       let inputs = element.getElementsByTagName('input');
       let isNum = true;//holds entry if element can be converted to number
       let isBlank = false; //holds val if entry is blank
       Array.from(inputs).forEach(input=>{
         let fName = '';
         switch(input.id){
           case 'cc-num':{
             fName='credit card number';
           }
           break;
           case 'zip':{
             fName='zip code';
           }
           break;
           case 'cvv':{
             fName='CVV';
           }
           break;
           default:{
             fName='';
           }
         }
         if(isNaN(input.value) === true){
           isNum = false;
           document.getElementsByClassName('creditCardError')[0].innerHTML += 'Your '+fName+' may only be a number.<br>'
         }
         if(input.value === null || input.value === ''){
           isBlank = true;
           document.getElementsByClassName('creditCardError')[0].innerHTML += 'Please provide your '+fName+'<br>'
         }
       });
       if(!isNum || isBlank){
         document.getElementsByClassName('creditCardError')[0].style.display='block';
         return false;
       }else{
         document.getElementsByClassName('creditCardError')[0].style.display='none';
         return true;
       }

     }
     break;
     case 'title':{
        if(element.value === 'none'){
          document.getElementsByClassName('jobError')[0].style.display='block';
          return false;
        }else{
          document.getElementsByClassName('jobError')[0].style.display='none';
          return true;
        }
     }
     break;
     default:{
       console.log('none');
     }
   }
 }
