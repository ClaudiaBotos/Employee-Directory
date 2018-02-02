$(document).ready(()=>{
    const employeeWrapper = document.getElementById('employee-list');
    const contentModal = document.getElementById('content-modal');
    const windowModal= document.getElementById('window-modal');
    const filterSearch= document.getElementById('mySearch');
    
    var employeeTotal=12;
    let employeeInfo=[];
    
    
    
    
    
    
    function getDetails(results) {
        for (let i = 0; i< employeeTotal ; i++) {
            let newEmployee= results[i];
            let picture = newEmployee.picture.large;
            let profilePic = '<img class="profile-picture" src=" ' + picture + ' " alt="employee profile picture">';
            let fullName = newEmployee.name.first + " " + newEmployee.name.last;
            let email = newEmployee.email;
            let tellNumber = newEmployee.cell;
            let street = newEmployee.location.street;
            let city = newEmployee.location.city;
            let state = newEmployee.location.state;
            let postcode = newEmployee.location.postcode;
            let nationality = newEmployee.nat; 
            let birthday = newEmployee.dob;
            
            
            employeeInfo.push({
                "index" : i,
				"pic": profilePic,
				"name": fullName,
				"email" : email,
				"cell" : tellNumber,
				"street" : street,
				"city" : city,
				"state" : state,
				"postcode" : postcode,
				"country" : nationality,
				"dob" : birthday
            });
        }
    } // end of the details request
    
    
function getEmployee(employee) {
    let memberDiv = '<div class="employee-box">';
    memberDiv+= employee.pic;
    memberDiv+= '<div class="shortInfo-wrapper">';
    memberDiv+= '<h3 class="employeeName">' + employee.name + '</h3>';
    memberDiv+= '<p class="employeeEmail">' +employee.email + '</p>';
    memberDiv+= '<p class="employeeCity">' +employee.city + '</p>';
    memberDiv += '</div>';
	memberDiv += '<div class="modal-box"></div>';
	memberDiv += '</div>';
	
    $("#employee-list").append(memberDiv);
    
}
    
    
     function setContent(employee) {
         
         
         
    let modalHTML= '';
		modalHTML += employee.pic;
		modalHTML += '<h3 class="modal-name">' + employee.name + '</h3>';
		modalHTML += '<p class="modal-email">'+ employee.email + '</p>';
		modalHTML += '<p class="modal-city">'+ employee.city + '</p>';
		modalHTML += '<div class="hr extra-info">';
		modalHTML += '<p class="modal-cell">'+ employee.cell + '</p>';
		modalHTML += '<p class="modal-address">'+ employee.street + ", " +  employee.country + " "+ employee.postcode +'</p>';
		modalHTML += '<p class="modal-dob">Birthday: '+ employee.dob + '</p>';
		modalHTML += '</div>';
		$("#content-modal").append(modalHTML);
	} //end setModalContent
    
    
 
  
  $(employeeWrapper).on('click', ".employee-box", e => {  // add argument for delegated handler
      $('.modal-bg').addClass('active');
      $ ('.modal-content').addClass('active');
      let selectedBox = e.target.parentNode;   // here down from other handler
      let selectedID = $(selectedBox).index();
      setContent(employeeInfo[selectedID]);
  });
    

    $('.close-btn').on('click', function() {
        
        $('.modal-bg').removeClass('active');
        $('.modal-content').removeClass('active');
       
        
       
 
    });
    

  

   $.ajax({
	  url: 'https://randomuser.me/api/?format=json&results=' + employeeTotal + '&inc=picture,name,login,email,location,cell,dob,nat&nat=us,gb',
	  dataType: 'json',
	  success: function(data) {
			getDetails(data.results);
			for (let i = 0; i< employeeTotal ; i++) {
				getEmployee(employeeInfo[i]);
			}
	  }
	});//end ajax


    
}); //end ready