var data,
    chunkedStudents;

getJSON('https://yspuku7qvh9u4cr3.firebaseio.com/.json', function(res){
   data = res['c8-students'];
  
   chunkedStudents = _(data).map(function(value){
    return value.firstName + " " + value.lastName[0] + ".";
   })
   .shuffle().chunk(4).value();
     
   var ul = document.querySelector('ul');
   ul.appendChild(createList(chunkedStudents));
  
});



function createList(array) {
  var docFragment = document.createDocumentFragment();

  _.forEach(array, function(team){
    var ol = document.createElement('ol');
    _.forEach(team, function(teamMember){
      var li = document.createElement('li');
      var text = document.createTextNode(teamMember);
      li.appendChild(text);
      ol.appendChild(li);  
    })    
    
    docFragment.appendChild(ol);
  })
  
  return docFragment;
  
}



// AJAX
function getJSON(url, cb) {
  var xhr = new XMLHttpRequest();
  // data at: https://yspuku7qvh9u4cr3.firebase.com/.json
  xhr.open('GET', url);
  
  xhr.onload = function() {
    if (this.status >= 200 && this.status < 400){
      // execute the callback w/this data
      cb(JSON.parse(this.response));
    }
  };
  
   xhr.send(); 
}