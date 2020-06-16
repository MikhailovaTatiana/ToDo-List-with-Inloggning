//Date
const date = document.getElementById("date")
const options = {weekday: "long", year: "numeric", month: "short", day: "numeric"};
const today = new Date();
date.innerHTML = today.toLocaleDateString("en-US", options);

const commentList = document.querySelector('.comments');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');

const setupUI = (user) => {
  if (user) {

    db.collection('users').doc(user.uid).get().then(doc => {
      const html = `
        <div>Logged in as ${user.email}</div>
        <div>${doc.data().bio}</div>
      `;
      accountDetails.innerHTML = html;
    });

    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
  } else {

    accountDetails.innerHTML = '';

    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
  }
}

const setupComments = (data) => {

  if (data.length) {
    let html = '';
    data.forEach(doc => {

      const comment = doc.data();
   
      const li = 
        `
          <li>
            <div class="collapsible-header grey lighten-4">  
              ${comment.title}
            </div>
            <div class="collapsible-body white">
              ${comment.content}
            </div>
            <br>
          </li>
        `;

      const check = 
        `
          <div id="icon"><i class="fa fa-circle-o" title="check"></i></div>
        `;

      const edit = 
        `
          <div id="icon"><i class="fa fa-edit" title="edit"></i></div>
        `;

      const trash =
        `
          <div id="icon"><i class="fa fa-trash-o" title="delete"></i></div><br>
        `;

      html += check + edit + trash + li;      

    });

    commentList.innerHTML = html;
    
  } else {
    commentList.innerHTML = '<h5 class="center-align">Login to view ToDo:s</h5>';
  }

  

}

// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
  
    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);

});

